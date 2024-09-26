import {
  CategoryScale,
  Chart as ChartJS,
  Legend,
  LinearScale,
  LineElement,
  PointElement,
  Title,
  Tooltip,
} from 'chart.js';
import { Line } from 'react-chartjs-2';

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

function LineGraph({ title, data, label }) {
  const lineGraphData = {
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
        label: label,
        data: data,
        borderColor: 'rgb(75,192,192)',
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
        text: title,
      },
    },
    scales: {
      y: {
        ticks: {
          stepSize: 10000000, // Giá trị bước
          min: 0, // Giá trị nhỏ nhất
          callback: function (value) {
            if (Number.isInteger(value)) {
              return value; // Hiển thị chỉ số nguyên
            }
            return null;
          },
        },
      },
    },
  };
  return <Line options={option} data={lineGraphData}></Line>;
}

export default LineGraph;
