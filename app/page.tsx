"use client";

import { useMemo, useState } from "react";
import {
  Bell, Check, ChevronLeft, ChevronRight, CirclePlay, Clapperboard,
  Compass, Film, Flame, Heart, Info, Menu, Play, Search, Sparkles,
  Tv, UserRound, X, Zap
} from "lucide-react";

type Movie = {
  title: string; year: string; rating: string; genre: string;
  studio: string; image: string; badge?: string;
};

const movies: Movie[] = [
  { title: "Dune: Part Two", year: "2024", rating: "8.5", genre: "Sci-Fi", studio: "Warner Bros.", image: "photo-1509316785289-025f5b846b35", badge: "FEATURED" },
  { title: "The Dark Knight", year: "2008", rating: "9.0", genre: "Action", studio: "Warner Bros.", image: "photo-1519608487953-e999c86e7455" },
  { title: "Spider-Man: Across the Spider-Verse", year: "2023", rating: "8.7", genre: "Animation", studio: "Sony Pictures", image: "photo-1534447677768-be436bb09401" },
  { title: "The Grand Budapest Hotel", year: "2014", rating: "8.1", genre: "Comedy", studio: "Searchlight", image: "photo-1511818966892-d7d671e672a2" },
  { title: "Interstellar", year: "2014", rating: "8.7", genre: "Sci-Fi", studio: "Paramount+", image: "photo-1462331940025-496dfbfc7564" },
  { title: "No Time to Die", year: "2021", rating: "7.3", genre: "Action", studio: "MGM", image: "photo-1519608487953-e999c86e7455" },
  { title: "The Creator", year: "2023", rating: "7.0", genre: "Sci-Fi", studio: "20th Century", image: "photo-1451187580459-43490279c0fa" },
  { title: "The Green Planet", year: "2022", rating: "8.9", genre: "Documentary", studio: "BBC", image: "photo-1448375240586-882707db888b" },
];

const studios = [
  { name: "NETFLIX", className: "netflix", note: "Originals & exclusives" },
  { name: "Disney+", className: "disney", note: "Stories for everyone" },
  { name: "MAX", className: "max", note: "HBO & Warner titles" },
  { name: "prime video", className: "prime", note: "Movies, series & more" },
  { name: "paramount+", className: "paramount", note: "A mountain of entertainment" },
  { name: "MARVEL", className: "marvel", note: "Heroes & legends" },
  { name: "PIXAR", className: "pixar", note: "The art of storytelling" },
  { name: "UNIVERSAL", className: "universal", note: "Iconic film collections" },
];

const imageUrl = (id: string, width = 700) =>
  `https://images.unsplash.com/${id}?auto=format&fit=crop&w=${width}&q=85`;

function PosterCard({ movie, index }: { movie: Movie; index: number }) {
  return (
    <button className="poster-card" aria-label={`View ${movie.title}`} onClick={() => window.dispatchEvent(new CustomEvent("movie-info", { detail: movie }))}>
      <div className="poster-image" style={{ backgroundImage: `linear-gradient(180deg, transparent 42%, rgba(0,0,0,.88)), url("${imageUrl(movie.image, 520)}")` }}>
        {movie.badge && <span className="poster-badge">{movie.badge}</span>}
        <span className="poster-play"><Play size={17} fill="currentColor" /></span>
        <span className="poster-rank">{String(index + 1).padStart(2, "0")}</span>
      </div>
      <div className="poster-meta">
        <span className="poster-title">{movie.title}</span>
        <span className="poster-sub">{movie.year} <i /> ★ {movie.rating}</span>
      </div>
    </button>
  );
}

export default function HomePage() {
  const [activeNav, setActiveNav] = useState("Home");
  const [query, setQuery] = useState("");
  const [showSearch, setShowSearch] = useState(false);
  const [selectedStudio, setSelectedStudio] = useState("All");
  const [saved, setSaved] = useState<string[]>([]);
  const [infoMovie, setInfoMovie] = useState<Movie | null>(null);
  const [mobileMenu, setMobileMenu] = useState(false);

  const filteredMovies = useMemo(() => movies.filter((movie) => {
    const matchesQuery = movie.title.toLowerCase().includes(query.toLowerCase());
    const matchesStudio = selectedStudio === "All" || movie.studio.toLowerCase().includes(selectedStudio.toLowerCase());
    return matchesQuery && matchesStudio;
  }), [query, selectedStudio]);

  const navItems = ["Home", "Movies", "TV Shows", "Anime", "Live TV", "Sports"];
  const toggleSaved = (title: string) => setSaved((current) => current.includes(title) ? current.filter((item) => item !== title) : [...current, title]);

  return (
    <main className="site-shell">
      <header className="topbar">
        <a className="brand" href="#" aria-label="404bit home"><span>404</span>BIT<span className="brand-dot">.</span></a>
        <nav className={mobileMenu ? "main-nav open" : "main-nav"}>
          {navItems.map((item) => <button key={item} className={activeNav === item ? "nav-link active" : "nav-link"} onClick={() => { setActiveNav(item); setMobileMenu(false); }}>{item}</button>)}
        </nav>
        <div className="header-actions">
          {showSearch ? <div className="search-box"><Search size={16}/><input autoFocus placeholder="Search titles..." value={query} onChange={(e) => setQuery(e.target.value)}/><button onClick={() => {setShowSearch(false); setQuery("");}} aria-label="Close search"><X size={16}/></button></div> : <button className="icon-button" aria-label="Search" onClick={() => setShowSearch(true)}><Search/></button>}
          <button className="icon-button notification" aria-label="Notifications"><Bell/></button>
          <button className="profile-button" aria-label="Profile"><UserRound size={18}/></button>
          <button className="icon-button mobile-toggle" aria-label="Toggle menu" onClick={() => setMobileMenu(!mobileMenu)}>{mobileMenu ? <X/> : <Menu/>}</button>
        </div>
      </header>

      <section className="hero">
        <div className="hero-backdrop" />
        <div className="hero-vignette" />
        <div className="hero-content">
          <div className="eyebrow"><span className="live-dot"/> EDITOR&apos;S PICK <span className="eyebrow-separator">/</span> FEATURED FILM</div>
          <h1>THE UNIVERSE<br/><em>IS YOURS.</em></h1>
          <p className="hero-description">Discover extraordinary stories, iconic worlds and unforgettable adventures. Your next favorite is waiting.</p>
          <div className="hero-details"><span>2024</span><i/> <span>SCI-FI / ADVENTURE</span><i/> <span className="rating">★ 8.5</span><i/> <span>2H 46M</span></div>
          <div className="hero-actions">
            <button className="button-primary" onClick={() => setInfoMovie(movies[0])}><Play size={17} fill="currentColor"/> Explore title</button>
            <button className="button-secondary" onClick={() => setInfoMovie(movies[0])}><Info size={17}/> More info</button>
          </div>
          <div className="hero-footnote"><span className="hero-line"/> CURATED FOR THE CURIOUS</div>
        </div>
        <div className="hero-pagination"><span className="pagination-active"/> <span/> <span/> <span/></div>
        <div className="hero-scroll">SCROLL TO DISCOVER <ChevronRight size={14}/></div>
      </section>

      <section className="content-section studio-section">
        <div className="section-heading">
          <div><div className="section-kicker"><Sparkles size={13}/> YOUR FAVORITE WORLDS</div><h2>Explore by <span>Studio</span></h2></div>
          <p>One destination. Every universe.</p>
        </div>
        <div className="studio-grid">
          {studios.map((studio) => <button key={studio.name} className={`studio-card ${studio.className}`} onClick={() => { setSelectedStudio(studio.name === "All" ? "All" : studio.name); document.getElementById("catalog")?.scrollIntoView({ behavior: "smooth" }); }}>
            <span className="studio-name">{studio.name}</span><span className="studio-note">{studio.note}</span><span className="studio-arrow"><ChevronRight size={17}/></span>
          </button>)}
        </div>
      </section>

      <section className="content-section" id="catalog">
        <div className="section-heading">
          <div><div className="section-kicker"><Flame size={13}/> WHAT EVERYONE IS WATCHING</div><h2>Trending <span>this week</span></h2></div>
          <button className="text-link" onClick={() => {setSelectedStudio("All"); setQuery("");}}>View all <ChevronRight size={15}/></button>
        </div>
        <div className="filter-row">
          {["All", "Action", "Sci-Fi", "Animation", "Documentary"].map((filter) => <button key={filter} className={selectedStudio === filter ? "filter-chip selected" : "filter-chip"} onClick={() => setSelectedStudio(filter)}>{filter}</button>)}
        </div>
        <div className="poster-grid">
          {filteredMovies.map((movie, index) => <PosterCard key={movie.title} movie={movie} index={index}/>)}
          {filteredMovies.length === 0 && <p className="empty-state">No titles found. Try another search.</p>}
        </div>
      </section>

      <section className="wide-feature">
        <div className="wide-feature-image" />
        <div className="wide-feature-copy"><div className="section-kicker"><Zap size={13}/> ALWAYS SOMETHING TO WATCH</div><h2>More than a<br/><span>watchlist.</span></h2><p>Build your collection, keep track of what you love and find your next obsession across movies, series, anime and more.</p><button className="button-primary" onClick={() => setActiveNav("Movies")}><Compass size={17}/> Explore the library</button></div>
      </section>

      <section className="content-section lower-section">
        <div className="section-heading"><div><div className="section-kicker"><Tv size={13}/> YOUR SCREEN, YOUR RULES</div><h2>More to <span>discover</span></h2></div></div>
        <div className="category-grid">
          <button className="category-card anime" onClick={() => setActiveNav("Anime")}><span>01 / ANIMATION</span><strong>Anime<br/>Universe</strong><ChevronRight/></button>
          <button className="category-card series" onClick={() => setActiveNav("TV Shows")}><span>02 / EPISODIC</span><strong>Series<br/>Central</strong><ChevronRight/></button>
          <button className="category-card live" onClick={() => setActiveNav("Live TV")}><span>03 / LIVE</span><strong>Live TV<br/>& Events</strong><ChevronRight/></button>
        </div>
      </section>

      <footer className="footer">
        <a className="brand" href="#"><span>404</span>BIT<span className="brand-dot">.</span></a>
        <p>Stories bring us together. Discover yours.</p>
        <div className="footer-links"><a href="#catalog">Browse</a><a href="#catalog">About</a><a href="#catalog">Privacy</a><a href="#catalog">Contact</a></div>
        <small>© 2025 404BIT. All rights reserved. A discovery platform for entertainment.</small>
      </footer>

      {infoMovie && <div className="modal-backdrop" onClick={() => setInfoMovie(null)}><div className="info-modal" onClick={(e) => e.stopPropagation()}><button className="modal-close" onClick={() => setInfoMovie(null)} aria-label="Close"><X/></button><div className="modal-art" style={{backgroundImage: `linear-gradient(0deg,#111 0%,transparent 100%),url("${imageUrl(infoMovie.image, 1000)}")`}}/><div className="modal-copy"><div className="section-kicker">TITLE DETAILS</div><h2>{infoMovie.title}</h2><p>{infoMovie.year} · {infoMovie.genre} · ★ {infoMovie.rating}</p><p className="modal-description">Explore the story, discover related titles and add this pick to your personal collection.</p><button className="button-primary" onClick={() => toggleSaved(infoMovie.title)}>{saved.includes(infoMovie.title) ? <Check size={17}/> : <Heart size={17}/>} {saved.includes(infoMovie.title) ? "Saved to list" : "Add to my list"}</button></div></div></div>}
    </main>
  );
}
