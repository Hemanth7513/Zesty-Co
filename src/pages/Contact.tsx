import React from 'react';
import { Mail, MessageCircle, MapPin, Send } from 'lucide-react';
import { PageTransition } from '../components/PageTransition';

export const Contact: React.FC = () => {
  return (
    <PageTransition>
      <div className="page-wrapper" style={{ paddingTop: '76px' }}>

        {/* ── Contact Header ── */}
        <section className="section" style={{ paddingBottom: '2rem' }}>
          <div className="container" style={{ textAlign: 'center', maxWidth: '700px' }}>
            <span className="section-label">Reach Out</span>
            <h1 className="section-title">Let's Connect</h1>
            <p className="section-body" style={{ fontSize: '1.2rem' }}>
              Whether you want to carry Zesty Co. in your store, have a question about an order, or just want to tell us which sauce you’re obsessed with — we’re here for it.
            </p>
          </div>
        </section>

        {/* ── Contact Grid ── */}
        <section className="section" style={{ paddingTop: 0 }}>
          <div className="container" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '2rem', alignItems: 'flex-start' }}>
            
            {/* Left: Contact Info (Dark Mode Premium Cards) */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
              
              <div className="premium-contact-card">
                <div className="contact-card-icon">
                  <MessageCircle size={24} />
                </div>
                <div>
                  <h3>Direct Support</h3>
                  <p>The fastest way to reach us for order updates or immediate questions.</p>
                  <a href="https://wa.me/919876543210" target="_blank" rel="noreferrer" className="contact-link">
                    WhatsApp Us &rarr;
                  </a>
                </div>
              </div>

              <div className="premium-contact-card">
                <div className="contact-card-icon">
                  <Mail size={24} />
                </div>
                <div>
                  <h3>Business & Wholesale</h3>
                  <p>Interested in stocking Zesty Co. at your cafe or retail store? Let's talk numbers.</p>
                  <a href="mailto:hello@zesty.co" className="contact-link">
                    hello@zesty.co &rarr;
                  </a>
                </div>
              </div>

              <div className="premium-contact-card">
                <div className="contact-card-icon">
                  <MapPin size={24} />
                </div>
                <div>
                  <h3>Our Kitchen</h3>
                  <p style={{ marginBottom: 0, lineHeight: 1.6 }}>
                    Zesty Co. Foods<br />
                    123 Culinary Hub, Phase 2<br />
                    Indiranagar, Bangalore 560038<br />
                    Karnataka, India
                  </p>
                </div>
              </div>

            </div>

            {/* Right: Contact Form (Clean, Light, Minimalist) */}
            <div className="premium-contact-form-container">
              <h2 style={{ fontSize: '2rem', marginBottom: '0.5rem', fontFamily: 'var(--font-display)' }}>Drop a Message</h2>
              <p style={{ color: 'var(--text-500)', marginBottom: '2.5rem' }}>We typically reply within 24 hours.</p>
              
              <form className="premium-form" onSubmit={(e) => { e.preventDefault(); alert('Thanks for reaching out! We will get back to you soon.'); }}>
                
                <div className="form-group-float">
                  <input type="text" id="name" placeholder=" " required />
                  <label htmlFor="name">Your Name</label>
                </div>

                <div className="form-group-float">
                  <input type="email" id="email" placeholder=" " required />
                  <label htmlFor="email">Email Address</label>
                </div>

                <div className="form-group-float">
                  <select id="inquiry" required defaultValue="">
                    <option value="" disabled hidden></option>
                    <option value="general">General Question</option>
                    <option value="support">Order Support</option>
                    <option value="wholesale">Wholesale / Partnership</option>
                    <option value="feedback">Feedback</option>
                  </select>
                  <label htmlFor="inquiry" className="select-label">Inquiry Type</label>
                </div>

                <div className="form-group-float">
                  <textarea id="message" rows={4} placeholder=" " required></textarea>
                  <label htmlFor="message">How can we help?</label>
                </div>

                <button type="submit" className="premium-detail-add-btn" style={{ marginTop: '1rem' }}>
                  Send Message <Send size={18} />
                </button>

              </form>
            </div>

          </div>
        </section>

      </div>
    </PageTransition>
  );
};
