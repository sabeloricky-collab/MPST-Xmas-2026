
import React, { useEffect, useState } from "react";
import { createRoot } from "react-dom/client";
import "./style.css";

const initialSettings = {
  company: "Maruichi Philippines Steel Tube Inc.",
  title: "Christmas Party 2026",
  theme: "Under the Stars",
  eventDate: "2026-12-07T17:00:00+08:00",
  eventEnd: "2026-12-07T22:00:00+08:00",
  deadline: "2026-11-30",
  venue: "Jet Hotel, Lipa City",
  invitation: "An evening of gratitude, celebration, and shining moments together.",
  thankYou: "Thank you for your RSVP! Please bring a gift worth ₱500 to share the spirit of Christmas.",
  majorPrize: "Mio Gravis, Matte Brown",
  minorPrize: "Home Appliances",
  consolationPrize: "Appliances and Cash Prizes"
};

const sections = [
  "Home", "Dress Code", "Venue",
  "Raffle", "Program", "RSVP"
];

function Countdown({ target }) {
  const [now, setNow] = useState(Date.now());

  useEffect(() => {
    const timer = setInterval(() => setNow(Date.now()), 1000);
    return () => clearInterval(timer);
  }, []);

  const remaining = Math.max(0, new Date(target).getTime() - now);

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
          <strong>{String(value).padStart(2, "0")}</strong>
          <small>{["DAYS", "HOURS", "MIN", "SEC"][index]}</small>
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
        <button onClick={() =>
          setIndex((index - 1 + items.length) % items.length)
        }>← Previous</button>
        <span>{index + 1} / {items.length}</span>
        <button onClick={() =>
          setIndex((index + 1) % items.length)
        }>Next →</button>
      </div>
    </div>
  );
}

function RSVP({ settings }) {
  const [form, setForm] = useState({
    name: "",
    employeeNumber: "",
    attendance: "accept",
    reason: ""
  });
  const [message, setMessage] = useState("");

  const deadlinePassed = Date.now() >
    new Date(settings.deadline + "T23:59:59+08:00").getTime();

  function submit(event) {
    event.preventDefault();

    if (!form.name.trim() || !form.employeeNumber.trim()) {
      setMessage("Please enter your name and employee number.");
      return;
    }

    if (form.attendance === "decline" && !form.reason.trim()) {
      setMessage("Please provide a reason for declining.");
      return;
    }

    setMessage(
      "The form is valid. Database submission will be enabled " +
      "after we connect Firebase. No RSVP has been saved yet."
    );
  }

  return (
    <section className="content-section">
      <p className="eyebrow">YOUR PRESENCE MATTERS</p>
      <h1>RSVP Registration</h1>
      <p>Deadline: November 30, 2026</p>

      {deadlinePassed ? (
        <div className="form-card">
          <h2>Registration Closed</h2>
          <p>The RSVP deadline has passed.</p>
        </div>
      ) : (
        <form className="form-card" onSubmit={submit}>
          <label>
            Employee Name
            <input
              required
              maxLength={120}
              value={form.name}
              onChange={e => setForm({
                ...form, name: e.target.value
              })}
              placeholder="Enter your full name"
            />
          </label>

          <label>
            Employee Number
            <input
              required
              maxLength={50}
              value={form.employeeNumber}
              onChange={e => setForm({
                ...form, employeeNumber: e.target.value
              })}
              placeholder="Enter your employee number"
            />
          </label>

          <label>
            Attendance Confirmation
            <select
              value={form.attendance}
              onChange={e => setForm({
                ...form, attendance: e.target.value
              })}
            >
              <option value="accept">Joyfully Accepts</option>
              <option value="decline">Regretfully Declines</option>
            </select>
          </label>

          {form.attendance === "decline" && (
            <label>
              Reason for Not Joining
              <textarea
                required
                value={form.reason}
                onChange={e => setForm({
                  ...form, reason: e.target.value
                })}
              />
            </label>
          )}

          <button type="submit" className="primary-button">
            Validate RSVP
          </button>
          {message && <p role="status">{message}</p>}
        </form>
      )}
    </section>
  );
}

function App() {
  const [settings] = useState(initialSettings);
  const [entered, setEntered] = useState(false);
  const [page, setPage] = useState("Home");

  function navigate(destination) {
    setPage(destination);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  const raffle = [
    { icon: "✦", title: "Major Prize",
      description: settings.majorPrize },
    { icon: "✧", title: "Minor Prizes",
      description: settings.minorPrize },
    { icon: "★", title: "Consolation Prizes",
      description: settings.consolationPrize }
  ];

  const awards = [
    { icon: "🏆", title: "Annual Perfect Attendance",
      description: "Recognizing exceptional commitment." },
    { icon: "🏆", title: "Loyalty Award",
      description: "Honoring years of dedication." },
    { icon: "👑👑", title: "Mr. and Mrs. MPST",
      description: "A celebration of elegance and confidence." }
  ];

  if (!entered) {
    return (
      <main className="intro">
        <div className="stars">✦ ✧ ✦ ✧ ✦</div>
        <p className="eyebrow">YOU ARE CORDIALLY INVITED</p>
        <h1 className="shining">{settings.company}</h1>
        <h2>{settings.title}</h2>
        <p className="theme-title">{settings.theme}</p>
        <p>December 07, 2026 | 5:00 PM</p>
        <Countdown target={settings.eventDate} />
        <button className="primary-button" onClick={() =>
          setEntered(true)
        }>
          ✦ Enter the Celebration
        </button>
      </main>
    );
  }

  return (
    <div className="website">
      <header className="site-header">
        <button className="logo" onClick={() => navigate("Home")}>
          ✦ MPST 2026
        </button>
        <nav aria-label="Main navigation">
          {sections.map(section => (
            <button
              key={section}
              className={page === section ? "active" : ""}
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
            <p className="eyebrow">{settings.company}</p>
            <div className="hero-star">✦</div>
            <h1 className="shining">{settings.theme}</h1>
            <h2>{settings.title}</h2>
            <p>{settings.invitation}</p>
            <p>December 07, 2026 | 5:00 PM to 10:00 PM</p>
            <button
              className="primary-button"
              onClick={() => navigate("RSVP")}
            >
              Confirm Your Attendance
            </button>
          </section>

          <section className="content-section">
            <h2>Countdown to Our Celebration</h2>
            <Countdown target={settings.eventDate} />
            <h2>Follow the Stars</h2>
            <div className="star-grid">
              {sections.filter(s => s !== "Home").map(s => (
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
          <p className="eyebrow">AN EVENING OF ELEGANCE</p>
          <h1>Dress to Shine</h1>
          <p>Official Colors: Navy Blue and Silver</p>
          <div className="dress-grid">
            <article className="feature-card">
              <div className="feature-icon">♟</div>
              <h2>Gentlemen</h2>
              <p>Formal Wear</p>
              <p>Navy Blue and Silver</p>
            </article>
            <article className="feature-card">
              <div className="feature-icon">♛</div>
              <h2>Ladies</h2>
              <p>Long Gown</p>
              <p>Navy Blue and Silver</p>
            </article>
          </div>
          <div className="color-swatches">
            <span style={{background:"#0B1B3A"}} />
            <span style={{background:"#AAB6C8"}} />
            <span style={{background:"#E4E9F0"}} />
          </div>
        </section>
      )}

      {page === "Venue" && (
        <section className="content-section">
          <p className="eyebrow">THE CELEBRATION VENUE</p>
          <h1>{settings.venue}</h1>
          <p>December 07, 2026 | 5:00 PM to 10:00 PM</p>
          <div className="feature-card">
            <h2>Join Us in Lipa City</h2>
            <p>Celebrate with the entire MPST family.</p>
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
          <p className="eyebrow">EXCITING CHRISTMAS SURPRISES</p>
          <h1>Christmas Raffle</h1>
          <Slideshow items={raffle} />
        </section>
      )}

      {page === "Program" && (
        <section className="content-section">
          <p className="eyebrow">CELEBRATING OUR PEOPLE</p>
          <h1>Program and Awards</h1>
          <Slideshow items={awards} />
        </section>
      )}

      {page === "RSVP" && <RSVP settings={settings} />}

      <footer>
        ✦ {settings.company} | Christmas Party 2026 ✦
      </footer>
    </div>
  );
}

createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
