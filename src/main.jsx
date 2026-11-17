
import React, { useEffect, useRef, useState } from "react";
import { createRoot } from "react-dom/client";
import "./style.css";

const RSVP_WEB_APP_URL =
  "https://script.google.com/macros/s/AKfycbwuJ3pOhXdjL3imwLl2sL9bvQEtz_nBvzMw4QFryKbEV06WiOe7843Yi535NqnO9b77/exec";

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
  "RSVP"
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

function App() {
  const [settings] = useState(initialSettings);
  const [entered, setEntered] = useState(false);
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

  function openInvitation() {
    const music = musicRef.current;
    if (music) {
      music.volume = 0.45;
      music.play().catch(() => {});
    }
    if (stage !== "invitation") return;
    setStage("flash");
    timers.current.push(setTimeout(() => { setEntered(true); setStage("welcome"); }, 550));
    timers.current.push(setTimeout(() => setStage("home"), 3400));
  }

  function navigate(destination) {
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
        <main className={`celestial-home ${stage === "welcome" ? "welcoming" : ""}`}>
          <div className="celestial-art" data-layout={mobile ? "mobile" : "desktop"}>
            <img className="celestial-image" src={`${import.meta.env.BASE_URL}images/celestial-${mobile ? "mobile" : "desktop"}.webp`} alt="Maruichi Philippines Steel Tube Inc. Christmas Under the Stars, December 7, 2026, Jet Hotel, Lipa City" />
            <div className="welcome-title" aria-hidden={stage !== "welcome"}>Welcome to</div>
            <div className="art-countdown"><Countdown target={settings.eventDate} /></div>
            {[["Home", "Santa's Sleigh"], ["Dress Code", "Christmas Tree"], ["Venue", "Reindeer"], ["Raffle", "Christmas Gift"], ["Program", "Christmas Bell"], ["RSVP", "Christmas Angel"]].map(([destination, label], i) => (
              <button key={destination} className={`constellation constellation-${i}`} title={`${label}: ${destination}`} aria-label={`${label}: ${destination}`} onClick={() => navigate(destination)}><span>{destination}</span></button>
            ))}
            <button className="art-rsvp" onClick={() => navigate("RSVP")} aria-label="Please confirm your attendance" />
          </div>
          <nav className="celestial-nav" aria-label="Page navigation">{sections.map(section => <button key={section} onClick={() => navigate(section)}>{section}</button>)}</nav>
        </main>
      ) : (
        <header className="site-header"><button className="logo" onClick={() => navigate("Home")}>✦ MPST 2026</button><nav aria-label="Main navigation">{sections.map(section => <button key={section} className={page === section ? "active" : ""} onClick={() => navigate(section)}>{section}</button>)}</nav></header>
      )}

      {page === "Dress Code" && (
        <section className="content-section">
          <p className="eyebrow">
            AN EVENING OF ELEGANCE
          </p>

          <h1>Dress to Shine</h1>

          <p>
            Official Colors: Navy Blue and Silver
          </p>

          <div className="dress-grid">
            <article className="feature-card">
              <div className="feature-icon">
                ♟
              </div>

              <h2>Gentlemen</h2>
              <p>Formal Wear</p>
              <p>Navy Blue and Silver</p>
            </article>

            <article className="feature-card">
              <div className="feature-icon">
                ♛
              </div>

              <h2>Ladies</h2>
              <p>Long Gown</p>
              <p>Navy Blue and Silver</p>
            </article>
          </div>

          <div className="color-swatches">
            <span
              style={{ background: "#0B1B3A" }}
            />
            <span
              style={{ background: "#AAB6C8" }}
            />
            <span
              style={{ background: "#E4E9F0" }}
            />
          </div>
        </section>
      )}

      {page === "Venue" && (
        <section className="content-section">
          <p className="eyebrow">
            THE CELEBRATION VENUE
          </p>

          <h1>{settings.venue}</h1>

          <p>
            December 07, 2026 |
            5:00 PM to 10:00 PM
          </p>

          <div className="feature-card">
            <h2>Join Us in Lipa City</h2>

            <p>
              Celebrate with the entire MPST family.
            </p>

            <a
              className="primary-button"
              href="https://www.google.com/maps/search/?api=1&query=Jet+Hotel+Lipa+City"
              target="_blank"
              rel="noopener noreferrer"
            >
              Open Google Maps
            </a>
          </div>
        </section>
      )}

      {page === "Raffle" && (
        <section className="content-section">
          <p className="eyebrow">
            EXCITING CHRISTMAS SURPRISES
          </p>

          <h1>Christmas Raffle</h1>

          <Slideshow items={raffle} />
        </section>
      )}

      {page === "Program" && (
        <section className="content-section">
          <p className="eyebrow">
            CELEBRATING OUR PEOPLE
          </p>

          <h1>Program and Awards</h1>

          <Slideshow items={awards} />
        </section>
      )}

      {page === "RSVP" && (
        <RSVP settings={settings} />
      )}

      {page !== "Home" && <footer>
        ✦ {settings.company} |
        Christmas Party 2026 ✦
      </footer>}
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
