import React, { useState } from "react";
import QRCode from "react-qr-code";

import "./Dashboard.css";

const Dashboard = () => {
  const [healthInfo, setHealthInfo] = useState({
    name: "John Doe",
    age: "30",
    bloodGroup: "O+",
    allergies: "Peanuts",
    medications: "None",
    emergencyContact: "+1234567890",
  });

  const readAloud = (text) => {
    const speech = new SpeechSynthesisUtterance();
    speech.text = text;
    window.speechSynthesis.speak(speech);
  };

  const qrUrl = `https://your-domain.com/health/${healthInfo.name}`;

  return (
    <div className="dashboard">

      {/* HERO SECTION */}
      <section className="hero">
        <div className="hero-overlay">
          <h1 className="hero-title">QR LifeKey – <br />Scan, Save, Survive.</h1>
        </div>
      </section>

      {/* QUOTE SECTION */}
      <section className="quote-section">
        <p className="quote-text">
          <strong><em>
            Imagine you're in a road accident and unconscious.
            What if your phone wallpaper could save your life?
            With our system, scanning a stealth QR reveals your emergency health info,
            speaks it out loud, logs your location, and even alerts your family — instantly.
          </em></strong>
        </p>
      </section>

      {/* FEATURES SECTION */}
      <section className="key-features">
        <h2>Key Features</h2>
        <div className="features-list">
          <div className="feature-item">
            <h3>Stealth QR Code</h3>
            <p>Set it as your phone wallpaper, invisible yet lifesaving.</p>
          </div>
          <div className="feature-item">
            <h3>Text-to-Speech</h3>
            <p>Automatically reads out health info when scanned.</p>
          </div>
          <div className="feature-item">
            <h3>Location & Alerts</h3>
            <p>Sends real-time location to your emergency contacts.</p>
          </div>
        </div>
      </section>

      {/* QR CODE */}
      <section className="qr-code-section">
        <h2>Emergency QR Code</h2>
        <div className="qr-wrapper">
          <QRCode value={qrUrl} size={200} />
          <p className="qr-caption">Scan to access public health emergency details.</p>
        </div>
      </section>

      {/* TEXT TO SPEECH */}
      <section className="text-to-speech">
        <button onClick={() =>
          readAloud(
            `Name: ${healthInfo.name}, Age: ${healthInfo.age}, Blood Group: ${healthInfo.bloodGroup}, Allergies: ${healthInfo.allergies}, Medications: ${healthInfo.medications}, Emergency Contact: ${healthInfo.emergencyContact}`
          )
        }>
          🔊 Read Health Info Aloud
        </button>
      </section>

      {/* FOOTER */}
      <footer className="site-footer">
        <div className="footer-content">
          <div className="footer-col">
            <h3>QR LifeKey</h3>
            <p>Revolutionizing emergency care through technology.</p>
          </div>
          <div className="footer-col">
            <h4>Quick Links</h4>
            <ul>
              <li>Login</li>
              <li>Register</li>
              <li>Dashboard</li>
              <li>Emergency Info</li>
            </ul>
          </div>
          <div className="footer-col">
            <h4>Contact</h4>
            <p>Email: support@qrlifekey.com</p>
            <p>Emergency Helpline: 1800-QR-HELP</p>
          </div>
        </div>
        <div className="footer-bottom">
          © 2025 QR LifeKey. All rights reserved.
        </div>
      </footer>
    </div>
  );
};

export default Dashboard;