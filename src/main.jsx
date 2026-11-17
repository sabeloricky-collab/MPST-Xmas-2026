
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
  const [page, setPage] = useState("Home");
  const musicRef = useRef(null);

  function openInvitation() {
    const music = musicRef.current;
    if (music) {
      music.volume = 0.45;
      music.play().catch(() => {});
    }
    setEntered(true);
  }

  function navigate(destination) {
    setPage(destination);
    window.scrollTo({
      top: 0,
      behavior: "smooth"
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
        <main className="christmas-opening">
          <div className="invitation-artwork">
            <picture>
              <source
                media="(max-width: 650px)"
                srcSet={`${import.meta.env.BASE_URL}images/christmas-invitation-mobile.gif`}
              />
              <img
                src={`${import.meta.env.BASE_URL}images/christmas-invitation.gif`}
                alt="MPST Christmas Party 2026 invitation"
                className="invitation-image"
              />
            </picture>
            <button
              type="button"
              className="invitation-seal-button"
              onClick={openInvitation}
              aria-label="Enter the Christmas celebration"
            >
              <span className="sr-only">Enter the Celebration</span>
            </button>
          </div>
          <p className="opening-hint">✦ Tap the golden star to enter the celebration ✦</p>
        </main>
      ) : (
        <div className="website">
      <header className="site-header">
        <button
          className="logo"
          onClick={() => navigate("Home")}
        >
          ✦ MPST 2026
        </button>

        <nav aria-label="Main navigation">
          {sections.map(section => (
            <button
              key={section}
              className={
                page === section ? "active" : ""
              }
              onClick={() => navigate(section)}
            >
              {section}
            </button>
          ))}
        </nav>
      </header>

      {page === "Home" && (
        <>
          <section className="hero">
            <p className="eyebrow">
              {settings.company}
            </p>

            <div className="hero-star">✦</div>

            <h1 className="shining">
              {settings.theme}
            </h1>

            <h2>{settings.title}</h2>

            <p>{settings.invitation}</p>

            <p>
              December 07, 2026 |
              5:00 PM to 10:00 PM
            </p>

            <button
              className="primary-button"
              onClick={() => navigate("RSVP")}
            >
              Confirm Your Attendance
            </button>
          </section>

          <section className="content-section">
            <h2>Countdown to Our Celebration</h2>

            <Countdown
              target={settings.eventDate}
            />

            <h2>Follow the Stars</h2>

            <div className="star-grid">
              {sections
                .filter(s => s !== "Home")
                .map(s => (
                  <button
                    className="star-card"
                    key={s}
                    onClick={() => navigate(s)}
                  >
                    <span>✦</span>
                    <strong>{s}</strong>
                    <small>Explore</small>
                  </button>
                ))}
            </div>
          </section>
        </>
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

      <footer>
        ✦ {settings.company} |
        Christmas Party 2026 ✦
      </footer>
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
