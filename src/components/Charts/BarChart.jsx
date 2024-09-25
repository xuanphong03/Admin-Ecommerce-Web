import { Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
);
import React from 'react';
import PropTypes from 'prop-types';

BarChart.propTypes = {};

function BarChart(props) {
  const barChartData = {
    labels: ['Đang xử lý', 'Đang giao hàng', 'Đã giao hàng'],
    datasets: [
      {
        label: 'Thống kê trạng thái đơn hàng',
        data: [1200, 300, 150],
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
        text: 'Biểu đồ doanh thu',
      },
    },
  };
  return <Bar options={options} data={barChartData} />;
}

export default BarChart;
