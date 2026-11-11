// src/components/ui/dashboard/DonorDemographicsChart.jsx
import React, { useEffect, useState } from 'react';
import BarChart from '../../../components/ui/chart/BarChart';
import donorService from '../../../services/donorService';

const DonorDemographicsChart = () => {
  const [chartData, setChartData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchDonorDemographics = async () => {
      try {
        setLoading(true);
        const response = await donorService.getDonorStatistics();
        if (response.success) {
          const ageGroups = response.data.ageGroups || {};
          const labels = Object.keys(ageGroups);
          const data = Object.values(ageGroups);

          setChartData({
            labels: labels,
            datasets: [{
              label: 'Donors by Age Group',
              data: data,
              backgroundColor: [
                '#E53935', '#FF8A65', '#FFB74D', '#FFF176',
                '#AED581', '#81C784', '#64B5F6', '#9575CD'
              ],
              borderColor: [
                '#C62828', '#EF6C00', '#F57C00', '#FBC02D',
                '827717', '#33691E', '#1565C0', '#6A1B9A'
              ],
              borderWidth: 1
            }]
          });
        } else {
          setError('Failed to load donor demographics');
        }
      } catch (err) {
        setError('An error occurred while loading donor demographics');
      } finally {
        setLoading(false);
      }
    };

    fetchDonorDemographics();
  }, []);

  if (loading) {
    return (
      <div className="donor-demographics-chart">
        <div className="chart-placeholder">
          <div className="text-center py-4">
            <div className="avatar-chart-placeholder">
              <div className="avatar-chart-bar" style={{ width: '60%', height: '20px' }}></div>
              <div className="avatar-chart-bar" style={{ width: '40%', height: '20px' }}></div>
              <div className="avatar-chart-bar" style={{ width: '50%', height: '20px' }}></div>
              <div className="avatar-chart-bar" style={{ width: '70%', height: '20px' }}></div>
              <div className="avatar-chart-bar" style={{ width: '30%', height: '20px' }}></div>
              <div className="avatar-chart-bar" style={{ width: '80%', height: '20px' }}></div>
            </div>
            <p className="mt-2 text-muted mb-0">Loading demographic data...</p>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="donor-demographics-chart">
        <div className="alert alert-danger">{error}</div>
      </div>
    );
  }

  return (
    <div className="donor-demographics-chart">
      <div className="chart-header">
        <h3 className="h5 mb-0">Donor Age Distribution</h3>
        <p className="text-muted mb-0">Distribution of donors by age groups</p>
      </div>
      <div className="chart-container">
        <BarChart data={chartData} height={300} />
      </div>
    </div>
  );
};

export default DonorDemographicsChart;