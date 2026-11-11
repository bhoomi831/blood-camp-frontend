import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Row, Col, Card, Spinner, Alert, Badge } from 'react-bootstrap';
import { dashboardService } from '../services/dashboardService';
import { useTheme } from '../context/ThemeContext';
import { AreaChart, Area, PieChart, Pie, Cell, ResponsiveContainer, XAxis, YAxis, CartesianGrid, Tooltip } from 'recharts';

const container = { hidden: {}, show: { transition: { staggerChildren: 0.07 } } };
const fadeUp = { hidden: { opacity: 0, y: 24 }, show: { opacity: 1, y: 0, transition: { duration: 0.45, ease: [0.22, 1, 0.36, 1] } } };
const popIn = { hidden: { opacity: 0, scale: 0.92 }, show: { opacity: 1, scale: 1, transition: { duration: 0.35, ease: [0.34, 1.56, 0.64, 1] } } };

const REDS = ['#E53935', '#EF5350', '#F48FB1', '#C62828', '#FF8A80', '#D32F2F', '#E57373', '#B71C1C'];
const COLORS = ['#E53935', '#FF8A65', '#FFB74D', '#FFF176', '#AED581', '#81C784', '#64B5F6', '#9575CD'];
const statusColors = { planned: '#F59E0B', active: '#10B981', completed: '#3B82F6', cancelled: '#EF4444' };

/* Micro animated blob background */
const BlobRed = () => (
  <svg width="0" height="0" style={{ position: 'absolute' }}>
    <defs>
      <linearGradient id="areaGrad" x1="0" y1="0" x2="0" y2="1">
        <stop offset="5%" stopColor="#E53935" stopOpacity={0.25} />
        <stop offset="95%" stopColor="#E53935" stopOpacity={0} />
      </linearGradient>
    </defs>
  </svg>
);

export default function DashboardPage() {
  const { isDark } = useTheme();
  const [stats, setStats] = useState(null);
  const [bloodGroupData, setBloodGroupData] = useState(null);
  const [donationTrends, setDonationTrends] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const [statsRes, bgRes, trendsRes, notifRes] = await Promise.all([
          dashboardService.getDashboardStats(),
          dashboardService.getBloodGroupDistribution(),
          dashboardService.getDonationTrends(),
          dashboardService.getNotifications ? dashboardService.getNotifications() : Promise.resolve({ success: true, data: [] }),
        ]);
        if (statsRes.success) setStats(statsRes.data);
        if (bgRes.success) setBloodGroupData(bgRes.data);
        if (trendsRes.success) setDonationTrends(trendsRes.data);
        if (notifRes.success) setNotifications(notifRes.data || []);
      } catch {
        setError('Failed to load dashboard data');
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  if (loading) {
    return (
      <div className="page-wrapper d-flex align-items-center justify-content-center" style={{ minHeight: '60vh' }}>
        <div className="text-center">
          <motion.div animate={{ rotate: 360 }} transition={{ repeat: Infinity, duration: 1.5, ease: 'linear' }}>
            <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="#E53935" strokeWidth="2" strokeLinecap="round">
              <path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83"/>
            </svg>
          </motion.div>
          <p style={{ color: 'var(--text-secondary)', marginTop: 12, fontSize: '0.9rem' }}>Loading dashboard...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="page-wrapper">
        <Alert variant="danger">{error} <button className="btn btn-sm btn-outline-danger ms-2" onClick={() => window.location.reload()}>Retry</button></Alert>
      </div>
    );
  }

  const statCards = [
    { label: 'Total Camps', value: stats?.totalCamps ?? 0, icon: '🏕️', color: '#E53935', gradient: 'linear-gradient(135deg, #E53935, #C62828)' },
    { label: 'Total Donors', value: stats?.totalDonors ?? 0, icon: '🩸', color: '#10B981', gradient: 'linear-gradient(135deg, #10B981, #059669)' },
    { label: 'Blood Units', value: stats?.bloodUnitsAvailable ?? '--', icon: '💉', color: '#3B82F6', gradient: 'linear-gradient(135deg, #3B82F6, #2563EB)' },
    { label: 'Volunteers', value: stats?.totalVolunteers ?? 0, icon: '👥', color: '#F59E0B', gradient: 'linear-gradient(135deg, #F59E0B, #D97706)' },
    { label: 'Emergency Req.', value: stats?.emergencyRequests ?? 0, icon: '🚨', color: '#EF4444', gradient: 'linear-gradient(135deg, #EF4444, #DC2626)' },
  ];

  const textColor = isDark ? '#E2E8F0' : '#0F172A';
  const mutedText = isDark ? '#94A3B8' : '#64748B';
  const borderColor = isDark ? '#334155' : '#F1F5F9';
  const gridColor = isDark ? '#334155' : '#f0f0f0';
  const tooltipBg = isDark ? 'rgba(30,41,59,0.95)' : '#fff';
  const tooltipBorder = isDark ? '#475569' : '#E5E7EB';

  return (
    <motion.div variants={container} initial="hidden" animate="show" className="page-wrapper">
      <BlobRed />

      {/* Page header */}
      <motion.div variants={fadeUp} className="d-flex justify-content-between align-items-center mb-4 flex-wrap gap-2">
        <div>
          <h1 className="page-title" style={{ color: textColor }}>Dashboard</h1>
          <p className="page-subtitle">Overview of your blood donation camp management system</p>
        </div>
        <div>
          <span style={{
            background: 'var(--glass-bg)',
            backdropFilter: 'blur(10px)',
            WebkitBackdropFilter: 'blur(10px)',
            border: '1px solid var(--glass-border)',
            borderRadius: 12,
            padding: '8px 16px',
            fontSize: '0.82rem',
            color: mutedText,
            display: 'flex',
            alignItems: 'center',
            gap: 6,
          }}>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <rect x="3" y="4" width="18" height="18" rx="2" ry="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/>
            </svg>
            {new Date().toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric' })}
          </span>
        </div>
      </motion.div>

      {/* Stats Row — each card has its own accent */}
      <motion.div variants={fadeUp} className="row g-3 mb-4">
        {statCards.map((s, i) => (
          <div key={i} className="col-lg col-md-4 col-6">
            <motion.div
              variants={popIn}
              whileHover={{ y: -4, transition: { duration: 0.2 } }}
              className="glass-card p-3 h-100 d-flex align-items-center gap-3 position-relative"
              style={{ overflow: 'hidden' }}
            >
              {/* subtle top accent stripe */}
              <div style={{
                position: 'absolute', top: 0, left: 0, right: 0, height: 3,
                background: s.gradient, borderTopLeftRadius: 16, borderTopRightRadius: 16, opacity: 0.5,
              }} />
              <div className="d-flex align-items-center justify-content-center shrink-0 position-relative"
                style={{ width: 48, height: 48, borderRadius: 14, background: s.color + '15', fontSize: 23, zIndex: 1 }}>
                {s.icon}
              </div>
              <div style={{ zIndex: 1 }}>
                <div style={{ fontSize: '0.73rem', color: mutedText, fontWeight: 500, textTransform: 'uppercase', letterSpacing: '0.06em' }}>{s.label}</div>
                <div style={{ fontSize: 'clamp(1.3rem, 2vw, 1.8rem)', fontWeight: 700, color: textColor, lineHeight: 1.2 }}>{s.value}</div>
              </div>
            </motion.div>
          </div>
        ))}
      </motion.div>

      {/* Charts Row */}
      <Row className="g-4 mb-4">
        <Col lg={8}>
          <motion.div variants={fadeUp}>
            <div className="glass-card p-4">
              <div className="d-flex justify-content-between align-items-center mb-3">
                <h5 className="fw-semibold mb-0" style={{ color: textColor }}>📈 Donation Trends</h5>
                <span style={{ fontSize: '0.72rem', color: mutedText }}>Last 6 months</span>
              </div>
              {donationTrends && donationTrends.length > 0 ? (
                <ResponsiveContainer width="100%" height={280}>
                  <AreaChart data={donationTrends}>
                    <defs>
                      <linearGradient id="areaGradChart" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#E53935" stopOpacity={0.28} />
                        <stop offset="95%" stopColor="#E53935" stopOpacity={0} />
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" stroke={gridColor} />
                    <XAxis dataKey="month" tick={{ fontSize: 12, fill: mutedText }} axisLine={{ stroke: gridColor }} tickLine={false} />
                    <YAxis tick={{ fontSize: 12, fill: mutedText }} axisLine={false} tickLine={false} />
                    <Tooltip
                      contentStyle={{
                        borderRadius: 14, border: `1px solid ${tooltipBorder}`, background: tooltipBg,
                        boxShadow: '0 12px 40px rgba(0,0,0,0.12)', fontSize: '0.85rem', color: textColor
                      }}
                    />
                    <Area type="monotone" dataKey="donations" stroke="#E53935" strokeWidth={2.5} fillOpacity={1} fill="url(#areaGradChart)" dot={{ fill: '#E53935', r: 4 }} activeDot={{ r: 6, strokeWidth: 2, stroke: '#fff' }} />
                  </AreaChart>
                </ResponsiveContainer>
              ) : (
                <div className="text-center py-5" style={{ color: mutedText }}>No donation trend data available</div>
              )}
            </div>
          </motion.div>
        </Col>
        <Col lg={4}>
          <motion.div variants={fadeUp}>
            <div className="glass-card p-4 h-100">
              <h5 className="fw-semibold mb-3" style={{ color: textColor }}>🩸 Blood Groups</h5>
              {bloodGroupData && Object.keys(bloodGroupData).length > 0 ? (
                <div className="d-flex flex-column align-items-center">
                  <ResponsiveContainer width="100%" height={200}>
                    <PieChart>
                      <Pie
                        data={Object.entries(bloodGroupData).map(([name, count]) => ({ name, count }))}
                        cx="50%" cy="50%" innerRadius={50} outerRadius={80} paddingAngle={3}
                        dataKey="count"
                      >
                        {Object.keys(bloodGroupData).map((_, i) => (
                          <Cell key={i} fill={COLORS[i % COLORS.length]} stroke="transparent" />
                        ))}
                      </Pie>
                      <Tooltip
                        contentStyle={{
                          borderRadius: 12, border: 'none', background: tooltipBg,
                          boxShadow: '0 8px 30px rgba(0,0,0,0.15)', fontSize: '0.85rem',
                          color: textColor,
                        }}
                      />
                    </PieChart>
                  </ResponsiveContainer>
                  <div className="d-flex flex-wrap justify-content-center gap-2 mt-2">
                    {Object.entries(bloodGroupData).map(([name, count], i) => (
                      <span
                        key={name}
                        className="badge px-3 py-2"
                        style={{
                          background: COLORS[i % COLORS.length] + '18',
                          color: COLORS[i % COLORS.length],
                          fontWeight: 600,
                          fontSize: '0.75rem',
                          borderRadius: 8,
                        }}
                      >
                        {name}: {count}
                      </span>
                    ))}
                  </div>
                </div>
              ) : (
                <div className="text-center py-5" style={{ color: mutedText }}>No blood group data</div>
              )}
            </div>
          </motion.div>
        </Col>
      </Row>

      {/* Bottom row */}
      <Row className="g-4">
        <Col md={6} lg={4}>
          <motion.div variants={fadeUp}>
            <div className="glass-card p-4 h-100">
              <div className="d-flex justify-content-between align-items-center mb-3">
                <h5 className="fw-semibold mb-0" style={{ color: textColor }}>🔔 Recent Notifications</h5>
                <Badge bg="danger" className="rounded-pill">{notifications.length}</Badge>
              </div>
              {notifications.length > 0 ? (
                <div style={{ maxHeight: 280, overflowY: 'auto' }}>
                  {notifications.slice(0, 5).map((n, i) => (
                    <motion.div
                      key={n.id || i}
                      initial={{ opacity: 0, x: -12 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.08 }}
                      className="d-flex align-items-start gap-3 py-2"
                      style={{ borderBottom: `1px solid ${borderColor}` }}
                    >
                      <span style={{ fontSize: 18 }}>{n.icon || '🔔'}</span>
                      <div className="grow min-w-0">
                        <div style={{ fontSize: '0.85rem', fontWeight: 500, color: textColor, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                          {n.title || n.message}
                        </div>
                        <div style={{ fontSize: '0.75rem', color: mutedText }}>{n.time || n.createdAt || ''}</div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-4" style={{ fontSize: '0.9rem', color: mutedText }}>No new notifications</div>
              )}
            </div>
          </motion.div>
        </Col>
        <Col md={6} lg={4}>
          <motion.div variants={fadeUp}>
            <div className="glass-card p-4 h-100">
              <div className="d-flex justify-content-between align-items-center mb-3">
                <h5 className="fw-semibold mb-0" style={{ color: textColor }}>⛺ Upcoming Camps</h5>
                <Badge pill style={{ background: '#E5393518', color: '#E53935', fontSize: '0.7rem' }}>
                  {stats?.totalCamps || 0} total
                </Badge>
              </div>
              {stats?.upcomingCamps && stats.upcomingCamps.length > 0 ? (
                <div>
                  {stats.upcomingCamps.slice(0, 4).map((camp, i) => (
                    <motion.div
                      key={camp.id || i}
                      whileHover={{ x: 4 }}
                      className="d-flex justify-content-between align-items-center py-2"
                      style={{ borderBottom: `1px solid ${borderColor}` }}
                    >
                      <div>
                        <div style={{ fontSize: '0.85rem', fontWeight: 500, color: textColor }}>{camp.name || `Camp #${i + 1}`}</div>
                        <div style={{ fontSize: '0.75rem', color: mutedText }}>{camp.date || camp.startDate || ''}</div>
                      </div>
                      <span className="badge rounded-pill" style={{
                        background: statusColors[camp.status] + '18',
                        color: statusColors[camp.status] || mutedText,
                        fontWeight: 500, fontSize: '0.7rem',
                      }}>
                        {camp.status || 'planned'}
                      </span>
                    </motion.div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-4" style={{ fontSize: '0.9rem', color: mutedText }}>No upcoming camps</div>
              )}
            </div>
          </motion.div>
        </Col>
        <Col md={12} lg={4}>
          <motion.div variants={fadeUp}>
            <div className="glass-card p-4 h-100">
              <h5 className="fw-semibold mb-3" style={{ color: textColor }}>⚡ Quick Actions</h5>
              <div className="d-flex flex-column gap-2">
                {[
                  { label: 'Create New Camp', icon: '🏕️', href: '/camps/create', color: '#E53935' },
                  { label: 'Register Donor', icon: '🩸', href: '/donors/register', color: '#10B981' },
                  { label: 'Emergency Request', icon: '🚨', href: '/emergency-requests/create', color: '#EF4444' },
                  { label: 'View Reports', icon: '📊', href: '/reports', color: '#3B82F6' },
                ].map((a, i) => (
                  <motion.a
                    key={i}
                    href={a.href}
                    whileHover={{ scale: 1.02, x: 4 }}
                    whileTap={{ scale: 0.98 }}
                    className="d-flex align-items-center gap-3 px-3 py-2.5 rounded-3 text-decoration-none"
                    style={{
                      background: a.color + (isDark ? '15' : '08'),
                      color: isDark ? '#E2E8F0' : '#334155',
                      transition: 'background 0.2s ease, color 0.2s ease',
                      fontSize: '0.9rem',
                      fontWeight: 500,
                      borderLeft: '3px solid ' + a.color,
                    }}
                    onMouseEnter={e => { e.currentTarget.style.background = a.color + (isDark ? '25' : '15'); }}
                    onMouseLeave={e => { e.currentTarget.style.background = a.color + (isDark ? '15' : '08'); }}
                  >
                    <span style={{ fontSize: 20 }}>{a.icon}</span>
                    <span>{a.label}</span>
                    <span style={{ marginLeft: 'auto', opacity: 0.5 }}>→</span>
                  </motion.a>
                ))}
              </div>
            </div>
          </motion.div>
        </Col>
      </Row>
    </motion.div>
  );
}