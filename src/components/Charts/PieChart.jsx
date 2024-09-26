import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS, Tooltip, Legend, ArcElement } from 'chart.js';
ChartJS.register(Tooltip, Legend, ArcElement);
import React from 'react';
import PropTypes from 'prop-types';

PieChart.propTypes = {};

function PieChart({ title, labels, data }) {
  const barChartData = {
    labels: labels,
    datasets: [
      {
        label: 'Thống kê trạng thái các đơn hàng',
        data: data,
        backgroundColor: [
          'rgba(153,250,134,0.9)',
          'rgba(235,158,102,0.9)',
          'rgba(130,184,230,0.9)',
        ],
        hoverOffset: 3,
      },
    ],
  };
  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'bottom',
      },
      title: {
        display: true,
        text: title,
      },
    },
  };
  return <Pie options={options} data={barChartData} />;
}

export default PieChart;
