import React from 'react';
import { MessageCircle, Mail, MapPin, Camera, User, MessageSquare, Send } from 'lucide-react';

export const Contact: React.FC = () => {
  return (
    <div className="container" style={{ padding: '4rem 1rem', maxWidth: '800px', margin: '0 auto' }}>
      <h1 style={{ fontSize: '3rem', marginBottom: '1rem', textAlign: 'center' }}>Get in Touch</h1>
      <p style={{ textAlign: 'center', color: '#666', fontSize: '1.2rem', marginBottom: '3rem' }}>
        Have a question about our sauces or want to stock Zesty Co. in your restaurant? We'd love to hear from you.
      </p>

      <div style={{ display: 'flex', gap: '2rem', flexWrap: 'wrap' }}>
        <div style={{ flex: '1 1 300px', background: '#f8f8f8', padding: '2rem', borderRadius: '16px' }}>
          <h2 style={{ marginBottom: '1.5rem', fontSize: '1.5rem' }}>Contact Information</h2>
          
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1.5rem' }}>
            <div style={{ background: '#25D366', color: 'white', padding: '10px', borderRadius: '50%' }}>
              <MessageCircle size={24} />
            </div>
            <div>
              <h3 style={{ fontSize: '1.1rem', margin: 0 }}>WhatsApp Us</h3>
              <a href="https://wa.me/919999999999" target="_blank" rel="noopener noreferrer" style={{ color: '#666', textDecoration: 'none' }}>+91 99999 99999</a>
            </div>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1.5rem' }}>
            <div style={{ background: '#e63946', color: 'white', padding: '10px', borderRadius: '50%' }}>
              <Mail size={24} />
            </div>
            <div>
              <h3 style={{ fontSize: '1.1rem', margin: 0 }}>Email</h3>
              <a href="mailto:hello@zestyco.in" style={{ color: '#666', textDecoration: 'none' }}>hello@zestyco.in</a>
            </div>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
            <div style={{ background: '#457b9d', color: 'white', padding: '10px', borderRadius: '50%' }}>
              <MapPin size={24} />
            </div>
            <div>
              <h3 style={{ fontSize: '1.1rem', margin: 0 }}>Location</h3>
              <span style={{ color: '#666' }}>Chennai, India</span>
            </div>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginTop: '1.5rem' }}>
            <div style={{ background: '#E1306C', color: 'white', padding: '10px', borderRadius: '50%' }}>
              <Camera size={24} />
            </div>
            <div>
              <h3 style={{ fontSize: '1.1rem', margin: 0 }}>Instagram</h3>
              <a href="https://instagram.com/zestyco" target="_blank" rel="noopener noreferrer" style={{ color: '#666', textDecoration: 'none' }}>@zestyco</a>
            </div>
          </div>
        </div>

        <div style={{ flex: '1 1 400px', background: 'white', padding: '2rem', borderRadius: '16px', boxShadow: '0 4px 20px rgba(0,0,0,0.05)' }}>
          <form style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }} onSubmit={(e) => { e.preventDefault(); alert("Thanks for reaching out! We will get back to you soon."); }}>
            <div>
              <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 'bold', color: '#333' }}>Name</label>
              <div style={{ position: 'relative' }}>
                <User size={20} color="#aaa" style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)' }} />
                <input type="text" placeholder="Your Name" required style={{ width: '100%', padding: '0.8rem 0.8rem 0.8rem 40px', borderRadius: '8px', border: '1px solid #ddd', fontSize: '1rem' }} />
              </div>
            </div>
            <div>
              <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 'bold', color: '#333' }}>Email / Phone Number</label>
              <div style={{ position: 'relative' }}>
                <Mail size={20} color="#aaa" style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)' }} />
                <input type="text" placeholder="How can we reach you?" required style={{ width: '100%', padding: '0.8rem 0.8rem 0.8rem 40px', borderRadius: '8px', border: '1px solid #ddd', fontSize: '1rem' }} />
              </div>
            </div>
            <div>
              <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 'bold', color: '#333' }}>Message</label>
              <div style={{ position: 'relative' }}>
                <MessageSquare size={20} color="#aaa" style={{ position: 'absolute', left: '12px', top: '12px' }} />
                <textarea placeholder="How can we help?" rows={5} required style={{ width: '100%', padding: '0.8rem 0.8rem 0.8rem 40px', borderRadius: '8px', border: '1px solid #ddd', fontSize: '1rem', fontFamily: 'inherit' }}></textarea>
              </div>
            </div>
            <button type="submit" style={{ padding: '1rem', background: '#e63946', color: 'white', border: 'none', borderRadius: '8px', fontSize: '1.1rem', cursor: 'pointer', fontWeight: 'bold', display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '8px', transition: 'background 0.2s' }}>
              <Send size={20} /> Send Message
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};
