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
