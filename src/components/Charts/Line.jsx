import React from 'react';
import PropTypes from 'prop-types';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  plugins,
} from 'chart.js';
import { data } from 'autoprefixer';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
);
LineGraph.propTypes = {};

function LineGraph(props) {
  const data = {
    labels: [
      'Tháng Một',
      'Tháng Hai',
      'Tháng Ba',
      'Tháng Tư',
      'Tháng Năm',
      'Tháng Sáu',
      'Tháng Bảy',
      'Tháng Tám',
      'Tháng Chín',
      'Tháng Mười',
      'Tháng Mười Một',
      'Tháng Mười Hai',
    ],
    datasets: [
      {
        label: 'Doanh thu năm 2024',
        data: [
          6000, 7000, 4000, 5000, 1000, 10000, 5000, 4000, 8000, 9000, 6000,
          4000,
        ],
        borderColor: 'rgb(75,192,192)',
      },
      {
        label: 'Doanh thu năm 2023',
        data: [
          5000, 5000, 5000, 2000, 8000, 9000, 5000, 2000, 8000, 10000, 5000,
          5000,
        ],
        borderColor: '#DF2648',
      },
    ],
  };
  const option = {
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
  return <Line options={option} data={data}></Line>;
}

export default LineGraph;
