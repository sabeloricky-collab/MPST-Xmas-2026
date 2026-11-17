
import React, { useEffect, useRef, useState } from "react";
import { createRoot } from "react-dom/client";
import "./style.css";

const RSVP_WEB_APP_URL =
  "https://script.google.com/macros/s/AKfycbwuJ3pOhXdjL3imwLl2sL9bvQEtz_nBvzMw4QFryKbEV06WiOe7843Yi535NqnO9b77/exec";

// Set only to the restricted Admin Apps Script deployment URL, never the employee RSVP URL.
const ADMIN_WEB_APP_URL =
  "https://script.google.com/macros/s/AKfycbyg1AoCJzhIwy4F8OMXLKnDU83sc8yuRndv_r6VVf7gKPUEAwfC0MWAKrYzbjfbVDst/exec";

const initialSettings = {
  company: "Maruichi Philippines Steel Tube Inc.",
  title: "Christmas Party 2026",
  theme: "Under the Stars",
  eventDate: "2026-12-07T17:00:00+08:00",
  eventEnd: "2026-12-07T22:00:00+08:00",
  deadline: "2026-11-30",
  venue: "Jet Hotel, Lipa City",
  invitation:
    "An evening of gratitude, celebration, and shining moments together.",
  majorPrize: "Mio Gravis, Matte Brown",
  minorPrize: "Home Appliances",
  consolationPrize: "Appliances and Cash Prizes"
};

const sections = [
  "Home",
  "Dress Code",
  "Venue",
  "Raffle",
  "Program",
  "Admin Portal"
];

function Countdown({ target }) {
  const [now, setNow] = useState(Date.now());

  useEffect(() => {
    const timer = setInterval(() => setNow(Date.now()), 1000);
    return () => clearInterval(timer);
  }, []);

  const remaining = Math.max(
    0,
    new Date(target).getTime() - now
  );

  const values = [
    Math.floor(remaining / 86400000),
    Math.floor(remaining / 3600000) % 24,
    Math.floor(remaining / 60000) % 60,
    Math.floor(remaining / 1000) % 60
  ];

  return (
    <div className="countdown">
      {values.map((value, index) => (
        <div className="time-box" key={index}>
          <strong>
            {String(value).padStart(2, "0")}
          </strong>
          <small>
            {["DAYS", "HOURS", "MIN", "SEC"][index]}
          </small>
        </div>
      ))}
    </div>
  );
}

function Slideshow({ items }) {
  const [index, setIndex] = useState(0);
  const item = items[index];

  return (
    <div className="slide-card">
      <div className="slide-icon">{item.icon}</div>
      <h2>{item.title}</h2>
      <p>{item.description}</p>

      <div className="slide-controls">
        <button
          onClick={() =>
            setIndex(
              (index - 1 + items.length) % items.length
            )
          }
        >
          ← Previous
        </button>

        <span>
          {index + 1} / {items.length}
        </span>

        <button
          onClick={() =>
            setIndex((index + 1) % items.length)
          }
        >
          Next →
        </button>
      </div>
    </div>
  );
}

function RSVP({ settings }) {
  const deadlinePassed =
    Date.now() >
    new Date(
      settings.deadline + "T23:59:59+08:00"
    ).getTime();

  return (
    <section className="content-section">
      <p className="eyebrow">
        YOUR PRESENCE MATTERS
      </p>

      <h1>RSVP Registration</h1>
      <p>Deadline: November 30, 2026</p>

      {deadlinePassed ? (
        <div className="form-card">
          <h2>Registration Closed</h2>
          <p>The RSVP deadline has passed.</p>
        </div>
      ) : (
        <div className="form-card">
          <h2>Confirm Your Attendance</h2>

          <p>
            Verify your employee ID and submit or
            update your RSVP.
          </p>

          <p>
            You may change your response until
            November 30, 2026.
          </p>

          <a
            href={RSVP_WEB_APP_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="primary-button"
            style={{
              display: "inline-block",
              textDecoration: "none",
              marginTop: 16
            }}
          >
            Submit or Update My RSVP
          </a>

          <p style={{ marginTop: 16 }}>
            The RSVP form opens in a new tab.
          </p>
        </div>
      )}
    </section>
  );
}

function DressCode({ mobile, navigate }) {
  const [color, setColor] = useState("navy");
  const base = import.meta.env.BASE_URL + "images/";
  const links = [["Home","home"],["Venue","venue"],["Raffle","raffle"],["Program","program"],["Dress Code","dress"],["Admin Portal","rsvp"]];
  return (
    <main className="dress-page" style={{"--dress-background": `url("${base}winter-${mobile ? "mobile" : "desktop"}.webp")`}}>
      <header className="dress-heading">
        <p className="dress-company">Maruichi Philippines Steel Tube Inc.</p>
        <p className="dress-theme">Christmas Under the Stars</p>
        <h1>Dress Code</h1>
        <p className="dress-tagline">Dress to shine under the stars</p>
      </header>
      <div className="dress-choice" role="group" aria-label="Choose your attire color">
        <p>Choose your attire color</p>
        <div className="dress-options">
          {[["navy","Dark Navy Blue"],["silver","Silver"]].map(([value,label]) => (
            <button key={value} type="button" aria-pressed={color === value} onClick={() => setColor(value)} className={`dress-option ${color === value ? "selected" : ""}`}>
              <span className={`dress-swatch ${value}`} aria-hidden="true" />{label}<span className="dress-check" aria-hidden="true">{color === value ? "✓" : ""}</span>
            </button>
          ))}
        </div>
      </div>
      <div className="dress-display" aria-live="polite">
        <span className="sr-only">{color === "navy" ? "Dark navy blue" : "Silver"} collection</span>
        <div className="dress-gallery">
          {[["women","For Women","Long Gown"],["men","For Men","Formal Wear"]].map(([group,title,subtitle]) => (
            <article className="dress-panel" key={group}>
              <h2>✦ {title} ✦</h2><p>{subtitle}</p>
              <img key={`${color}-${group}`} src={`${base}dress-${color}-${group}.webp`} alt={`Five ${color === "navy" ? "dark navy blue" : "silver"} ${subtitle.toLowerCase()} recommendations`} />
            </article>
          ))}
        </div>
      </div>
      <div className={`dress-message ${color}`} aria-live="polite" aria-atomic="true">
        <span aria-hidden="true">{color === "navy" ? "☾" : "✦"}</span>
        <p>{color === "navy" ? "You want to dress like the night." : "You want to dress like the stars."}</p>
        <small>{color === "navy" ? "Timeless. Mysterious. Elegant." : "Radiant. Brilliant. Enchanting."}</small>
      </div>
      <nav className="festival-navigation dress-navigation" aria-label="Constellation navigation">
        {links.map(([destination,icon],i) => <button type="button" key={destination} aria-current={destination === "Dress Code" ? "page" : undefined} className="festival-star" style={{"--delay": `${i*.55}s`}} onClick={() => navigate(destination)}><img src={`${base}${icon}-star.webp`} alt=""/><span>{destination}</span></button>)}
      </nav>
    </main>
  );
}

function App() {
  const [settings] = useState(initialSettings);
  const [entered, setEntered] = useState(() => new URLSearchParams(window.location.search).get("return") === "rsvp");
  const [stage, setStage] = useState("invitation");
  const timers = useRef([]);
  useEffect(() => () => timers.current.forEach(clearTimeout), []);
  const [page, setPage] = useState("Home");
  const musicRef = useRef(null);
  const videoRef = useRef(null);
  const [mobile, setMobile] = useState(() => window.matchMedia("(max-width: 650px)").matches);
  const [videoBlocked, setVideoBlocked] = useState(false);

  useEffect(() => {
    const query = window.matchMedia("(max-width: 650px)");
    const change = () => setMobile(query.matches);
    query.addEventListener("change", change);
    return () => query.removeEventListener("change", change);
  }, []);

  useEffect(() => {
    if (entered) return;
    const video = videoRef.current;
    if (!video) return;
    video.muted = true;
    setVideoBlocked(false);
    video.play().catch(() => setVideoBlocked(true));
  }, [mobile, entered]);

  useEffect(() => {
    const url = new URL(window.location.href);
    if (url.searchParams.get("return") === "rsvp") { url.searchParams.delete("return"); window.history.replaceState(null, "", url); }
  }, []);

  function openInvitation() {
    const music = musicRef.current;
    if (music) {
      music.volume = 0.45;
      music.play().catch(() => {});
    }
    if (stage !== "invitation") return;
    setStage("flash");
    timers.current.push(setTimeout(() => { setEntered(true); setStage("home"); }, 550));
  }

  function navigate(destination) {
    if (musicRef.current?.paused) { musicRef.current.volume = 0.45; musicRef.current.play().catch(() => {}); }
    setStage("home");
    setPage(destination);
    window.scrollTo({
      top: 0,
      behavior: "auto"
    });
  }

  const raffle = [
    {
      icon: "✦",
      title: "Major Prize",
      description: settings.majorPrize
    },
    {
      icon: "✧",
      title: "Minor Prizes",
      description: settings.minorPrize
    },
    {
      icon: "★",
      title: "Consolation Prizes",
      description: settings.consolationPrize
    }
  ];

  const awards = [
    {
      icon: "🏆",
      title: "Annual Perfect Attendance",
      description:
        "Recognizing exceptional commitment."
    },
    {
      icon: "🏆",
      title: "Loyalty Award",
      description:
        "Honoring years of dedication."
    },
    {
      icon: "👑👑",
      title: "Mr. and Mrs. MPST",
      description:
        "A celebration of elegance and confidence."
    }
  ];

  
 
  return (
    <>
      {/* Mounted once, so playback continues when the invitation opens. */}
      <audio
        ref={musicRef}
        src={`${import.meta.env.BASE_URL}music/christmas.mp3`}
        loop
        preload="none"
      />
      {!entered ? (
        <main className={`christmas-opening ${stage === "flash" ? "flash-active" : ""}`}>
          <div className="invitation-artwork">
            <video
              key={mobile ? "mobile" : "desktop"}
              ref={videoRef}
              className="invitation-image"
              src={`${import.meta.env.BASE_URL}images/${mobile ? "christmas-invitation-mobile.mp4" : "christmas-invitation.mp4"}`}
              autoPlay
              muted
              loop
              playsInline
              preload="auto"
              aria-label="MPST Christmas Party 2026 invitation"
              onPlaying={() => setVideoBlocked(false)}
              onError={() => setVideoBlocked(true)}
            />
            <button
              type="button"
              className="invitation-seal-button"
              onClick={openInvitation}
              disabled={stage !== "invitation"}
              aria-label="Enter the Christmas celebration"
            >
              <span className="sr-only">Enter the Celebration</span>
            </button>
          </div>
          {videoBlocked && (
            <div className="opening-fallback">
              <button className="primary-button" onClick={() => videoRef.current?.play().catch(() => {})}>Play invitation</button>
              <button className="primary-button" onClick={openInvitation}>Enter the Celebration</button>
            </div>
          )}
        </main>
      ) : (
        <div className="website">
      {page === "Home" ? (
        <main className="layered-home" style={{ "--winter-background": `url("${import.meta.env.BASE_URL}images/winter-${mobile ? "mobile" : "desktop"}.webp")` }}>
          <div className="layered-content">
            <picture className="festival-title">
              <source media="(max-width: 650px)" srcSet={`${import.meta.env.BASE_URL}images/title-mobile.webp`} />
              <img src={`${import.meta.env.BASE_URL}images/title-desktop.webp`} alt="Maruichi Philippines Steel Tube Inc. Christmas Under the Stars" />
            </picture>
            <div className="festival-countdown"><Countdown target={settings.eventDate} /></div>
            <div className="festival-details"><span>▣ DECEMBER 07, 2026 · 5–10 PM</span><span>◆ JET HOTEL, LIPA CITY</span></div>
            <button className="festival-rsvp" onClick={() => navigate("RSVP")}>❄ <span>Please Confirm Your Attendance</span> ✦</button>
            <nav className="festival-navigation" aria-label="Constellation navigation">
              {[["Home","home","Santa's Sleigh"],["Venue","venue","Reindeer"],["Raffle","raffle","Christmas Gift"],["Program","program","Christmas Bell"],["Dress Code","dress","Christmas Tree"],["Admin Portal","rsvp","Christmas Angel"]].map(([destination, icon, label],i) => (
                <button key={destination} className="festival-star" style={{"--delay": `${i * .55}s`}} onClick={() => navigate(destination)} aria-label={`${label}: ${destination}`}>
                  <img src={`${import.meta.env.BASE_URL}images/${icon}-star.webp`} alt="" />
                  <span>{destination}</span>
                </button>
              ))}
            </nav>
          </div>
          <div className="factory-space" aria-hidden="true" />
        </main>
      ) : page === "Dress Code" ? null : (
        null
      )}

      {page === "Dress Code" && <DressCode mobile={mobile} navigate={navigate} />}

      {page !== "Home" && page !== "Dress Code" && (
        <main className="dress-page shared-celestial" style={{"--dress-background": `url("${import.meta.env.BASE_URL}images/winter-${mobile ? "mobile" : "desktop"}.webp")`}}>
          <header className="dress-heading"><p className="dress-company">{settings.company}</p><p className="dress-theme">Christmas Under the Stars</p><h1>{page === "RSVP" ? "Attendance" : page}</h1></header>
          {page === "RSVP" ? <RSVP settings={settings} /> : page === "Admin Portal" ? (
            <section className="celestial-panel"><h2>Authorized personnel only</h2><p>Access the protected RSVP administration dashboard.</p>{ADMIN_WEB_APP_URL ? <a className="primary-button" href={ADMIN_WEB_APP_URL} target="_blank" rel="noopener noreferrer">Sign in to Admin Portal</a> : <p>Admin access is being prepared.</p>}</section>
          ) : <section className="celestial-panel"><h2>{page === "Venue" ? settings.venue : page === "Raffle" ? "Christmas Raffle" : "Program and Awards"}</h2><p>Official details will be announced soon.</p></section>}
          <nav className="festival-navigation dress-navigation" aria-label="Constellation navigation">{[["Home","home"],["Venue","venue"],["Raffle","raffle"],["Program","program"],["Dress Code","dress"],["Admin Portal","rsvp"]].map(([destination,icon],i)=><button type="button" key={destination} aria-current={page===destination ? "page" : undefined} className="festival-star" style={{"--delay":`${i*.55}s`}} onClick={()=>navigate(destination)}><img src={`${import.meta.env.BASE_URL}images/${icon}-star.webp`} alt=""/><span>{destination}</span></button>)}</nav>
          <footer>✦ {settings.company} | Christmas Party 2026 ✦</footer>
        </main>
      )}
        </div>
      )}
    </>
  );
}

createRoot(
  document.getElementById("root")
).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
