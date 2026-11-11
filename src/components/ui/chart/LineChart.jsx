// src/components/ui/chart/LineChart.jsx
import React, { useEffect, useRef } from 'react';
import './LineChart.css';

const LineChart = ({ data, options = {}, height = 300 }) => {
  const chartRef = useRef(null);

  useEffect(() => {
    // This would typically initialize a chart library like Chart.js
    // For now, we'll render a placeholder that can be replaced with actual chart implementation
    const ctx = chartRef.current.getContext('2d');

    // Clear canvas
    ctx.clearRect(0, 0, chartRef.current.width, chartRef.current.height);

    // Set dimensions
    chartRef.current.width = chartRef.current.parentElement.clientWidth;
    chartRef.current.height = height;

    // Draw simple line chart placeholder
    if (data && data.labels && data.datasets && data.datasets.length > 0) {
      const ctx = chartRef.current.getContext('2d');
      ctx.clearRect(0, 0, chartRef.current.width, chartRef.current.height);

      // Simple placeholder drawing
      ctx.fillStyle = '#f8f9fa';
      ctx.fillRect(0, 0, chartRef.current.width, chartRef.current.height);

      // Draw axes
      ctx.strokeStyle = '#dee2e6';
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.moveTo(50, chartRef.current.height - 30);
      ctx.lineTo(chartRef.current.width - 20, chartRef.current.height - 30); // X-axis
      ctx.lineTo(chartRef.current.width - 20, 30); // Y-axis
      ctx.stroke();

      // Draw data points (simplified)
      if (data.labels.length > 0) {
        const dataset = data.datasets[0];
        const points = dataset.data || [];
        if (points.length > 0) {
          const xStep = (chartRef.current.width - 90) / (data.labels.length - 1 || 1);
          const yScale = (chartRef.current.height - 80) / (Math.max(...points) || 1);

          ctx.strokeStyle = dataset.borderColor || '#E53935';
          ctx.lineWidth = 2;
          ctx.beginPath();

          points.forEach((value, index) => {
            const x = 50 + index * xStep;
            const y = chartRef.current.height - 30 - (value * yScale);
            if (index === 0) {
              ctx.moveTo(x, y);
            } else {
              ctx.lineTo(x, y);
            }
          });
          ctx.stroke();

          // Draw points
          points.forEach((value, index) => {
            const x = 50 + index * xStep;
            const y = chartRef.current.height - 30 - (value * yScale);
            ctx.fillStyle = dataset.borderColor || '#E53935';
            ctx.beginPath();
            ctx.arc(x, y, 3, 0, 2 * Math.PI);
            ctx.fill();
          });
        }
      }
    } else {
      // Draw empty state
      const ctx = chartRef.current.getContext('2d');
      ctx.fillStyle = '#f8f9fa';
      ctx.fillRect(0, 0, chartRef.current.width, chartRef.current.height);
      ctx.textAlign = 'center';
      ctx.fillStyle = '#6c757d';
      ctx.font = '14px system-ui';
      ctx.fillText('No data available', chartRef.current.width / 2, chartRef.current.height / 2);
    }
  }, [data, options, height]);

  return (
    <div className="line-chart-container">
      <canvas
        ref={chartRef}
        className="line-chart"
        height={height}
      />
    </div>
  );
};

export default LineChart;