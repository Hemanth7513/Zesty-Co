import React from 'react';
import { Mail, MessageCircle, MapPin, Send } from 'lucide-react';
import { PageTransition } from '../components/PageTransition';

export const Contact: React.FC = () => {
  return (
    <PageTransition>
      <div className="page-wrapper" style={{ paddingTop: '76px' }}>

        {/* ── Contact Header ── */}
        <section className="section" style={{ paddingBottom: '0' }}>
          <div className="container" style={{ textAlign: 'center', maxWidth: '600px' }}>
            <h1 className="section-title">Get in Touch</h1>
            <p className="section-body">
              Whether you want to carry Zesty Co. in your store, have a question about an order, or just want to tell us which sauce you’re obsessed with — we’re here for it.
            </p>
          </div>
        </section>

        {/* ── Contact Grid ── */}
        <section className="section">
          <div className="container" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '3rem' }}>
            
            {/* Left: Contact Info */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
              
              <div style={{ background: 'white', padding: '2rem', borderRadius: '16px', boxShadow: '0 4px 20px rgba(0,0,0,0.05)' }}>
                <h3 style={{ fontSize: '1.2rem', marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <MessageCircle color="#e63946" /> Direct Support
                </h3>
                <p style={{ color: '#666', marginBottom: '1rem' }}>
                  The fastest way to reach us for order updates or immediate questions.
                </p>
                <a href="https://wa.me/919876543210" target="_blank" rel="noreferrer" className="btn-outline" style={{ display: 'inline-flex', alignItems: 'center', gap: '8px' }}>
                  <MessageCircle size={18} /> WhatsApp Us
                </a>
              </div>

              <div style={{ background: 'white', padding: '2rem', borderRadius: '16px', boxShadow: '0 4px 20px rgba(0,0,0,0.05)' }}>
                <h3 style={{ fontSize: '1.2rem', marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <Mail color="#e63946" /> Business & Wholesale
                </h3>
                <p style={{ color: '#666', marginBottom: '1rem' }}>
                  Interested in stocking Zesty Co. at your cafe or retail store? Let's talk numbers.
                </p>
                <a href="mailto:hello@zesty.co" className="btn-outline" style={{ display: 'inline-flex', alignItems: 'center', gap: '8px' }}>
                  <Mail size={18} /> hello@zesty.co
                </a>
              </div>

              <div style={{ background: 'white', padding: '2rem', borderRadius: '16px', boxShadow: '0 4px 20px rgba(0,0,0,0.05)' }}>
                <h3 style={{ fontSize: '1.2rem', marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <MapPin color="#e63946" /> Our Kitchen
                </h3>
                <p style={{ color: '#666', lineHeight: 1.6 }}>
                  Zesty Co. Foods<br />
                  123 Culinary Hub, Phase 2<br />
                  Indiranagar, Bangalore 560038<br />
                  Karnataka, India
                </p>
              </div>

            </div>

            {/* Right: Contact Form */}
            <div style={{ background: '#fff', padding: '2.5rem', borderRadius: '24px', boxShadow: '0 10px 40px rgba(0,0,0,0.08)' }}>
              <h2 style={{ fontSize: '1.8rem', marginBottom: '0.5rem' }}>Drop a Message</h2>
              <p style={{ color: '#666', marginBottom: '2rem' }}>We typically reply within 24 hours.</p>
              
              <form style={{ display: 'flex', flexDirection: 'column', gap: '1.2rem' }} onSubmit={(e) => { e.preventDefault(); alert('Thanks for reaching out! We will get back to you soon.'); }}>
                
                <div className="form-group">
                  <label className="form-label" style={{ fontWeight: 600 }}>Name</label>
                  <input type="text" className="form-input" placeholder="Your name" required style={{ background: '#f8f8f8', border: '1px solid #eee' }} />
                </div>

                <div className="form-group">
                  <label className="form-label" style={{ fontWeight: 600 }}>Email Address</label>
                  <input type="email" className="form-input" placeholder="you@example.com" required style={{ background: '#f8f8f8', border: '1px solid #eee' }} />
                </div>

                <div className="form-group">
                  <label className="form-label" style={{ fontWeight: 600 }}>Inquiry Type</label>
                  <select className="form-input" style={{ background: '#f8f8f8', border: '1px solid #eee' }}>
                    <option>General Question</option>
                    <option>Order Support</option>
                    <option>Wholesale / Partnership</option>
                    <option>Feedback</option>
                  </select>
                </div>

                <div className="form-group">
                  <label className="form-label" style={{ fontWeight: 600 }}>Message</label>
                  <textarea className="form-input" rows={5} placeholder="How can we help?" required style={{ background: '#f8f8f8', border: '1px solid #eee', resize: 'vertical' }}></textarea>
                </div>

                <button type="submit" className="btn-primary" style={{ marginTop: '1rem', display: 'flex', justifyContent: 'center', gap: '8px', padding: '1rem' }}>
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
