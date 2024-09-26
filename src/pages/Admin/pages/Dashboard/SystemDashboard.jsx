import { Fragment, useEffect, useState } from 'react';
import { FaFileCircleQuestion, FaUser } from 'react-icons/fa6';
import { IoLogoGoogleplus } from 'react-icons/io';
import { IoCartOutline, IoSettingsOutline } from 'react-icons/io5';
import dashboardApi from '~/apis/dashboardApi';

function SystemDashboard() {
  const [systemData, setSystemData] = useState({});

  const getSystemStatistics = async () => {
    try {
      const response = await dashboardApi.getSystemStatistics();
      setSystemData(response);
    } catch (error) {
      throw new Error('Failed to get system data');
    }
  };

  useEffect(() => {
    getSystemStatistics();
  }, []);

  return (
    <Fragment>
      <h2 className="font-medium">Báo cáo hệ thống</h2>
      <hr className="mb-2"></hr>
      <div className="flex flex-wrap gap-5">
        <div className="flex min-w-80 gap-2 overflow-hidden rounded bg-white shadow-xl">
          <div className="flex size-20 items-center justify-center bg-sky-400 text-4xl text-white">
            <IoCartOutline />
          </div>
          <div className="flex flex-col justify-center gap-2 bg-white px-2">
            <h2 className="text-sm">Tổng số đơn trong tháng</h2>
            <p className="text-xl font-medium">
              {systemData.ntotalOrdersThisMonth ?? 0} đơn hàng
            </p>
          </div>
        </div>
        <div className="flex min-w-80 gap-2 overflow-hidden rounded bg-white shadow-xl">
          <div className="flex size-20 items-center justify-center bg-green-400 text-4xl text-white">
            <IoSettingsOutline />
          </div>
          <div className="flex flex-col justify-center gap-2 bg-white px-2">
            <h2 className="text-sm">Tổng số sản phẩm</h2>
            <p className="text-xl font-medium">
              {systemData.ntotalProductActive ?? 0} sản phẩm
            </p>
          </div>
        </div>
        <div className="flex min-w-80 gap-2 overflow-hidden rounded bg-white shadow-xl">
          <div className="flex size-20 items-center justify-center bg-orange-400 text-4xl text-white">
            <IoLogoGoogleplus />
          </div>
          <div className="flex flex-col justify-center gap-2 bg-white px-2">
            <h2 className="text-sm">Đánh giá</h2>
            <p className="text-xl font-medium">
              {systemData.ntotalRating ?? 0} lượt
            </p>
          </div>
        </div>
        <div className="flex min-w-80 gap-2 overflow-hidden rounded bg-white shadow-xl">
          <div className="flex size-20 items-center justify-center bg-yellow-400 text-4xl text-white">
            <FaFileCircleQuestion />
          </div>
          <div className="flex flex-col justify-center gap-2 bg-white px-2">
            <h2 className="text-sm">Câu hỏi chưa trả lời</h2>
            <p className="text-xl font-medium">
              {systemData.ntotalWaitingQuestion ?? 0} câu
            </p>
          </div>
        </div>
        <div className="flex min-w-80 gap-2 overflow-hidden rounded bg-white shadow-xl">
          <div className="flex size-20 items-center justify-center bg-red-400 text-4xl text-white">
            <FaUser />
          </div>
          <div className="flex flex-col justify-center gap-2 bg-white px-2">
            <h2 className="text-sm">Số lượng khách hàng</h2>
            <p className="text-xl font-medium">
              {systemData.ntotalCustomer ?? 0} người
            </p>
          </div>
        </div>
      </div>
    </Fragment>
  );
}

export default SystemDashboard;
