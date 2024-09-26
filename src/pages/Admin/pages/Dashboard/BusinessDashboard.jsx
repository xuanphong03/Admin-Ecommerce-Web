import { Fragment, useEffect, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import dashboardApi from '~/apis/dashboardApi';
import LineGraph from '~/components/Charts/Line';
import PieChart from '~/components/Charts/PieChart';
import { formatPrice } from '~/utils/formatCurrency';
import SkeletonBestSellingProduct from './components/SkeletonBestSellingProduct';

function BusinessDashboard() {
  const [orderStatistics, setOrderStatistics] = useState({});
  const [revenueStatistics, setRevenueStatistics] = useState({});
  const [bestSellingProducts, setBestSellingProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const getSystemStatistics = async () => {
    try {
      setIsLoading(true);
      const response = await dashboardApi.getSystemStatistics();
      setBestSellingProducts(response.proBestSelling);
    } catch (error) {
      throw new Error('Failed to get system data');
    } finally {
      setIsLoading(false);
    }
  };

  const getOrderStatistics = async () => {
    try {
      const response = await dashboardApi.getOrderStatistics();
      setOrderStatistics(response.datasets[0]);
    } catch (error) {
      throw new Error('Failed to get system data');
    }
  };

  const getRevenueOfTheYears = async () => {
    try {
      const response = await dashboardApi.getRevenueOfTheYears();
      const currentYearRevenue = response.datasets[0];
      setRevenueStatistics(currentYearRevenue);
    } catch (error) {
      throw new Error('Failed to get system data');
    }
  };

  useEffect(() => {
    getSystemStatistics();
    getOrderStatistics();
    getRevenueOfTheYears();
  }, []);

  return (
    <Fragment>
      <h2 className="font-medium">Báo cáo tình hình kinh doanh</h2>
      <hr className="mt-2"></hr>
      <div className="flex gap-5">
        <div className="max-w-[60%] basis-3/5 bg-white p-5 shadow-xl">
          <LineGraph
            title="Thống kê doanh thu"
            label="Doanh thu "
            data={revenueStatistics?.data ?? []}
          />
        </div>
        <div className="max-w-[40%] basis-2/5 bg-white p-5 shadow-xl">
          <PieChart
            title={`Thống kê trạng thái các đơn hàng`}
            labels={orderStatistics?.labels || []}
            data={orderStatistics?.data || [0, 0, 0]}
          />
        </div>
      </div>
      <div className="mt-5 w-fit gap-5">
        <div className="bg-white p-5 shadow-xl">
          <h2 className="mb-5 font-medium">
            Top 4 sản phẩm bán chạy nhất tháng
          </h2>
          {
            <div className="flex flex-wrap gap-x-10 gap-y-5">
              {isLoading &&
                [...Array(4)].map((_) => {
                  return <SkeletonBestSellingProduct key={uuidv4()} />;
                })}
              {!isLoading &&
                bestSellingProducts.map(
                  ({ imageMain, name, finalPrice, quantitySold }) => (
                    <div
                      key={uuidv4()}
                      className="relative flex gap-2 rounded bg-gray-200 px-2 py-1"
                    >
                      <div className="size-20 overflow-hidden rounded-sm">
                        <img
                          alt="Ảnh sản phẩm"
                          src={imageMain}
                          className="max-h-full"
                        />
                      </div>
                      <div className="w-[300px]">
                        <h4 className="font-medium text-blue-600">
                          {quantitySold} lượt mua
                        </h4>
                        <h3 className="max-w-[75%] break-words text-sm text-gray-600">
                          {name}
                        </h3>
                      </div>
                      <p className="absolute right-2 top-2 rounded-sm bg-green-500 px-2 py-1 text-xs text-white">
                        {formatPrice(finalPrice, 'VNĐ')}
                      </p>
                    </div>
                  ),
                )}
            </div>
          }
        </div>
      </div>
    </Fragment>
  );
}

export default BusinessDashboard;
