import React from "react";
import { useMemo, useState, useEffect } from "react";
import {
  ArrowRight, BookOpen, MapPin, Languages, Leaf, CalendarDays,
  Images, ExternalLink, Menu, X, ShieldCheck, HeartHandshake,
  ScrollText, GraduationCap, Search, Quote, Info, Maximize2
} from "lucide-react";
import { communities, sources, heritageTopics, timeline } from "./data";
import "./App.css";

const navItems = [
  ["home", "Home"],
  ["community", "The Community"],
  ["history", "History & Heritage"],
  ["language", "Language & Knowledge"],
  ["today", "Community Today"],
  ["digital", "Digital Heritage"],
  ["sources", "Sources"]
];

function SectionHeading({ eyebrow, title, children }) {
  return (
    <div className="section-heading">
      <p className="eyebrow">{eyebrow}</p>
      <h2>{title}</h2>
      {children && <p className="section-intro">{children}</p>}
    </div>
  );
}

function App() {
  const [active, setActive] = useState("home");
  const [menuOpen, setMenuOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [selectedCommunity, setSelectedCommunity] = useState(null);
  const [galleryFilter, setGalleryFilter] = useState("All");

  const [lightboxItem, setLightboxItem] = useState(null);

  useEffect(() => {
    if (!lightboxItem) return;
    const onKey = (e) => { if (e.key === "Escape") setLightboxItem(null); };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [lightboxItem]);

  const filteredCommunities = useMemo(() => {
    const term = query.trim().toLowerCase();
    if (!term) return communities;
    return communities.filter((group) =>
      `${group.name} ${group.area} ${group.focus}`.toLowerCase().includes(term)
    );
  }, [query]);

  function goTo(id) {
    setActive(id);
    setMenuOpen(false);
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  }

  const galleryItems = [
    { title: "Mindoro landscape", type: "Landscape", src: "/images/landscape.webp", alt: "Mindoro landscape placeholder" },
    { title: "Hanunuo writing tradition", type: "Writing", src: "/images/piste.jpg", alt: "Hanunuo cultural image placeholder" },
    { title: "Buhid writing tradition", type: "Writing", src: "/images/buhid.jpg", alt: "Buhid cultural image placeholder" },
    { title: "Iraya community profile", type: "Community", src: "/images/irayapeople.jpg", alt: "Iraya image placeholder" },
    { title: "Traditional crafts", type: "Crafts", src: "/images/crafts.png", alt: "Craft image placeholder" },
    { title: "Mindoro map", type: "Map", src: "/images/mindoromap.jpg", alt: "Mindoro map placeholder" },
  ];
  const visibleGallery = galleryFilter === "All"
    ? galleryItems
    : galleryItems.filter((item) => item.type === galleryFilter);

  return (
    <div className="website">
      <header className="navbar">
        <button className="brand" onClick={() => goTo("home")} aria-label="Go to home">
          <span className="brand-mark">M</span>
          <span><strong>Mangyan</strong><small>HERITAGE OF MINDORO</small></span>
        </button>
        <button className="menu-toggle" onClick={() => setMenuOpen(!menuOpen)} aria-label="Toggle navigation">
          {menuOpen ? <X /> : <Menu />}
        </button>
        <nav className={menuOpen ? "nav-links open" : "nav-links"} aria-label="Main navigation">
          {navItems.map(([id, label]) => (
            <button key={id} className={active === id ? "nav-link active" : "nav-link"} onClick={() => goTo(id)}>
              {label}
            </button>
          ))}
        </nav>
      </header>

      <main>
        <section id="home" className="hero section-anchor">
          <div className="hero-copy">
            <p className="eyebrow light">INDIGENOUS PEOPLES • MINDORO, PHILIPPINES</p>
            <h1>Many communities.<br /><em>Living heritage.</em></h1>
            <div className="hero-actions">
              <button className="button button-cream" onClick={() => goTo("community")}>Meet the communities <ArrowRight size={17} /></button>
              <button className="button button-outline" onClick={() => goTo("sources")}>Explore the sources</button>
            </div>
            <p className="hero-note"><ShieldCheck size={15} /> Student project. Sources cited below.</p>
          </div>
          <div className="hero-visual">
            <img src="/images/landscape.webp" alt="Mindoro landscape — local project image; add full credit in Sources" onError={(e) => { e.currentTarget.style.display = "none"; }} />
            <div className="visual-caption"><MapPin size={16} /><span>Mindoro Island, Philippines</span></div>
          </div>
          <div className="hero-bottom-note">A student digital heritage project</div>
        </section>

        <section className="intro-strip">
          <div className="intro-icon"><HeartHandshake size={25} /></div>
          <p><strong>Mangyan is not one group.</strong> The name covers eight distinct Indigenous peoples across Mindoro. Their languages, lands, and traditions each have their own story.</p>
          <a href="https://guides.loc.gov/mangyan-bamboo-collection/background" target="_blank" rel="noreferrer">Learn from the Library of Congress <ExternalLink size={14} /></a>
        </section>

        <section id="community" className="section section-anchor">
          <SectionHeading eyebrow="01 / KNOW THE PEOPLE" title="The Community">
            Explore eight groups identified in the sources used for this project. Locations are broad research leads, not exact territorial boundaries.
          </SectionHeading>
          <div className="search-row">
            <div className="search-box"><Search size={18} /><input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Search a group, location, or topic..." aria-label="Search communities" /></div>
            <span className="result-count">{filteredCommunities.length} of {communities.length} profiles</span>
          </div>
          <div className="community-grid">
            {filteredCommunities.map((group, index) => (
              <article className="community-card" key={group.name}>
                <div className="community-image">
                  <img src={group.image} alt={`${group.name} image placeholder; replace with verified and credited media`} onError={(e) => { e.currentTarget.style.display = "none"; }} />
                  <span className="card-number">{String(index + 1).padStart(2, "0")}</span>
                </div>
                <div className="card-content">
                  <p className="card-kicker"><MapPin size={13} /> {group.area}</p>
                  <h3>{group.name}</h3>
                  <p>{group.summary}</p>
                  <div className="focus-tags">{group.focus}</div>
                  <button className="text-button" onClick={() => setSelectedCommunity(group)}>Read profile <ArrowRight size={15} /></button>
                </div>
              </article>
            ))}
          </div>

          {selectedCommunity && (
            <div className="modal-backdrop" role="presentation" onClick={() => setSelectedCommunity(null)}>
              <div className="profile-modal" role="dialog" aria-modal="true" aria-labelledby="profile-title" onClick={(e) => e.stopPropagation()}>
                <button className="modal-close" onClick={() => setSelectedCommunity(null)} aria-label="Close profile"><X /></button>
                <p className="eyebrow">COMMUNITY PROFILE</p>
                <h2 id="profile-title">{selectedCommunity.name}</h2>
                <p className="card-kicker"><MapPin size={14} /> {selectedCommunity.area}</p>
                <p>{selectedCommunity.summary}</p>
                <div className="notice"><Info size={18} /><span><strong>Research to verify:</strong> {selectedCommunity.verify}</span></div>
                <p><strong>Suggested source:</strong> <a href="https://mangyanheritage.odoo.com/mangyan-groups" target="_blank" rel="noreferrer">Mangyan Heritage Center group profiles</a>.</p>
              </div>
            </div>
          )}

          <div className="map-panel">
            <div className="map-copy">
              <p className="eyebrow">GEOGRAPHIC CONTEXT</p>
              <h3>Mindoro Island</h3>
              <p>Mindoro is the home of several distinct Mangyan Indigenous communities. The groups are distributed in different parts of the island, with locations varying by community. For example, the Iraya are found in northern Mindoro, the Alangan and Tadyawan in parts of central and eastern Mindoro, while the Buhid, Hanunuo, Tau-buid, Bangon, and Ratagnon are found in central and southern areas. These locations are based on documented community and municipal information, not precise ancestral-domain boundaries.</p>
              <a className="text-button" href="https://www.openstreetmap.org/search?query=Mindoro%2C%20Philippines" target="_blank" rel="noreferrer">Explore Mindoro on OpenStreetMap <ExternalLink size={15} /></a>
              <div className="map-disclaimer">This map shows general geographic locations based on available sources. It does not represent official ancestral-domain boundaries.</div>
            </div>
            <div className="map-image-wrap">
              <img src="/images/mindoromap.png" alt="Placeholder for a cited map of Mindoro" onError={(e) => { e.currentTarget.style.display = "none"; }} />
              <div className="map-placeholder"><MapPin size={28} /><strong>Mindoro map</strong><span>Add a sourced map image or embed an approved interactive map.</span></div>
            </div>
          </div>
        </section>

        <section id="history" className="section section-muted section-anchor">
          <SectionHeading eyebrow="02 / ROOTS AND EXPRESSION" title="History & Cultural Heritage">
            Research each community in context. These topics are a guide for your group's investigation, not claims that every tradition is shared by all Mangyan peoples.
          </SectionHeading>
          <div className="topic-grid">
            {heritageTopics.slice(0, 4).map((topic, i) => {
              const icons = [BookOpen, HeartHandshake, ShieldCheck, Images];
              const Icon = icons[i];
              return <article className="topic-card" key={topic.title}><div className="topic-icon"><Icon size={22} /></div><h3>{topic.title}</h3><p>{topic.text}</p></article>;
            })}
          </div>
          <div className="research-note"><Quote size={22} /><p><strong>Research note:</strong> Historical records can be incomplete or written from outside perspectives. Compare sources and include Indigenous perspectives when available and shared with permission.</p></div>
        </section>

        <section id="language" className="section section-anchor">
          <SectionHeading eyebrow="03 / KNOWLEDGE ACROSS GENERATIONS" title="Language & Indigenous Knowledge">
            Language and knowledge belong to particular communities. Identify whose language or practice you are discussing and credit the source.
          </SectionHeading>
          <div className="knowledge-feature">
            <div className="knowledge-illustration"><div className="illustration-placeholder"><span className="illustration-text">ambahan</span></div></div>
            <div className="knowledge-copy">
              <p className="eyebrow">FEATURED EXAMPLE</p>
              <h3>Hanunuo ambahan</h3>
              <p>Ginaw Bilog was a Hanunuo Mangyan and the first recipient of the Gawad sa Manlilikha ng Bayan (GAMABA) award in 1993. He was recognized for preserving Surat Mangyan, a traditional writing system, and ambahan, a seven-syllable poetic form traditionally written on bamboo. The ambahan is used to express messages, feelings, and ideas and may be performed during social gatherings with traditional musical instruments. Ginaw Bilog helped preserve and share these traditions by maintaining collections of ambahan from his father and grandfather and teaching others about their cultural importance. He passed away in 2003.</p>
              <a href="https://www.nationalmuseum.gov.ph/2022/01/03/manlilikha-ng-bayan-ginaw-bilog/" target="_blank" rel="noreferrer" className="text-button">Read the National Museum article <ExternalLink size={15} /></a>
            </div>
          </div>
          <div className="topic-grid">
            {heritageTopics.slice(4, 8).map((topic, i) => {
              const icons = [Languages, ScrollText, Leaf, BookOpen];
              const Icon = icons[i];
              return <article className="topic-card" key={topic.title}><div className="topic-icon"><Icon size={22} /></div><h3>{topic.title}</h3><p>{topic.text}</p></article>;
            })}
          </div>
        </section>

        <section id="today" className="section section-muted section-anchor">
          <SectionHeading eyebrow="04 / LIVING COMMUNITIES" title="The Community Today">
            Mangyan peoples are living and changing communities with different experiences depending on their group, location, and access to services. Today, many communities continue traditional activities such as farming, handicraft-making, and gathering natural resources while also participating in education, community enterprises, and other forms of work. Recent programs in Oriental Mindoro show continuing efforts to improve education, livelihood opportunities, environmental protection, and cultural preservation.
          </SectionHeading>
          <div className="today-grid">
            <article><GraduationCap size={25} /><h3>Education & transmission</h3><p>Education among Mangyan communities continues to involve both formal schooling and the transmission of Indigenous knowledge within families and communities. In 2026, Oriental Mindoro expanded literacy programs for Mangyan learners, including the deployment of 33 PARA teachers to serve seven Indigenous groups. Another program involved 177 community teachers providing literacy and numeracy support. Some schools still face challenges because communities are located in geographically isolated areas, requiring teachers and students to travel through difficult terrain</p></article>
            <article><Leaf size={25} /><h3>Livelihoods & daily life</h3><p>Mangyan livelihoods vary between communities and households. Farming and the use of local natural resources remain important, while handicrafts and community enterprises can provide additional income. In July 2026, the Department of Social Welfare and Development provided ₱12 million in livelihood grants to 41 community associations, mostly composed of Mangyan Indigenous Peoples, benefiting more than 1,000 members. The grants were intended to strengthen existing enterprises, diversify products, and create additional income opportunities.</p></article>
            <article><HeartHandshake size={25} /><h3>Current challenges</h3><p>Some Mangyan communities continue to experience challenges involving access to education and services, economic opportunities, language preservation, and ancestral lands. For example, the Tadyawan language is classified as threatened, while Ratagnon is considered critically endangered or nearly extinct, with remaining speakers reported mainly among the older generation. Land and ancestral-domain issues also remain important concerns; in 2025, the NCIP documented conservation and ancestral-domain work involving Iraya and Alangan communities, including concerns about land intruders affecting sacred areas.</p></article>
            <article><ShieldCheck size={25} /><h3>Preservation & revitalization</h3><p>Preservation efforts include cultural education, language documentation, community-led environmental programs, and heritage organizations. The Mangyan Heritage Center works to document, preserve, understand, and promote Mangyan cultural heritage while emphasizing Free, Prior, and Informed Consent (FPIC) when working directly with communities. Language documentation has also been supported through research and digital projects, including work on Hanunuo language and writing. Recent conservation programs have trained Mangyan community members in activities such as native plant nurseries, forest restoration, and environmental protection.</p></article>
          </div>
          <div className="ethics-banner"><ShieldCheck size={24} /><div><strong>Respect is part of the research.</strong><p>Avoid saying that all Mangyan communities have the same experiences. The eight ethnolinguistic groups have different languages, cultural practices, livelihoods, and current challenges. Also, when presenting community voices or photographs, make sure you have permission and follow appropriate consent procedures.</p></div></div>
        </section>

        <section id="digital" className="section section-anchor">
          <SectionHeading eyebrow="05 / EXPLORE THE ARCHIVE" title="Digital Heritage">
            Add real media only after verifying the source, identity, credit, and permission.
          </SectionHeading>
          <div className="gallery-toolbar">
            <div><Images size={21} /><span>Gallery & learning resources</span></div>
            <div className="filter-buttons">
              {["All", "Landscape", "Community", "Writing", "Crafts", "Map"].map((f) => <button key={f} onClick={() => setGalleryFilter(f)} className={galleryFilter === f ? "filter active" : "filter"}>{f}</button>)}
            </div>
          </div>
          <div className="gallery-grid">
            {visibleGallery.map((item) => (
              <article className="gallery-card" key={item.title}>
                <div className="gallery-image">
                  <img src={item.src} alt={item.alt} className="gallery-img" onError={(e) => { e.currentTarget.style.display = "none"; }} onLoad={(e) => e.currentTarget.classList.add("loaded")} />
                  <span className="gallery-type">{item.type}</span>
                  <div className="image-placeholder">Add verified image</div>
                  <button className="gallery-zoom" onClick={() => setLightboxItem(item)} aria-label={`View ${item.title}`}><Maximize2 size={18} /></button>
                </div>
                <div className="gallery-caption"><strong>{item.title}</strong><small>Credit and source required</small></div>
              </article>
            ))}
          </div>
          {lightboxItem && (
            <div className="lightbox-backdrop" role="dialog" aria-modal="true" aria-label="Image preview" onClick={() => setLightboxItem(null)}>
              <div className="lightbox-content" onClick={(e) => e.stopPropagation()}>
                <button className="lightbox-close" onClick={() => setLightboxItem(null)} aria-label="Close preview"><X /></button>
                <img src={lightboxItem.src} alt={lightboxItem.alt} className="lightbox-img" onError={(e) => { e.currentTarget.style.display = "none"; }} />
                <div className="lightbox-body">
                  <p className="eyebrow">GALLERY ITEM</p>
                  <h3>{lightboxItem.title}</h3>
                  <p className="lightbox-type">{lightboxItem.type}</p>
                  <p>{lightboxItem.alt}</p>
                  <p className="lightbox-credit"><strong>Credit and source required</strong> — Add creator, original source URL, license or permission, and date accessed.</p>
                </div>
              </div>
            </div>
          )}
          <div className="timeline">
            <div className="timeline-heading"><CalendarDays size={22} /><div><p className="eyebrow">DATES TO VERIFY</p><h3>Digital timeline</h3></div></div>
            {timeline.map((event) => <article className="timeline-event" key={event.date}><div className="timeline-date">{event.date}</div><div><h4>{event.title}</h4><p>{event.text}</p></div></article>)}
          </div>
          <div className="topic-grid">
            <article className="topic-card"><h3>Interactive map</h3><p>Add a sourced map here. Keep municipal locations separate from ancestral-domain boundaries.</p><a href="https://www.openstreetmap.org/search?query=Mindoro%2C%20Philippines" target="_blank" rel="noreferrer" className="text-button">Open map <ExternalLink size={14} /></a></article>
            <article className="topic-card"><h3>Audio & video</h3><p>Embed only authorized recordings with speaker credits and permission details.</p></article>
            <article className="topic-card"><h3>Digital storytelling</h3><p>Use community-approved stories and source notes. Do not invent interviews or quotations.</p></article>
          </div>
        </section>

        <section id="sources" className="section section-dark section-anchor">
          <SectionHeading eyebrow="06 / TRACEABLE RESEARCH" title="Sources & Acknowledgments">
            These are starting references for further research. Open each source, verify the exact details used, and cite the specific page or passage in your submitted project.
          </SectionHeading>
          <div className="source-list">
            {sources.map((source, i) => <article className="source-card" key={source.url}><div className="source-number">{String(i + 1).padStart(2, "0")}</div><div className="source-main"><p className="source-org">{source.organization}</p><h3>{source.title}</h3><p>{source.use}</p><a href={source.url} target="_blank" rel="noreferrer">{source.url} <ExternalLink size={14} /></a></div></article>)}
          </div>
          <div className="ack-grid">
            <div><h3>Image & media credits</h3><p>Record creator, original source URL, license or permission, date accessed, and the community depicted only when reliably identified.</p></div>
            <div><h3>Interviews</h3><p>List only interviews actually conducted. Follow consent, privacy, and community protocols. Never invent a quotation or acknowledgment.</p></div>
            <div><h3>Contributors & AI use</h3><p>List actual student contributors and describe AI assistance according to your instructor's requirements. The group remains responsible for fact-checking.</p></div>
          </div>
          <p className="source-disclaimer">Classification and terminology can differ across publications. This website uses an eight-group framework as a research starting point, not as a claim that all sources classify every group identically.</p>
        </section>
      </main>

      <footer className="footer">
        <div className="footer-brand"><span className="brand-mark">M</span><div><strong>Mangyan Heritage</strong><small>INDIGENOUS COMMUNITIES OF MINDORO</small></div></div>
        <p>An educational student project. Research carefully, credit sources, and share cultural heritage with respect.</p>
        <button className="back-top" onClick={() => goTo("home")}>Back to top ↑</button>
      </footer>
    </div>
  );
}

export default App;



