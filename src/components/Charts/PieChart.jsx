import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS, Tooltip, Legend, ArcElement } from 'chart.js';
ChartJS.register(Tooltip, Legend, ArcElement);
import React from 'react';
import PropTypes from 'prop-types';

PieChart.propTypes = {};

function PieChart(props) {
  const barChartData = {
    labels: ['Đang xử lý', 'Đang giao hàng', 'Đã giao hàng'],
    datasets: [
      {
        label: 'Thống kê trạng thái đơn hàng',
        data: [1200, 300, 150],
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
        text: 'Biểu đồ trạng thái các đơn hàng',
      },
    },
  };
  return <Pie options={options} data={barChartData} />;
}

export default PieChart;
