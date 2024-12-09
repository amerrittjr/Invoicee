import React from "react";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import "./landingPage.css";

const LandingPage = () => {
  useEffect(() => {
    const script = document.createElement("script");
    script.src = "./landingPageFunctions";

    script.async = true;

    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  return (
    <div>
      <header>
        <div className="navbar">
          <div className="logo">Invoicee</div>
          <ul className="nav-links">
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/features">Features</Link>
            </li>
            <li>
              <Link to="/pricing">Pricing</Link>
            </li>
            <li>
              <Link to="/contact">Contact</Link>
            </li>
            <li>
              <Link to="/login" className="login-button">
                Login
              </Link>
            </li>
          </ul>
        </div>
      </header>
      <section className="hero scroll-element">
        <div className="hero-text">
          <h1>Welcome to Invoicee</h1>
          <p>All of your invoice needs, in one place</p>
          <div className="cta-buttons">
            <Link to="/signup" className="btn-primary">
              Get Started
            </Link>
            <Link to="/learn-more" className="btn-secondary">
              Learn More
            </Link>
          </div>
        </div>
        <div className="hero-image">
          <img src="/big-header-image" alt="App Mockup" />
        </div>
      </section>
      <section className="features scroll-element">
        <h2>Features</h2>
        <div className="feature-list">
          <div className="feature-item">
            <img src="/invoice.jpg" alt="Feature 1" />
            <h3>Invoice Creation</h3>
            <p>Control your business, and grow at an exponential rate</p>
          </div>
          <div className="feature-item">
            <img src="path/to/icon2.png" alt="Feature 2" />
            <h3>Feature 2</h3>
            <p>Manage your invoices with ease and efficiency</p>
          </div>
          <div className="feature-item">
            <img src="path/to/icon3.png" alt="Feature 3" />
            <h3>Feature 3</h3>
            <p>Access your data from anywhere, anytime</p>
          </div>
        </div>
      </section>
      <section className="comparison scroll-element">
        <h2>Compare Invoicee with Other Software</h2>
        <div className="comparison-table">
          <div className="comparison-row">
            <div className="comparison-column">
              <h3>Invoicee</h3>
              <ul>
                <li>Feature 1</li>
                <li>Feature 2</li>
                <li>Feature 3</li>
              </ul>
            </div>
            <div className="comparison-column">
              <h3>Other Software</h3>
              <ul>
                <li>Feature A</li>
                <li>Feature B</li>
                <li>Feature C</li>
              </ul>
            </div>
          </div>
        </div>
      </section>
      <section className="pricing scroll-element">
        <h2>Pricing</h2>
        <div className="pricing-cards">
          <div className="pricing-card">
            <h3>Free</h3>
            <p>$0/month</p>
            <ul>
              <li>Feature 1</li>
              <li>Feature 2</li>
              <li>Feature 3</li>
            </ul>
            <Link to="/signup" className="btn-primary">
              Get Started
            </Link>
          </div>
          <div className="pricing-card">
            <h3>Pro</h3>
            <p>$9.99/month</p>
            <ul>
              <li>Feature 1</li>
              <li>Feature 2</li>
              <li>Feature 3</li>
            </ul>
            <Link to="/signup" className="btn-primary">
              Get Started
            </Link>
          </div>
          <div className="pricing-card">
            <h3>Enterprise</h3>
            <p>$29.99/month</p>
            <ul>
              <li>Feature 1</li>
              <li>Feature 2</li>
              <li>Feature 3</li>
            </ul>
            <Link to="/signup" className="btn-primary">
              Get Started
            </Link>
          </div>
        </div>
      </section>
      <section className="testimonials scroll-element">
        <h2>What Our Customers Say</h2>
        <div className="testimonial-slide active">
          <p>
            "Invoicee has transformed the way we manage our invoices. Highly
            recommend!"
          </p>
          <p>- John Doe, CEO of Company</p>
        </div>
        <div className="testimonial-slide">
          <p>
            "The best invoicing software we've ever used. It's simple and
            efficient."
          </p>
          <p>- Jane Smith, CFO of Business</p>
        </div>
      </section>
      <section className="contact scroll-element">
        <h2>Contact Us</h2>
        <form>
          <label htmlFor="name">Name</label>
          <input type="text" id="name" name="name" required />
          <label htmlFor="email">Email</label>
          <input type="email" id="email" name="email" required />
          <label htmlFor="message">Message</label>
          <textarea id="message" name="message" required></textarea>
          <button type="submit" className="btn-primary">
            Send Message
          </button>
        </form>
      </section>
      <footer className="scroll-element">
        <p>&copy; 2023 Invoicee. All rights reserved.</p>
        <ul>
          <li>
            <Link to="/privacy-policy">Privacy Policy</Link>
          </li>
          <li>
            <Link to="/terms-of-service">Terms of Service</Link>
          </li>
        </ul>
        <div className="social-media">
          <a href="https://facebook.com">Facebook</a>
          <a href="https://twitter.com">Twitter</a>
          <a href="https://linkedin.com">LinkedIn</a>
        </div>
      </footer>
      <button id="back-to-top" className="scroll-element">
        Back to Top
      </button>
      <button id="theme-toggle" className="scroll-element">
        Toggle Theme
      </button>
    </div>
  );
};

export default LandingPage;
