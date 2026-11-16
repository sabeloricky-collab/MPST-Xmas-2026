

import React, { useEffect, useState } from "react";
import { createRoot } from "react-dom/client";
import "./style.css";
import { db, auth } from "./firebase";
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
  const deadlinePassed = Date.now() >
    new Date(settings.deadline + "T23:59:59+08:00").getTime();

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
