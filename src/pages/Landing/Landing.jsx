import { Button } from 'react-bootstrap';
import { motion } from 'framer-motion';
import { useState, useEffect, useRef } from 'react';

const fadeUp = { hidden: { opacity: 0, y: 40 }, show: { opacity: 1, y: 0 } };
const stagger = { hidden: {}, show: { transition: { staggerChildren: 0.15 } } };

function Counter({ end, suffix = '' }) {
  const [val, setVal] = useState(0);
  const ref = useRef(null);
  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        let start = 0;
        const interval = setInterval(() => {
          start += Math.ceil(end / 80);
          if (start >= end) { start = end; clearInterval(interval); }
          setVal(start);
        }, 25);
        observer.disconnect();
      }
    });
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [end]);
  return <span ref={ref}>{val}{suffix}</span>;
}

export default function LandingPage() {
  return (
    <div style={{ background: '#fff' }}>
      {/* Nav */}
      <nav className="glass position-fixed top-0 start-0 end-0" style={{ zIndex: 1000, padding: '0 24px', height: 64, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <div className="d-flex align-items-center gap-2 fw-bold" style={{ fontSize: 20, color: '#E53935' }}>
          <span style={{ fontSize: 24 }}>🩸</span> BLOODCONNECT
        </div>
        <div className="d-flex gap-3 align-items-center">
          <a href="/login" className="btn btn-outline-danger btn-sm rounded-pill px-4" style={{ fontWeight: 500 }}>Login</a>
          <a href="/register" className="btn btn-danger btn-sm rounded-pill px-4" style={{ fontWeight: 500 }}>Register</a>
        </div>
      </nav>

      {/* Hero */}
      <motion.section variants={stagger} initial="hidden" animate="show" className="d-flex flex-column align-items-center justify-content-center text-center px-3" style={{ minHeight: '100vh', background: 'linear-gradient(135deg, #fff5f5 0%, #ffffff 50%, #fff0f0 100%)', paddingTop: 64 }}>
        <motion.div variants={fadeUp} style={{ fontSize: 96, marginBottom: 8 }}>🩸</motion.div>
        <motion.h1 variants={fadeUp} className="fw-bold" style={{ fontSize: 'clamp(2.2rem, 6vw, 4rem)', color: '#1A1A2E', maxWidth: 700, lineHeight: 1.15 }}>Save Lives.<br />Donate Blood.</motion.h1>
        <motion.p variants={fadeUp} className="text-muted mb-4" style={{ fontSize: 'clamp(1rem, 2vw, 1.2rem)', maxWidth: 520 }}>The complete platform for managing blood donation camps, donors, volunteers, and emergency requests — all in one place.</motion.p>
        <motion.div variants={fadeUp} className="d-flex gap-3 flex-wrap justify-content-center">
          <a href="/register" className="btn btn-danger btn-lg rounded-pill px-5 py-3 fw-semibold" style={{ fontSize: 16 }}>Get Started</a>
          <a href="#features" className="btn btn-outline-dark btn-lg rounded-pill px-5 py-3 fw-semibold" style={{ fontSize: 16 }}>Learn More</a>
        </motion.div>
      </motion.section>

      {/* Stats */}
      <section className="py-5" style={{ background: '#E53935' }}>
        <div className="container">
          <motion.div initial="hidden" whileInView="show" viewport={{ once: true }} variants={stagger} className="row text-white text-center g-4">
            {[
              { label: 'Camps Organized', end: 500, suffix: '+' },
              { label: 'Registered Donors', end: 50, suffix: 'K+' },
              { label: 'Lives Saved', end: 100, suffix: 'K+' },
              { label: 'Active Volunteers', end: 2500, suffix: '+' },
            ].map((s, i) => (
              <motion.div key={i} variants={fadeUp} className="col-md-3 col-6">
                <div className="fw-bold" style={{ fontSize: 'clamp(1.8rem, 4vw, 2.8rem)' }}><Counter end={s.end} suffix={s.suffix} /></div>
                <div style={{ opacity: 0.85, fontSize: 'clamp(0.85rem, 1.5vw, 1rem)' }}>{s.label}</div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Features */}
      <section id="features" className="py-5">
        <div className="container py-5">
          <motion.div initial="hidden" whileInView="show" viewport={{ once: true }} variants={stagger} className="text-center mb-5">
            <motion.h2 variants={fadeUp} className="fw-bold mb-2" style={{ fontSize: 'clamp(1.6rem, 3vw, 2.2rem)', color: '#1A1A2E' }}>Everything You Need</motion.h2>
            <motion.p variants={fadeUp} className="text-muted" style={{ maxWidth: 500, margin: '0 auto', fontSize: '1.05rem' }}>Powerful tools to manage every aspect of blood donation camps</motion.p>
          </motion.div>
          <motion.div initial="hidden" whileInView="show" viewport={{ once: true }} variants={stagger} className="row g-4">
            {[
              { icon: '🏕️', title: 'Camp Management', desc: 'Create, schedule, and monitor blood donation camps with ease. Track attendance, donations, and volunteer assignments.' },
              { icon: '🩸', title: 'Donor Management', desc: 'Maintain detailed donor profiles, medical records, donation history, and eligibility tracking.' },
              { icon: '🚨', title: 'Emergency Response', desc: 'Quickly create and fulfill urgent blood requests. Real-time tracking of emergency blood requirements.' },
              { icon: '📊', title: 'Reports & Analytics', desc: 'Comprehensive dashboards and reports with visual insights into camp performance and donor statistics.' },
              { icon: '👥', title: 'Volunteer Coordination', desc: 'Manage volunteers, assign them to camps, track hours, and optimize your workforce allocation.' },
              { icon: '🔔', title: 'Smart Notifications', desc: 'In-app and email notifications for camp updates, emergency alerts, and important reminders.' },
            ].map((f, i) => (
              <motion.div key={i} variants={fadeUp} className="col-md-4 col-lg-4">
                <div className="card border-0 h-100" style={{ borderRadius: 16, boxShadow: '0 4px 20px rgba(0,0,0,0.05)', transition: 'all 0.3s', cursor: 'default' }}
                  onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-6px)'; e.currentTarget.style.boxShadow = '0 12px 40px rgba(0,0,0,0.1)'; }}
                  onMouseLeave={e => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = '0 4px 20px rgba(0,0,0,0.05)'; }}>
                  <div className="card-body p-4">
                    <div style={{ fontSize: 40, marginBottom: 16 }}>{f.icon}</div>
                    <h5 className="fw-semibold mb-2">{f.title}</h5>
                    <p className="text-muted mb-0" style={{ fontSize: 14 }}>{f.desc}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-5" style={{ background: '#F8F9FA' }}>
        <div className="container py-5">
          <motion.div initial="hidden" whileInView="show" viewport={{ once: true }} variants={stagger}>
            <motion.h2 variants={fadeUp} className="fw-bold text-center mb-2" style={{ fontSize: 'clamp(1.6rem, 3vw, 2.2rem)', color: '#1A1A2E' }}>How It Works</motion.h2>
            <motion.p variants={fadeUp} className="text-muted text-center mb-5" style={{ fontSize: '1.05rem' }}>Simple 3-step process to get started</motion.p>
            <div className="row g-4 justify-content-center">
              {[
                { step: '01', title: 'Register', desc: 'Sign up as a donor, volunteer, or hospital admin. Complete your profile with medical information.' },
                { step: '02', title: 'Participate', desc: 'Register for camps, volunteer your time, or create emergency blood requests when needed.' },
                { step: '03', title: 'Save Lives', desc: 'Donate blood, coordinate camps, manage volunteers, and track the impact you\'re making.' },
              ].map((s, i) => (
                <motion.div key={i} variants={fadeUp} className="col-md-4 text-center">
                  <div className="d-inline-flex align-items-center justify-content-center rounded-circle fw-bold text-white mb-3" style={{ width: 64, height: 64, background: '#E53935', fontSize: 20 }}>{s.step}</div>
                  <h5 className="fw-semibold mb-2">{s.title}</h5>
                  <p className="text-muted px-3" style={{ fontSize: 14 }}>{s.desc}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-5 text-center text-white" style={{ background: 'linear-gradient(135deg, #E53935, #C62828)' }}>
        <div className="container py-4">
          <motion.div initial={{ opacity: 0, scale: 0.95 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }}>
            <h2 className="fw-bold mb-3" style={{ fontSize: 'clamp(1.4rem, 3vw, 2rem)' }}>Ready to Make a Difference?</h2>
            <p className="mb-4" style={{ opacity: 0.9, maxWidth: 500, margin: '0 auto 20px' }}>Join thousands of donors and volunteers saving lives every day.</p>
            <a href="/register" className="btn btn-light btn-lg rounded-pill px-5 fw-semibold" style={{ color: '#E53935', fontSize: 16 }}>Get Started Today</a>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-4 text-center" style={{ background: '#1A1A2E', color: '#9CA3AF', fontSize: 14 }}>
        <div className="container">
          <div className="d-flex justify-content-center gap-4 mb-3 flex-wrap">
            <a href="#" className="text-white text-decoration-none">About</a>
            <a href="#" className="text-white text-decoration-none">Privacy</a>
            <a href="#" className="text-white text-decoration-none">Terms</a>
            <a href="#" className="text-white text-decoration-none">Contact</a>
          </div>
          <p className="mb-0">© 2026 BLOODCONNECT. All rights reserved. Made with ❤️ to save lives.</p>
        </div>
      </footer>
    </div>
  );
}