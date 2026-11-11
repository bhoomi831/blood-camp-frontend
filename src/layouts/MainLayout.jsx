import React from 'react';
import Header from './Header';
import Sidebar from './Sidebar';
import Footer from './Footer';
import { useTheme } from '../context/ThemeContext';
import './MainLayout.css';

const MainLayout = ({ children }) => {
  const { isDark } = useTheme();

  return (
    <div className="main-layout" style={{
      background: isDark ? 'var(--bg-body)' : '#F8FAFC',
      transition: 'background 0.35s ease',
    }}>
      <Header />
      <div className="layout-content">
        <Sidebar />
        <main className="main-content">{children}</main>
      </div>
      <Footer />
    </div>
  );
};

export default MainLayout;