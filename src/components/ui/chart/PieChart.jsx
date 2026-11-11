// src/components/ui/chart/PieChart.jsx
import React, { useEffect, useRef } from 'react';
import './PieChart.css';

const PieChart = ({ data, options = {}, height = 300 }) => {
  const chartRef = useRef(null);

  useEffect(() => {
    const ctx = chartRef.current.getContext('2d');
    ctx.clearRect(0, 0, chartRef.current.width, chartRef.current.height);

    // Set dimensions
    chartRef.current.width = chartRef.current.parentElement.clientWidth;
    chartRef.current.height = height;

    if (data && data.labels && data.datasets && data.datasets.length > 0) {
      const ctx = chartRef.current.getContext('2d');
      ctx.clearRect(0, 0, chartRef.current.width, chartRef.current.height);

      // Background
      ctx.fillStyle = '#f8f9fa';
      ctx.fillRect(0, 0, chartRef.current.width, chartRef.current.height);

      // Center point
      const centerX = chartRef.current.width / 2;
      const centerY = chartRef.current.height / 2;
      const radius = Math.min(centerX, centerY) * 0.8;

      // Data
      const dataset = data.datasets[0];
      const values = dataset.data || [];
      const labels = data.labels || [];
      const total = values.reduce((sum, val) => sum + val, 0);

      if (total > 0 && values.length > 0) {
        let startAngle = 0;
        const colors = dataset.backgroundColor || [
          '#E53935', '#FF8A65', '#FFB74D', '#FFF176',
          '#AED581', '#81C784', '#64B5F6', '#9575CD'
        ];

        values.forEach((value, index) => {
          const sliceAngle = (value / total) * 2 * Math.PI;
          const endAngle = startAngle + sliceAngle;

          ctx.beginPath();
          ctx.moveTo(centerX, centerY);
          ctx.arc(centerX, centerY, radius, startAngle, endAngle);
          ctx.closePath();

          ctx.fillStyle = colors[index % colors.length] || '#E53935';
          ctx.fill();

          // Draw label (optional, for simplicity we skip in this placeholder)
          startAngle = endAngle;
        });

        // Draw center circle for donut effect (if we were making donut, but for pie we don't)
        // For pie, we don't draw a center circle.
      }
    } else {
      // Draw empty state
      ctx.fillStyle = '#f8f9fa';
      ctx.fillRect(0, 0, chartRef.current.width, chartRef.current.height);
      ctx.textAlign = 'center';
      ctx.fillStyle = '#6c757d';
      ctx.font = '14px system-ui';
      ctx.fillText('No data available', chartRef.current.width / 2, chartRef.current.height / 2);
    }
  }, [data, options, height]);

  return (
    <div className="pie-chart-container">
      <canvas
        ref={chartRef}
        className="pie-chart"
        height={height}
      />
    </div>
  );
};

export default PieChart;