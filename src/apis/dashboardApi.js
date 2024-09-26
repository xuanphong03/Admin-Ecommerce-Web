import axios from 'axios';
import axiosClient from './axiosClient';

const dashboardApi = {
  getSystemStatistics() {
    const url = '/admin/quantity-statistics';
    return axiosClient.get(url);
  },
  getOrderStatistics() {
    const url = '/admin/statistics-chart-bar';
    return axiosClient.get(url);
  },
  getRevenueOfTheYears() {
    const url = '/admin/statistics-chart-line';
    return axiosClient.get(url);
  },
};

export default dashboardApi;
