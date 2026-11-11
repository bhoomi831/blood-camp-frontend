import React from 'react';
import './Footer.css';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="footer">
      <div className="footer-inner">
        <div className="footer-content">
          <div className="footer-brand">
            <span className="footer-logo">🩸</span>
            <div>
              <h4>Blood Donation Management</h4>
              <p className="footer-tagline">Saving lives through organized donation drives</p>
            </div>
          </div>
          <div className="footer-links">
            <span>Dashboard</span>
            <span className="dot">·</span>
            <span>Camps</span>
            <span className="dot">·</span>
            <span>Donors</span>
            <span className="dot">·</span>
            <span>Reports</span>
          </div>
          <div className="footer-copyright">
            &copy; {currentYear} Blood Donation Management System
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;