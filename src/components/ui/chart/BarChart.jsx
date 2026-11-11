// src/components/ui/chart/BarChart.jsx
import React, { useEffect, useRef } from 'react';
import './BarChart.css';

const BarChart = ({ data, options = {}, height = 300 }) => {
  const chartRef = useRef(null);

  useEffect(() => {
    const ctx = chartRef.current.getContext('2d');

    // Clear canvas
    ctx.clearRect(0, 0, chartRef.current.width, chartRef.current.height);

    // Set dimensions
    chartRef.current.width = chartRef.current.parentElement.clientWidth;
    chartRef.current.height = height;

    // Draw simple bar chart placeholder
    if (data && data.labels && data.datasets && data.datasets.length > 0) {
      const ctx = chartRef.current.getContext('2d');
      ctx.clearRect(0, 0, chartRef.current.width, chartRef.current.height);

      // Background
      ctx.fillStyle = '#f8f9fa';
      ctx.fillRect(0, 0, chartRef.current.width, chartRef.current.height);

      // Draw axes
      ctx.strokeStyle = '#dee2e6';
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.moveTo(60, chartRef.current.height - 30);
      ctx.lineTo(chartRef.current.width - 20, chartRef.current.height - 30); // X-axis
      ctx.lineTo(chartRef.current.width - 20, 30); // Y-axis
      ctx.stroke();

      // Draw bars (simplified)
      if (data.labels.length > 0) {
        const dataset = data.datasets[0];
        const values = dataset.data || [];
        if (values.length > 0) {
          const xStep = (chartRef.current.width - 100) / (data.labels.length + 1);
          const maxValue = Math.max(...values) || 1;
          const yScale = (chartRef.current.height - 80) / maxValue;

          ctx.fillStyle = dataset.backgroundColor || 'rgba(229, 57, 53, 0.5)';
          ctx.strokeStyle = dataset.borderColor || '#E53935';
          ctx.lineWidth = 1;

          values.forEach((value, index) => {
            const x = 60 + (index + 1) * xStep - xStep/2;
            const y = chartRef.current.height - 30 - (value * yScale);
            const width = xStep * 0.6;
            const height = value * yScale;

            ctx.fillRect(x, y, width, height);
            ctx.strokeRect(x, y, width, height);
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
    <div className="bar-chart-container">
      <canvas
        ref={chartRef}
        className="bar-chart"
        height={height}
      />
    </div>
  );
};

export default BarChart;