import { useState, useRef, useEffect } from 'react';
import PixelCard from './PixelCard';
import './Contact.css';

export default function Contact() {
  const sectionRef = useRef(null);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });
  const [status, setStatus] = useState('idle'); // 'idle' | 'submitting' | 'success' | 'error'

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
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) return;

    setStatus('submitting');

    try {
      const response = await fetch('https://formsubmit.co/ajax/bhuvanthodeti75@gmail.com', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          _replyto: formData.email,
          _subject: formData.subject || `New Portfolio Contact Message from ${formData.name}`,
          message: formData.message,
          _captcha: 'false',
          _template: 'table',
        }),
      });

      if (response.ok) {
        setStatus('success');
        setFormData({ name: '', email: '', subject: '', message: '' });
        setTimeout(() => setStatus('idle'), 6000);
      } else {
        triggerMailtoFallback();
      }
    } catch (err) {
      console.error('Form submission error:', err);
      triggerMailtoFallback();
    }
  };

  const triggerMailtoFallback = () => {
    const mailtoUrl = `mailto:bhuvanthodeti75@gmail.com?subject=${encodeURIComponent(
      formData.subject || `Portfolio Contact from ${formData.name}`
    )}&body=${encodeURIComponent(
      `Name: ${formData.name}\nEmail: ${formData.email}\n\nMessage:\n${formData.message}`
    )}`;
    window.location.href = mailtoUrl;
    setStatus('success');
    setFormData({ name: '', email: '', subject: '', message: '' });
    setTimeout(() => setStatus('idle'), 6000);
  };

  return (
    <section className="contact section" id="contact" ref={sectionRef} aria-label="Contact Bhuvan Thodeti">
      <div className="container">
        <div className="section-divider reveal">
          <div className="section-divider__box">05</div>
          <span className="section-divider__text">CONTACT – GET IN TOUCH WITH BHUVAN THODETI</span>
          <div className="section-divider__line"></div>
        </div>

        {/* Get In Touch Card Container wrapped with PixelCard */}
        <PixelCard
          variant="purple"
          gap={8}
          speed={35}
          colors="#3b82f6,#a78bfa,#c4b5fd,#60a5fa"
          className="get-in-touch-card reveal"
        >
          <div className="get-in-touch-card__inner">
            {/* Left Content Side */}
            <div className="get-in-touch-card__left">
              <h2 className="get-in-touch-card__title">
                GET <span className="get-in-touch-card__title-accent">IN</span> TOUCH
              </h2>
              <p className="get-in-touch-card__desc">
                Whether you're looking to build an AI product, design a full-stack web application, or collaborate on innovative engineering projects, I'm here to help. Reach out today to learn more.
              </p>
              <p className="get-in-touch-card__email">
                Or email me on{' '}
                <a href="mailto:bhuvanthodeti75@gmail.com" className="get-in-touch-card__email-link">
                  bhuvanthodeti75@gmail.com
                </a>
              </p>
            </div>

            {/* Right Form Side */}
            <div className="get-in-touch-card__right">
              <form className="get-in-touch-form" onSubmit={handleSubmit}>
                {status === 'success' && (
                  <div className="get-in-touch-form__success">
                    ✓ Message sent successfully to bhuvanthodeti75@gmail.com!
                  </div>
                )}
                <div className="get-in-touch-form__fields">
                  <div className="get-in-touch-form__field">
                    <input
                      type="text"
                      name="name"
                      placeholder="Name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      aria-label="Your Name"
                    />
                  </div>

                  <div className="get-in-touch-form__field">
                    <input
                      type="email"
                      name="email"
                      placeholder="Email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      aria-label="Your Email"
                    />
                  </div>

                  <div className="get-in-touch-form__field">
                    <input
                      type="text"
                      name="subject"
                      placeholder="Subject"
                      value={formData.subject}
                      onChange={handleChange}
                      aria-label="Subject"
                    />
                  </div>

                  <div className="get-in-touch-form__field get-in-touch-form__field--textarea">
                    <textarea
                      name="message"
                      placeholder="Your message"
                      rows={4}
                      value={formData.message}
                      onChange={handleChange}
                      required
                      aria-label="Your Message"
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  className="get-in-touch-form__submit"
                  disabled={status === 'submitting'}
                >
                  {status === 'submitting'
                    ? 'Sending...'
                    : status === 'success'
                      ? 'Message Sent!'
                      : 'Send message'}
                </button>
              </form>
            </div>
          </div>
        </PixelCard>
      </div>
    </section>
  );
}
