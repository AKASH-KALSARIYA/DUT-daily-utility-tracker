import React, { useMemo, useState } from "react";

const articles = [
  {
    id: 1,
    title: "AI-powered forecasts reshape urban planning in 2026",
    summary:
      "City councils are tapping real-time climate models to redesign parks, mobility lanes, and heat-safe corridors.",
    category: "Technology",
    tag: "AI",
    time: "2h ago",
    readTime: "5 min read",
    author: "City Desk",
    featured: true,
    takeaway:
      "Expect zoning updates for shade corridors and heat-resilient public spaces across tier-1 cities.",
  },
  {
    id: 2,
    title: "Monsoon patterns shift; west coast braces for wetter July",
    summary:
      "Met offices warn of heavier coastal spells while interior regions stay drier. Preparedness plans are underway.",
    category: "Weather",
    tag: "Climate",
    time: "4h ago",
    readTime: "4 min read",
    author: "WeatherNow",
    takeaway: "Coastal cities should review drainage and commuter advisories.",
  },
  {
    id: 3,
    title: "Green steel pilots cut emissions by 40% in early trials",
    summary:
      "Hydrogen-based furnaces show promise as regulators push for cleaner materials in public infrastructure.",
    category: "Sustainability",
    tag: "Energy",
    time: "6h ago",
    readTime: "6 min read",
    author: "Industry Watch",
    takeaway:
      "Material costs remain stable; procurement teams gain cleaner options for 2027 bids.",
  },
  {
    id: 4,
    title: "EV charging corridors expand across national highways",
    summary:
      "New 150kW hubs arrive every 80km, reducing range anxiety for intercity commuters and fleet operators.",
    category: "Mobility",
    tag: "EV",
    time: "8h ago",
    readTime: "3 min read",
    author: "Transit Lab",
    takeaway: "Logistics fleets can shorten dwell times; expect denser coverage in Q4.",
  },
  {
    id: 5,
    title: "Coastal cities double down on blue carbon restoration",
    summary:
      "Mangrove belts and seagrass projects receive fresh funding to buffer storm surges and lock in CO₂.",
    category: "Sustainability",
    tag: "Ocean",
    time: "12h ago",
    readTime: "5 min read",
    author: "Eco Desk",
    takeaway: "Look for public-private pilots near ports; community jobs likely to rise.",
  },
  {
    id: 6,
    title: "Smart grids stabilize peak demand during heatwaves",
    summary:
      "Dynamic pricing and battery swaps keep the lights on while keeping emissions down in dense metros.",
    category: "Technology",
    tag: "Grid",
    time: "14h ago",
    readTime: "4 min read",
    author: "Tech Pulse",
    takeaway:
      "Industrial users may see incentives for off-peak shifts and storage adoption.",
  },
];

const categories = ["All", ...new Set(articles.map((a) => a.category))];
const trending = articles.slice(0, 4);
const featuredArticle = articles.find((a) => a.featured) || articles[0];

function News() {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [search, setSearch] = useState("");

  const filtered = useMemo(() => {
    return articles.filter((a) => {
      const matchesCategory =
        selectedCategory === "All" || a.category === selectedCategory;
      const q = search.trim().toLowerCase();
      const matchesSearch =
        !q ||
        a.title.toLowerCase().includes(q) ||
        a.summary.toLowerCase().includes(q) ||
        a.tag.toLowerCase().includes(q);
      return matchesCategory && matchesSearch;
    });
  }, [selectedCategory, search]);

  return (
    <div className="news-page text-white my-5">
      <div className="news-overlay">
        <div className="container py-5">
          {/* Header */}
          <div className="d-flex flex-wrap justify-content-between align-items-start gap-3 mb-4">
            <div>
              <p className="news-kicker">Today on WeatherNow</p>
              <h1 className="display-6 fw-bold mb-1">Daily News & Insights</h1>
              <p className="text-light mb-0">
                Curated climate, tech, and mobility stories.
              </p>
            </div>
            <div className="news-actions d-flex gap-2">
              <input
                type="search"
                className="form-control news-search"
                placeholder="Search articles..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
              <select
                className="form-select news-select"
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
              >
                {categories.map((c) => (
                  <option key={c}>{c}</option>
                ))}
              </select>
            </div>
          </div>

          {/* Featured */}
          <div className="glass news-featured mb-4">
            <div className="d-flex flex-wrap align-items-start gap-3">
              <div className="news-featured-pill">Top Story</div>
              <div className="text-light">{featuredArticle.category}</div>
              <div className="text-secondary">{featuredArticle.time}</div>
            </div>
            <h3 className="fw-bold mt-2">{featuredArticle.title}</h3>
            <p className="text-light mb-2">{featuredArticle.summary}</p>
            <div className="news-takeaway glass-sm mb-3">
              <span className="news-badge subtle">Key takeaway</span>
              <span className="ms-2 text-white">{featuredArticle.takeaway}</span>
            </div>
            <div className="d-flex flex-wrap gap-3 align-items-center">
              <span className="news-tag">{featuredArticle.tag}</span>
              <span className="news-meta">{featuredArticle.readTime}</span>
              <span className="news-meta">By {featuredArticle.author}</span>
              <span className="news-meta">
                Curated in-app brief — external links intentionally omitted.
              </span>
            </div>
          </div>

          <div className="row g-4">
            {/* Articles grid */}
            <div className="col-lg-8">
              <div className="row g-3">
                {filtered.map((article) => (
                  <div className="col-md-6" key={article.id}>
                    <div className="glass news-card h-100">
                      <div className="d-flex justify-content-between mb-2">
                        <span className="news-badge">{article.category}</span>
                        <span className="news-meta">{article.time}</span>
                      </div>
                      <h5 className="fw-bold">{article.title}</h5>
                      <p className="text-light small">{article.summary}</p>
                      <div className="news-takeaway glass-sm mb-2">
                        <span className="news-badge subtle">Brief</span>
                        <span className="ms-2 text-white small">
                          {article.takeaway}
                        </span>
                      </div>
                      <div className="d-flex flex-wrap gap-2 align-items-center mt-auto">
                        <span className="news-tag">{article.tag}</span>
                        <span className="news-meta">{article.readTime}</span>
                        <span className="news-meta">By {article.author}</span>
                      </div>
                      <div className="news-footnote mt-3">
                        Editorial summary only — link-free for a focused read.
                      </div>
                    </div>
                  </div>
                ))}
                {filtered.length === 0 && (
                  <div className="text-secondary px-2">
                    No stories match your filters.
                  </div>
                )}
              </div>
            </div>

            {/* Trending & topics */}
            <div className="col-lg-4">
              <div className="glass p-3 mb-3">
                <div className="d-flex justify-content-between align-items-center mb-2">
                  <h6 className="mb-0">Trending</h6>
                  <span className="news-meta">Updated daily</span>
                </div>
                <div className="list-group list-group-flush">
                  {trending.map((item) => (
                    <div
                      className="list-group-item bg-transparent text-white px-0"
                      key={item.id}
                    >
                      <div className="d-flex justify-content-between">
                        <div>
                          <p className="mb-1 fw-semibold">{item.title}</p>
                          <p className="text-secondary small mb-0">
                            {item.category} • {item.readTime}
                          </p>
                        </div>
                        <span className="news-tag">{item.tag}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="glass p-3">
                <h6 className="mb-3">Explore topics</h6>
                <div className="d-flex flex-wrap gap-2">
                  {["AI", "Climate", "Grid", "EV", "Energy", "Ocean"].map(
                    (topic) => (
                      <button
                        key={topic}
                        className="btn btn-sm btn-outline-light rounded-pill"
                        onClick={() => setSearch(topic)}
                      >
                        #{topic}
                      </button>
                    )
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default News;
