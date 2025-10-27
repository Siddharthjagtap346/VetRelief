import React, { useState } from 'react';
import '../App.css';

function Contact() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    alert(`Thank you, ${name}! We will contact you soon.`);
    setName('');
    setEmail('');
    setMessage('');
  };

  return (
    <div className="contact-page">
      <div className="contact-header">
        <h1>Contact Us</h1>
        <p>We’d love to hear from you! Reach out with any questions or feedback.</p>
      </div>

      <div className="contact-content">
        <form className="contact-form" onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Your Name"
            className="form-input"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
          <input
            type="email"
            placeholder="Your Email"
            className="form-input"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <textarea
            placeholder="Your Message"
            className="form-input"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            rows="5"
            required
          ></textarea>
          <button type="submit" className="form-btn">Send Message</button>
        </form>

        <div className="contact-info">
          <h2>Our Address</h2>
          <p>123 Vet Relief Street<br />Pune, Maharashtra, India<br />Pin: 400001</p>

          <h2>Contact Details</h2>
          <p>Email: support@vetrelief.com<br />Phone: +91 9876543210</p>

          <h2>Developers Team</h2>
          <ul>
            <li>Siddharth Jagtap – Frontend & API & blockchain</li>
            <li> Adita Joshi– UI/UX Designer</li>
            <li>Parimal matte – Backend </li>
            <li> Ishant Mahadik -  Database</li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default Contact;