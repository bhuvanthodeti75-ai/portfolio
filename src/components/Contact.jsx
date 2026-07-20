import { useState, useEffect, useRef } from 'react';
import Magnet from './Magnet';
import { HiPaperAirplane, HiCheckCircle, HiMail, HiExclamationCircle } from 'react-icons/hi';
import './Contact.css';

export default function Contact() {
  const sectionRef = useRef(null);
  const [formData, setFormData] = useState({ name: '', email: '', subject: '', message: '' });
  const [status, setStatus] = useState('idle'); // 'idle' | 'submitting' | 'success' | 'error'
  const [statusMsg, setStatusMsg] = useState('');

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
          }
        });
      },
      { threshold: 0.1 }
    );

    const reveals = sectionRef.current?.querySelectorAll('.reveal');
    reveals?.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('submitting');
    setStatusMsg('');

    try {
      // Submit form directly to Gmail via FormSubmit API
      const res = await fetch('https://formsubmit.co/ajax/bhuvanthodeti75@gmail.com', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        body: JSON.stringify({
          Name: formData.name,
          Email: formData.email,
          _subject: `New Portfolio Message from ${formData.name}: ${formData.subject || 'General Inquiry'}`,
          Subject: formData.subject || 'Portfolio Inquiry',
          Message: formData.message,
          _template: 'table',
        }),
      });

      const data = await res.json();

      if (res.ok && (data.success === 'true' || data.success === true)) {
        setStatus('success');
        setStatusMsg('Thank you! Your message has been sent directly to my Gmail (bhuvanthodeti75@gmail.com).');
        setFormData({ name: '', email: '', subject: '', message: '' });
      } else {
        setStatus('error');
        setStatusMsg('Could not send automatically. Opening your email app...');
        setTimeout(() => {
          window.location.href = `mailto:bhuvanthodeti75@gmail.com?subject=${encodeURIComponent(
            formData.subject || 'Portfolio Inquiry'
          )}&body=${encodeURIComponent(`Name: ${formData.name}\nEmail: ${formData.email}\n\n${formData.message}`)}`;
        }, 1000);
      }
    } catch (err) {
      console.error(err);
      setStatus('error');
      setStatusMsg('Opening your email app to send directly...');
      window.location.href = `mailto:bhuvanthodeti75@gmail.com?subject=${encodeURIComponent(
        formData.subject || 'Portfolio Inquiry'
      )}&body=${encodeURIComponent(`Name: ${formData.name}\nEmail: ${formData.email}\n\n${formData.message}`)}`;
    }
  };

  return (
    <section className="contact section" id="contact" ref={sectionRef}>
      <div className="container">
        <div className="section-divider reveal">
          <div className="section-divider__box">05</div>
          <span className="section-divider__text">CONTACT – THE COMMUNICATION HUB</span>
          <div className="section-divider__line"></div>
        </div>
        <div className="section-header reveal" style={{ marginTop: '20px', marginBottom: '30px', textAlign: 'center' }}>
          <Magnet padding={50} disabled={false} magnetStrength={10}>
            <h2>Get In Touch</h2>
          </Magnet>
          <p>Have an opportunity, project, or collaboration in mind? Write a message below to email me directly.</p>
        </div>

        <div className="contact__wrapper reveal">
          <form className="contact__form card" onSubmit={handleSubmit}>
            <div className="contact__form-grid">
              <div className="contact__field">
                <label htmlFor="name">Your Name</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  required
                  placeholder="e.g. Aarav Sharma"
                  value={formData.name}
                  onChange={handleChange}
                />
              </div>

              <div className="contact__field">
                <label htmlFor="email">Your Email</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  required
                  placeholder="e.g. aarav@example.com"
                  value={formData.email}
                  onChange={handleChange}
                />
              </div>
            </div>

            <div className="contact__field">
              <label htmlFor="subject">Subject</label>
              <input
                type="text"
                id="subject"
                name="subject"
                placeholder="e.g. Web Development Inquiry / Project Collaboration"
                value={formData.subject}
                onChange={handleChange}
              />
            </div>

            <div className="contact__field">
              <label htmlFor="message">Message</label>
              <textarea
                id="message"
                name="message"
                rows={5}
                required
                placeholder="Write your message here..."
                value={formData.message}
                onChange={handleChange}
              ></textarea>
            </div>

            {status === 'success' && (
              <div className="contact__status contact__status--success">
                <HiCheckCircle />
                <span>{statusMsg}</span>
              </div>
            )}

            {status === 'error' && (
              <div className="contact__status contact__status--error">
                <HiExclamationCircle />
                <span>{statusMsg}</span>
              </div>
            )}

            <div className="contact__action-row">
              <button
                type="submit"
                className="btn-primary contact__submit-btn"
                disabled={status === 'submitting'}
              >
                {status === 'submitting' ? (
                  <>Sending to Gmail...</>
                ) : (
                  <>
                    Send Message <HiPaperAirplane className="contact__send-icon" />
                  </>
                )}
              </button>

              <a
                href="mailto:bhuvanthodeti75@gmail.com"
                className="contact__direct-email-btn"
                title="Send email directly via Gmail client"
              >
                <HiMail /> bhuvanthodeti75@gmail.com
              </a>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
}
