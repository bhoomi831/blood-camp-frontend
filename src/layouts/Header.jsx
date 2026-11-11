import React, { useState, useEffect, useRef } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { useTheme } from '../context/ThemeContext';
import { useAuth } from '../context/AuthContext';
import './Header.css';

/* SVG micro-icons */
const SearchSvg = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/>
  </svg>
);
const BellSvg = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"/><path d="M13.73 21a2 2 0 0 1-3.46 0"/>
  </svg>
);
const SunSvg = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="5"/><line x1="12" y1="1" x2="12" y2="3"/><line x1="12" y1="21" x2="12" y2="23"/><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/>
    <line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/><line x1="1" y1="12" x2="3" y2="12"/><line x1="21" y1="12" x2="23" y2="12"/>
    <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/>
  </svg>
);
const MoonSvg = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/>
  </svg>
);
const ChevronSvg = () => (
  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="6 9 12 15 18 9"/>
  </svg>
);
const UserSvg = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/>
  </svg>
);
const SettingsSvg = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"/>
  </svg>
);
const LogoutSvg = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/><polyline points="16 17 21 12 16 7"/><line x1="21" y1="12" x2="9" y2="12"/>
  </svg>
);
const DashboardSvg = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="3" y="3" width="18" height="18" rx="2" ry="2"/><line x1="9" y1="3" x2="9" y2="15"/><line x1="3" y1="9" x2="21" y2="9"/>
  </svg>
);
const ShieldSvg = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
  </svg>
);

const Header = () => {
  const [showUserMenu, setShowUserMenu] = useState(false);
  const menuRef = useRef(null);
  const { theme, toggle } = useTheme();
  const { user, logout } = useAuth();
  const location = useLocation();

  useEffect(() => {
    const handleClick = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setShowUserMenu(false);
      }
    };
    document.addEventListener('mousedown', handleClick);
    return () => document.removeEventListener('mousedown', handleClick);
  }, []);

  const isAuthPage = ['/login', '/register', '/forgot-password', '/reset-password', '/role-selection'].includes(location.pathname);

  const logoColor = '#0F172A';
  const isDark = theme === 'dark';

  return (
    <header className="header glass-header">
      <div className="header-inner">
        <div className="header-left">
          <Link to="/" className="header-logo">
            <span className="logo-icon" style={{
              fontSize: '1.6rem',
              display: 'inline-flex',
              alignItems: 'center',
              justifyContent: 'center',
              width: 36,
              height: 36,
              borderRadius: 10,
              background: 'linear-gradient(135deg, #E53935, #C62828)',
              boxShadow: '0 2px 12px rgba(229,57,53,0.35)',
            }}>
              🩸
            </span>
            <span className="logo-text" style={{ color: isDark ? '#E2E8F0' : '#0F172A' }}>
              BLOOD<span className="logo-accent">CONNECT</span>
            </span>
          </Link>
        </div>

        <div className="header-center">
          <div className="header-search">
            <span className="search-icon"><SearchSvg /></span>
            <input type="text" placeholder="Search camps, donors, requests..." className="search-input" />
          </div>
        </div>

        <div className="header-right">
          {/* Theme Toggle */}
          <button
            className="theme-toggle-btn"
            onClick={toggle}
            title={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
            aria-label="Toggle color theme"
          >
            {isDark ? <SunSvg /> : <MoonSvg />}
          </button>

          {/* Conditionally show notifications based on role */}
          {user && ['Super Admin', 'Hospital Admin', 'Volunteer', 'Donor'].includes(user.role) && (
            <NavLink to="/notifications" className="header-icon-btn" title="Notifications">
              <BellSvg />
              <span className="notification-dot"></span>
            </NavLink>
          )}

          <div className="user-menu-wrapper" ref={menuRef}>
            {!isAuthPage && user && (
              <>
                <button className="user-avatar-btn" onClick={() => setShowUserMenu(!showUserMenu)}>
                  <div className="user-avatar" style={{ background: 'linear-gradient(135deg, #E53935, #C62828)' }}>
                    {user.name ? user.name.charAt(0).toUpperCase() : 'U'}
                  </div>
                  <ChevronSvg />
                </button>
                {showUserMenu && (
                  <div className="user-dropdown glass-dropdown">
                    <div className="dropdown-header">
                      <div className="dropdown-avatar" style={{ background: 'linear-gradient(135deg, #E53935, #C62828)' }}>
                        {user.name ? user.name.charAt(0).toUpperCase() : 'U'}
                      </div>
                      <div>
                        <div className="dropdown-user-name">{user.name || 'User'}</div>
                        <div className="dropdown-user-role">{user.role || 'User'}</div>
                      </div>
                    </div>
                    <div className="dropdown-divider"></div>
                    {user.role === 'Super Admin' || user.role === 'Hospital Admin' ? (
                      <>
                        <Link to="/dashboard" className="dropdown-item" onClick={() => setShowUserMenu(false)}>
                          <DashboardSvg /> Dashboard
                        </Link>
                        <div className="dropdown-divider"></div>
                      </>
                    ) : null}
                    <Link to="/profile" className="dropdown-item" onClick={() => setShowUserMenu(false)}>
                      <UserSvg /> Profile
                    </Link>
                    <Link to="/settings" className="dropdown-item" onClick={() => setShowUserMenu(false)}>
                      <SettingsSvg /> Settings
                    </Link>
                    {user.role === 'Super Admin' ? (
                      <>
                        <div className="dropdown-divider"></div>
                        <Link to="/audit-logs" className="dropdown-item" onClick={() => setShowUserMenu(false)}>
                          <ShieldSvg /> Audit Logs
                        </Link>
                      </>
                    ) : null}
                    <div className="dropdown-divider"></div>
                    <button className="dropdown-item text-danger" onClick={(e) => {
                      e.preventDefault();
                      logout();
                      setShowUserMenu(false);
                    }}>
                      <LogoutSvg /> Logout
                    </button>
                  </div>
                )}
              </>
            )}
            {isAuthPage && (
              <button className="theme-toggle-btn"
                onClick={toggle}
                title={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
                aria-label="Toggle color theme"
              >
                {isDark ? <SunSvg /> : <MoonSvg />}
              </button>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;