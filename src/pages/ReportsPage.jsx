import { useState, useEffect } from 'react';
import { Card, Badge, Button, Spinner, Alert, Table } from 'react-bootstrap';
import { motion } from 'framer-motion';
import { BarChart, Bar, LineChart, Line, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, AreaChart, Area } from 'recharts';

const mockData = {
  campsByMonth: [
    { month: 'Jan', camps: 4, donations: 120 }, { month: 'Feb', camps: 6, donations: 180 },
    { month: 'Mar', camps: 5, donations: 150 }, { month: 'Apr', camps: 8, donations: 240 },
    { month: 'May', camps: 7, donations: 210 }, { month: 'Jun', camps: 9, donations: 270 },
    { month: 'Jul', camps: 5, donations: 160 }, { month: 'Aug', camps: -1, donations: -1 },
    { month: 'Sep', camps: -1, donations: -1 }, { month: 'Oct', camps: -1, donations: -1 },
    { month: 'Nov', camps: -1, donations: -1 }, { month: 'Dec', camps: -1, donations: -1 },
  ].map(d => d.donations >= 0 ? d : { ...d, camps: '—', donations: '—' }),
  bloodGroupData: [
    { group: 'A+', count: 280, percentage: 22.4, compatibility: 'A+, AB+' },
    { group: 'A-', count: 55, percentage: 4.4, compatibility: 'A-, A+, AB-, AB+' },
    { group: 'B+', count: 220, percentage: 17.6, compatibility: 'B+, AB+' },
    { group: 'B-', count: 45, percentage: 3.6, compatibility: 'B-, B+, AB-, AB+' },
    { group: 'AB+', count: 75, percentage: 6.0, compatibility: 'AB+' },
    { group: 'AB-', count: 20, percentage: 1.6, compatibility: 'AB-, AB+' },
    { group: 'O+', count: 420, percentage: 33.6, compatibility: 'O+, A+, B+, AB+' },
    { group: 'O-', count: 130, percentage: 10.4, compatibility: 'All Blood Types' },
  ],
  donorGrowth: [
    { month: 'Jan', donors: 450 }, { month: 'Feb', donors: 520 }, { month: 'Mar', donors: 610 },
    { month: 'Apr', donors: 580 }, { month: 'May', donors: 690 }, { month: 'Jun', donors: 750 },
    { month: 'Jul', donors: 820 },
  ],
  emergencyData: [
    { month: 'Jan', requests: 8, fulfilled: 6 }, { month: 'Feb', requests: 12, fulfilled: 10 },
    { month: 'Mar', requests: 6, fulfilled: 5 }, { month: 'Apr', requests: 15, fulfilled: 12 },
    { month: 'May', requests: 10, fulfilled: 9 }, { month: 'Jun', requests: 14, fulfilled: 13 },
    { month: 'Jul', requests: 7, fulfilled: 6 },
  ],
  volunteerHours: [
    { role: 'Coordinator', hours: 320 }, { role: 'Assistant', hours: 580 },
    { role: 'Specialist', hours: 410 }, { role: 'Crew', hours: 250 },
    { role: 'Monitor', hours: 190 }, { role: 'Desk', hours: 280 },
  ],
  ageDistribution: [
    { age: '18-25', count: 210 }, { age: '26-35', count: 340 },
    { age: '36-45', count: 280 }, { age: '46-55', count: 150 },
    { age: '55+', count: 80 },
  ],
};

const COLORS = ['#E53935', '#FF8A65', '#FFB74D', '#FFF176', '#AED581', '#81C784', '#64B5F6', '#9575CD'];
const PIE_COLORS = ['#E53935', '#C62828', '#FF8A65', '#FFB74D', '#4CAF50', '#2196F3', '#9C27B0', '#607D8B'];

const fetchReports = () => new Promise(res => setTimeout(() => res({ success: true, data: mockData }), 700));

const tabs = ['Camp Summary', 'Donor Report', 'Blood Group', 'Emergency Report', 'Volunteer Report', 'Monthly Donation'];

export default function ReportsPage() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeTab, setActiveTab] = useState('Camp Summary');

  useEffect(() => {
    fetchReports().then(r => {
      if (r.success) setData(r.data);
      else setError('Failed to load');
    }).catch(() => setError('Failed to load')).finally(() => setLoading(false));
  }, []);

  if (loading) return <div className="page-wrapper text-center py-5"><Spinner animation="border" variant="danger" /></div>;
  if (error) return <div className="page-wrapper"><Alert variant="danger">{error} <Button size="sm" variant="outline-danger" onClick={() => window.location.reload()}>Retry</Button></Alert></div>;
  if (!data) return null;

  const downloadCSV = () => { alert('Download started (mock)'); };
  const printReport = () => { window.print(); };
  const ActionButtons = () => (
    <div className="d-flex gap-2">
      <Button size="sm" variant="outline-danger" onClick={downloadCSV}>📥 Download CSV</Button>
      <Button size="sm" variant="outline-secondary" onClick={printReport}>🖨️ Print</Button>
    </div>
  );

  const renderTab = () => {
    switch (activeTab) {
      case 'Camp Summary':
        return (
          <>
            <div className="row g-3 mb-4">
              {[{ label: 'Total Camps', value: 30, c: '#E53935' }, { label: 'Active', value: 5, c: '#4CAF50' }, { label: 'Completed', value: 18, c: '#2196F3' }, { label: 'Cancelled', value: 3, c: '#9E9E9E' }, { label: 'Pending', value: 4, c: '#FF9800' }].map((s, i) => (
                <div key={i} className="col"><Card className="border-0 shadow-sm text-center p-3"><div className="fw-bold" style={{ fontSize: 24, color: s.c }}>{s.value}</div><small className="text-muted">{s.label}</small></Card></div>
              ))}
            </div>
            <Card className="border-0 shadow-sm p-3 mb-4" style={{ borderRadius: 14 }}>
              <h6 className="fw-semibold mb-3">Camps by Month</h6>
              <ResponsiveContainer width="100%" height={300}><BarChart data={data.campsByMonth.filter(d => d.camps !== '—')}><CartesianGrid strokeDasharray="3 3" /><XAxis dataKey="month" /><YAxis /><Tooltip /><Bar dataKey="camps" fill="#E53935" radius={[6, 6, 0, 0]} /></BarChart></ResponsiveContainer>
            </Card>
          </>
        );
      case 'Donor Report':
        return (
          <>
            <div className="row g-3 mb-4">
              {[{ label: 'Total Donors', value: 1250, c: '#E53935' }, { label: 'Active', value: 890, c: '#4CAF50' }, { label: 'New This Month', value: 72, c: '#FF9800' }, { label: 'Eligible', value: 735, c: '#2196F3' }].map((s, i) => (
                <div key={i} className="col"><Card className="border-0 shadow-sm text-center p-3"><div className="fw-bold" style={{ fontSize: 24, color: s.c }}>{s.value}</div><small className="text-muted">{s.label}</small></Card></div>
              ))}
            </div>
            <div className="row g-4 mb-4">
              <div className="col-md-8"><Card className="border-0 shadow-sm p-3" style={{ borderRadius: 14 }}><h6 className="fw-semibold mb-3">Donor Growth</h6><ResponsiveContainer width="100%" height={300}><AreaChart data={data.donorGrowth}><CartesianGrid strokeDasharray="3 3" /><XAxis dataKey="month" /><YAxis /><Tooltip /><Area type="monotone" dataKey="donors" stroke="#E53935" fill="#FFEBEE" /></AreaChart></ResponsiveContainer></Card></div>
              <div className="col-md-4"><Card className="border-0 shadow-sm p-3" style={{ borderRadius: 14 }}><h6 className="fw-semibold mb-3">Age Distribution</h6><ResponsiveContainer width="100%" height={300}><PieChart><Pie data={data.ageDistribution} dataKey="count" nameKey="age" cx="50%" cy="50%" outerRadius={90} label>{data.ageDistribution.map((_, i) => <Cell key={i} fill={PIE_COLORS[i]} />)}</Pie><Tooltip /></PieChart></ResponsiveContainer></Card></div>
            </div>
          </>
        );
      case 'Blood Group':
        return (
          <>
            <div className="row g-4 mb-4">
              <div className="col-md-5"><Card className="border-0 shadow-sm p-3" style={{ borderRadius: 14 }}><h6 className="fw-semibold mb-3">Blood Group Distribution</h6><ResponsiveContainer width="100%" height={350}><PieChart><Pie data={data.bloodGroupData} dataKey="count" nameKey="group" cx="50%" cy="50%" outerRadius={120} label={({ group, percentage }) => `${group} (${percentage}%)`}>{data.bloodGroupData.map((_, i) => <Cell key={i} fill={PIE_COLORS[i]} />)}</Pie><Tooltip /></PieChart></ResponsiveContainer></Card></div>
              <div className="col-md-7"><Card className="border-0 shadow-sm p-3" style={{ borderRadius: 14 }}><h6 className="fw-semibold mb-3">Blood Group Details</h6><Table hover size="sm"><thead><tr><th>Group</th><th>Count</th><th>%</th><th>Compatible With</th></tr></thead><tbody>{data.bloodGroupData.map((b, i) => <tr key={i}><td className="fw-bold" style={{ color: PIE_COLORS[i] }}>{b.group}</td><td>{b.count}</td><td>{b.percentage}%</td><td><small>{b.compatibility}</small></td></tr>)}</tbody></Table></Card></div>
            </div>
          </>
        );
      case 'Emergency Report':
        return (
          <>
            <div className="row g-3 mb-4">
              {[{ label: 'Total Requests', value: 72, c: '#E53935' }, { label: 'Fulfilled', value: 61, c: '#4CAF50' }, { label: 'Pending', value: 8, c: '#FF9800' }, { label: 'Cancelled', value: 3, c: '#9E9E9E' }].map((s, i) => (
                <div key={i} className="col"><Card className="border-0 shadow-sm text-center p-3"><div className="fw-bold" style={{ fontSize: 24, color: s.c }}>{s.value}</div><small className="text-muted">{s.label}</small></Card></div>
              ))}
            </div>
            <Card className="border-0 shadow-sm p-3" style={{ borderRadius: 14 }}><h6 className="fw-semibold mb-3">Emergency Requests by Month</h6><ResponsiveContainer width="100%" height={300}><BarChart data={data.emergencyData}><CartesianGrid strokeDasharray="3 3" /><XAxis dataKey="month" /><YAxis /><Tooltip /><Legend /><Bar dataKey="requests" fill="#E53935" radius={[6, 6, 0, 0]} name="Requests" /><Bar dataKey="fulfilled" fill="#4CAF50" radius={[6, 6, 0, 0]} name="Fulfilled" /></BarChart></ResponsiveContainer></Card>
          </>
        );
      case 'Volunteer Report':
        return (
          <>
            <div className="row g-3 mb-4">
              {[{ label: 'Total Volunteers', value: 25, c: '#E53935' }, { label: 'Active', value: 21, c: '#4CAF50' }, { label: 'Available', value: 8, c: '#FF9800' }, { label: 'Total Hours', value: '2,280', c: '#2196F3' }].map((s, i) => (
                <div key={i} className="col"><Card className="border-0 shadow-sm text-center p-3"><div className="fw-bold" style={{ fontSize: 24, color: s.c }}>{s.value}</div><small className="text-muted">{s.label}</small></Card></div>
              ))}
            </div>
            <Card className="border-0 shadow-sm p-3" style={{ borderRadius: 14 }}><h6 className="fw-semibold mb-3">Volunteer Hours by Role</h6><ResponsiveContainer width="100%" height={300}><BarChart data={data.volunteerHours} layout="vertical"><CartesianGrid strokeDasharray="3 3" /><XAxis type="number" /><YAxis dataKey="role" type="category" /><Tooltip /><Bar dataKey="hours" fill="#E53935" radius={[0, 6, 6, 0]} /></BarChart></ResponsiveContainer></Card>
          </>
        );
      case 'Monthly Donation':
        return (
          <>
            <div className="row g-3 mb-4">
              {[{ label: 'Total Donations', value: '1,330', c: '#E53935' }, { label: 'Avg/Camp', value: '~190', c: '#4CAF50' }, { label: 'Best Month', value: 'Jun (270)', c: '#FF9800' }, { label: 'Total Camps', value: 44, c: '#2196F3' }].map((s, i) => (
                <div key={i} className="col"><Card className="border-0 shadow-sm text-center p-3"><div className="fw-bold" style={{ fontSize: 24, color: s.c }}>{s.value}</div><small className="text-muted">{s.label}</small></Card></div>
              ))}
            </div>
            <Card className="border-0 shadow-sm p-3 mb-4" style={{ borderRadius: 14 }}><h6 className="fw-semibold mb-3">Donation Trend (6 Months)</h6><ResponsiveContainer width="100%" height={300}><LineChart data={data.campsByMonth.filter(d => d.donations !== '—')}><CartesianGrid strokeDasharray="3 3" /><XAxis dataKey="month" /><YAxis /><Tooltip /><Legend /><Line type="monotone" dataKey="donations" stroke="#E53935" strokeWidth={2} dot={{ fill: '#E53935', r: 5 }} name="Donations" /></LineChart></ResponsiveContainer></Card>
          </>
        );
      default: return null;
    }
  };

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="page-wrapper">
      <div className="d-flex justify-content-between align-items-center mb-4 flex-wrap gap-2">
        <div>
          <h1 className="page-title">Reports & Analytics</h1>
          <p className="page-subtitle">Comprehensive insights and data analysis</p>
        </div>
        <ActionButtons />
      </div>

      <div className="d-flex gap-2 mb-4 flex-wrap">
        {tabs.map(t => (
          <button key={t} onClick={() => setActiveTab(t)}
            className={`btn btn-sm ${activeTab === t ? 'btn-danger' : 'btn-outline-secondary'} rounded-pill`}
            style={{ fontWeight: activeTab === t ? 600 : 400 }}>{t}</button>
        ))}
      </div>

      <motion.div key={activeTab} initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.2 }}>
        {renderTab()}
      </motion.div>
    </motion.div>
  );
}