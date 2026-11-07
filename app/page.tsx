"use client";

import { useEffect, useMemo, useState } from "react";
import { Search, Menu, X, Play, ChevronLeft, ChevronRight, Plus, Check, Star } from "lucide-react";

type Title = {
  title: string;
  year: string;
  genre: string;
  rating: string;
  studio: string;
  image: string;
  type: "Movie" | "Series";
};

const titles: Title[] = [
  { title: "Dune: Part Two", year: "2024", genre: "Sci-Fi", rating: "8.5", studio: "Warner Bros.", image: "photo-1509316785289-025f5b846b35", type: "Movie" },
  { title: "The Dark Knight", year: "2008", genre: "Action", rating: "9.0", studio: "Warner Bros.", image: "photo-1519608487953-e999c86e7455", type: "Movie" },
  { title: "Spider-Man: Across the Spider-Verse", year: "2023", genre: "Animation", rating: "8.7", studio: "Sony Pictures", image: "photo-1534447677768-be436bb09401", type: "Movie" },
  { title: "Interstellar", year: "2014", genre: "Sci-Fi", rating: "8.7", studio: "Paramount+", image: "photo-1462331940025-496dfbfc7564", type: "Movie" },
  { title: "The Grand Budapest Hotel", year: "2014", genre: "Comedy", rating: "8.1", studio: "Searchlight", image: "photo-1511818966892-d7d671e672a2", type: "Movie" },
  { title: "Top Gun: Maverick", year: "2022", genre: "Action", rating: "8.2", studio: "Paramount+", image: "photo-1464822759023-fed622ff2c3b", type: "Movie" },
  { title: "Black Panther", year: "2018", genre: "Action", rating: "7.3", studio: "Marvel", image: "photo-1534447677768-be436bb09401", type: "Movie" },
  { title: "Inside Out 2", year: "2024", genre: "Animation", rating: "7.6", studio: "Pixar", image: "photo-1500530855697-b586d89ba3ee", type: "Movie" },
  { title: "Stranger Things", year: "2016", genre: "Sci-Fi", rating: "8.7", studio: "Netflix", image: "photo-1519608487953-e999c86e7455", type: "Series" },
  { title: "The Last of Us", year: "2023", genre: "Drama", rating: "8.7", studio: "Max", image: "photo-1500530855697-b586d89ba3ee", type: "Series" },
  { title: "Fallout", year: "2024", genre: "Sci-Fi", rating: "8.3", studio: "Prime Video", image: "photo-1451187580459-43490279c0fa", type: "Series" },
  { title: "The Bear", year: "2022", genre: "Drama", rating: "8.6", studio: "FX", image: "photo-1517248135467-4c7edcad34c4", type: "Series" },
  { title: "Wednesday", year: "2022", genre: "Mystery", rating: "8.0", studio: "Netflix", image: "photo-1519608487953-e999c86e7455", type: "Series" },
  { title: "The Mandalorian", year: "2019", genre: "Adventure", rating: "8.6", studio: "Disney+", image: "photo-1470252649378-9c29740c9fa8", type: "Series" },
  { title: "House of the Dragon", year: "2022", genre: "Fantasy", rating: "8.4", studio: "Max", image: "photo-1470252649378-9c29740c9fa8", type: "Series" },
  { title: "Blue Planet II", year: "2017", genre: "Documentary", rating: "9.3", studio: "BBC", image: "photo-1448375240586-882707db888b", type: "Series" },
];

const studios = ["Netflix", "Disney+", "Max", "Prime Video", "Paramount+", "Marvel", "Pixar", "Universal"];
const heroSlides = [
  { title: "Dune: Part Two", subtitle: "The journey beyond begins.", image: "photo-1509316785289-025f5b846b35", tag: "2024  ·  SCI-FI  ·  8.5" },
  { title: "Interstellar", subtitle: "Go further. Find the extraordinary.", image: "photo-1462331940025-496dfbfc7564", tag: "2014  ·  SCI-FI  ·  8.7" },
  { title: "The Dark Knight", subtitle: "A city. A symbol. A legend.", image: "photo-1519608487953-e999c86e7455", tag: "2008  ·  ACTION  ·  9.0" },
  { title: "Top Gun: Maverick", subtitle: "Feel the need for speed.", image: "photo-1464822759023-fed622ff2c3b", tag: "2022  ·  ACTION  ·  8.2" },
];

const imageUrl = (id: string, width = 640) => `https://images.unsplash.com/${id}?auto=format&fit=crop&w=${width}&q=85`;

function Section({ title, children, id }: { title: string; children: React.ReactNode; id?: string }) {
  return <section className="section" id={id}><div className="section-head"><h2>{title}</h2><div className="section-arrows"><button aria-label="Scroll left" onClick={() => document.getElementById(id || title)?.scrollBy({ left: -600, behavior: "smooth" })}><ChevronLeft size={18}/></button><button aria-label="Scroll right" onClick={() => document.getElementById(id || title)?.scrollBy({ left: 600, behavior: "smooth" })}><ChevronRight size={18}/></button></div></div>{children}</section>;
}

function TitleCard({ item, rank, onOpen }: { item: Title; rank?: number; onOpen: (item: Title) => void }) {
  return <button className="title-card" onClick={() => onOpen(item)}><div className="poster" style={{ backgroundImage: `linear-gradient(0deg,rgba(0,0,0,.78),transparent 58%),url("${imageUrl(item.image)}")` }}>{rank && <span className="rank">{rank}</span>}<span className="play"><Play size={18} fill="currentColor"/></span><span className="poster-rating"><Star size={12} fill="currentColor"/> {item.rating}</span></div><strong>{item.title}</strong><span className="card-meta">{item.year} <i/> {item.genre}</span></button>;
}

export default function HomePage() {
  const [slide, setSlide] = useState(0);
  const [query, setQuery] = useState("");
  const [searchOpen, setSearchOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [studio, setStudio] = useState("");
  const [saved, setSaved] = useState<string[]>([]);
  const [selected, setSelected] = useState<Title | null>(null);

  useEffect(() => {
    const timer = window.setInterval(() => setSlide((current) => (current + 1) % heroSlides.length), 6500);
    return () => window.clearInterval(timer);
  }, []);

  const matches = useMemo(() => titles.filter((item) => {
    const textMatch = item.title.toLowerCase().includes(query.toLowerCase());
    return textMatch && (!studio || item.studio.toLowerCase() === studio.toLowerCase());
  }), [query, studio]);

  const movies = matches.filter((item) => item.type === "Movie");
  const series = matches.filter((item) => item.type === "Series");
  const topTen = [...titles].sort((a, b) => Number(b.rating) - Number(a.rating)).slice(0, 10);
  const current = heroSlides[slide];
  const toggleSaved = (title: string) => setSaved((list) => list.includes(title) ? list.filter((item) => item !== title) : [...list, title]);

  return <main className="app">
    <header className="nav">
      <a href="#" className="logo"><span>404</span>bit</a>
      <nav className={mobileOpen ? "nav-links open" : "nav-links"}>
        <a className="active" href="#">Home</a><a href="#movies">Movies</a><a href="#series">Series</a><a href="#top10">Top 10</a><a href="#studios">Studios</a>
      </nav>
      <div className="nav-actions">
        {searchOpen && <input className="search-input" autoFocus placeholder="Search titles..." value={query} onChange={(event) => setQuery(event.target.value)}/>}
        <button className="nav-icon" aria-label="Search" onClick={() => { setSearchOpen(!searchOpen); if (searchOpen) setQuery(""); }}><Search size={19}/></button>
        <button className="nav-icon mobile-menu" aria-label="Menu" onClick={() => setMobileOpen(!mobileOpen)}>{mobileOpen ? <X size={20}/> : <Menu size={20}/>}</button>
      </div>
    </header>

    <section className="hero" style={{ backgroundImage: `linear-gradient(90deg,#09090b 0%,rgba(9,9,11,.78) 36%,rgba(9,9,11,.08) 100%),linear-gradient(0deg,#09090b 0%,transparent 42%),url("${imageUrl(current.image, 1800)}")` }}>
      <div className="hero-content"><span className="hero-meta">{current.tag}</span><h1>{current.title}</h1><p>{current.subtitle}</p><div className="hero-buttons"><button className="primary-button" onClick={() => setSelected(titles.find((item) => item.title === current.title) || titles[0])}><Play size={17} fill="currentColor"/> Explore</button><button className="secondary-button" onClick={() => toggleSaved(current.title)}>{saved.includes(current.title) ? <Check size={17}/> : <Plus size={17}/>} My List</button></div></div>
      <div className="hero-controls"><button aria-label="Previous slide" onClick={() => setSlide((slide + heroSlides.length - 1) % heroSlides.length)}><ChevronLeft/></button><div className="dots">{heroSlides.map((item, index) => <button key={item.title} aria-label={`Go to slide ${index + 1}`} className={slide === index ? "dot active" : "dot"} onClick={() => setSlide(index)}/>)}</div><button aria-label="Next slide" onClick={() => setSlide((slide + 1) % heroSlides.length)}><ChevronRight/></button></div>
    </section>

    <div className="main-content">
      <Section title="Studios" id="studios"><div className="studio-list">{studios.map((name) => <button key={name} className={studio === name ? "studio-button selected" : "studio-button"} onClick={() => setStudio(studio === name ? "" : name)}>{name}</button>)}</div></Section>
      <Section title="Featured Movies" id="movies"><div className="title-row">{movies.slice(0, 8).map((item) => <TitleCard key={item.title} item={item} onOpen={setSelected}/>)}</div></Section>
      <Section title="Featured Series" id="series"><div className="title-row">{series.slice(0, 8).map((item) => <TitleCard key={item.title} item={item} onOpen={setSelected}/>)}</div></Section>
      <Section title="Top 10" id="top10"><div className="title-row top-row">{topTen.map((item, index) => <TitleCard key={item.title} item={item} rank={index + 1} onOpen={setSelected}/>)}</div></Section>
      {saved.length > 0 && <Section title="My List" id="my-list"><div className="title-row">{titles.filter((item) => saved.includes(item.title)).map((item) => <TitleCard key={item.title} item={item} onOpen={setSelected}/>)}</div></Section>}
      {query && <p className="results-note">{matches.length} results for “{query}”</p>}
    </div>

    <footer className="footer"><a href="#" className="logo"><span>404</span>bit</a><span>Discover something worth watching.</span><small>© 2026 404bit</small></footer>

    {selected && <div className="modal-backdrop" onClick={() => setSelected(null)}><div className="modal" onClick={(event) => event.stopPropagation()}><button className="modal-x" aria-label="Close" onClick={() => setSelected(null)}><X/></button><div className="modal-image" style={{ backgroundImage: `linear-gradient(0deg,#151518,transparent),url("${imageUrl(selected.image, 1000)}")` }}/><div className="modal-body"><span className="hero-meta">{selected.year} · {selected.genre} · ★ {selected.rating}</span><h2>{selected.title}</h2><p>{selected.studio}</p><button className="primary-button" onClick={() => toggleSaved(selected.title)}>{saved.includes(selected.title) ? <Check size={17}/> : <Plus size={17}/>} {saved.includes(selected.title) ? "Added to My List" : "Add to My List"}</button></div></div></div>}
  </main>;
}
