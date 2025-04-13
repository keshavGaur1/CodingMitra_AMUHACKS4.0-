import "./LandingPage.css";
import React from 'react';
// import './App.css';

const App = () => {
  return (
    <div className="landing-page">
      {/* Header */}
      <header className="header">
        <div className="logo">QRLIFE</div>
        <nav className="nav">
          <a href="#home">HOME</a>
          <a href="#get-started">User profile</a>
          <a href="#shop"> Emergency Details </a>
          <a href="#responder">Register </a>
          <a href="#login">LOGIN</a>
        </nav>
      </header>

      {/* Hero Section */}
      <section className="hero">
        <div className="hero-content">
          <h1 className="hero-title animate-fade-in">YOUR HEALTH. YOUR CONTROL.</h1>
          <p className="hero-subtitle animate-slide-up">Smart Medical ID that speaks for you when you can't</p>
          <button className="cta-button animate-pulse">GET YOURS TODAY</button>
        </div>
        <div className="hero-images">
          <img src="https://via.placeholder.com/300x200/1a237e/ffffff?text=Medical+Bracelet" alt="Medical Bracelet" className="animate-float" />
          <img src="https://via.placeholder.com/300x200/0d47a1/ffffff?text=QR+Code+Scan" alt="QR Code Scan" className="animate-float-delay" />
        </div>
      </section>

      {/* Features Section */}
      <section className="features">
        <div className="feature-card animate-card">
          <div className="feature-icon">📱</div>
          <h3>Easy to edit</h3>
          <p>
            Your LIFEID Medical ID Syncs With An Online, Free User Profile Dashboard. 
            Choose The Information You Provide And Opt-In For GPS Texting. 
            Your Contacts Get A Text When Your LIFEID Is Scanned.
          </p>
        </div>
        
        <div className="feature-card animate-card">
          <div className="feature-icon">🔗</div>
          <h3>Easy to access</h3>
          <p>
            Edit Your Information And Emergency Contact In Your LIFEID Profile From Any Device 
            And Your LIFEID Bracelet, Apple Sleeve, or Helper Is Automatically Updated. 
            Easy Peasy 😊
          </p>
        </div>
        
        <div className="feature-card animate-card">
          <div className="feature-icon">⌚</div>
          <h3>Easy to wear</h3>
          <p>
            Our Sleek And Stylish LIFEIDS Come In The Form Of Medical ID Bracelets, 
            Watch Sleeves, And Other Tags. It's A Runner ID, Cyclist ID, Bicycling ID, 
            And Emergency Medical ID All In One!
          </p>
        </div>
      </section>

      {/* Testimonials */}
      <section className="testimonials">
        <h2 className="section-title">Real People, Real Experiences</h2>
        <div className="testimonial-grid">
          <div className="testimonial animate-testimonial">
            <p className="testimonial-text">
              "I just love my LIFEID! So much nicer than the old fashioned ones that made known you have a problem but don't give your info. 
              This gives you maladies, medicines, emergency contact. Anything that you want to put into it. 
              All anyone has to do is flash the camera into the code, and all that info is handy! I like both versions!' 😊  
              highly recommended !!"
            </p>
            <p className="testimonial-author">Kimberly Sansevere</p>
          </div>
          
          <div className="testimonial animate-testimonial">
            <p className="testimonial-text">
              "Lifeld saved my daughter's life. She is allergic to tree nut and went into shock. 
              When her Lifeld was scanned they knew where to find her EpiPen and who to call for help immediately. 
              There is no other medical tag out there that does this. God bless you!"
            </p>
            <p className="testimonial-author">Stewart M</p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="footer">
        <div className="footer-content">
          <div className="footer-logo">LIFEID</div>
          <div className="footer-links">
            <a href="#privacy">Privacy Policy</a>
            <a href="#terms">Terms of Service</a>
            <a href="#contact">Contact Us</a>
            <a href="#faq">FAQ</a>
          </div>
          <div className="footer-social">
            <a href="#facebook">FB</a>
            <a href="#twitter">TW</a>
            <a href="#instagram">IG</a>
          </div>
        </div>
        <div className="footer-copyright">
          © {new Date().getFullYear()} LIFEID. All rights reserved.
        </div>
      </footer>
    </div>
  );
};

export default App;