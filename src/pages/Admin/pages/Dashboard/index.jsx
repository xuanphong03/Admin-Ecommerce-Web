import { IoLogoGoogleplus } from 'react-icons/io';
import { IoCartOutline, IoSettingsOutline } from 'react-icons/io5';
import BarChart from '~/components/Charts/BarChart';
import LineGraph from '~/components/Charts/Line';
import PieChart from '~/components/Charts/PieChart';
import { formatPrice } from '~/utils/formatCurrency';
function DashboardPage() {
  return (
    <div className="">
      <div className="mb-10 flex gap-10 px-5">
        <div className="flex min-w-80 gap-4 overflow-hidden rounded bg-white shadow-xl">
          <div className="flex size-20 items-center justify-center bg-sky-400 text-4xl text-white">
            <IoCartOutline />
          </div>
          <div className="flex flex-col justify-center gap-2 bg-white px-2">
            <h2 className="uppercase">Tổng số đơn trong tháng</h2>
            <p className="text-xl font-medium">200 đơn</p>
          </div>
        </div>
        <div className="flex min-w-80 gap-4 overflow-hidden rounded bg-white shadow-xl">
          <div className="flex size-20 items-center justify-center bg-green-400 text-4xl text-white">
            <IoSettingsOutline />
          </div>
          <div className="flex flex-col justify-center gap-2 bg-white px-2">
            <h2 className="uppercase">Tổng số sản phẩm</h2>
            <p className="text-xl font-medium">20 sản phẩm</p>
          </div>
        </div>
        <div className="flex min-w-80 gap-4 overflow-hidden rounded bg-white shadow-xl">
          <div className="flex size-20 items-center justify-center bg-orange-400 text-4xl text-white">
            <IoLogoGoogleplus />
          </div>
          <div className="flex flex-col justify-center gap-2 bg-white px-2">
            <h2 className="uppercase">Đánh giá</h2>
            <p className="text-xl font-medium">10000 lượt</p>
          </div>
        </div>
      </div>
      <div className="flex gap-5 px-5">
        <div className="max-w-[60%] basis-3/5 bg-white p-5 shadow-xl">
          <LineGraph />
        </div>
        <div className="max-w-[40%] basis-2/5 bg-white p-5 shadow-xl">
          <PieChart />
        </div>
      </div>
      <div className="mt-5 px-5">
        <div className="w-fit rounded bg-white px-5 py-2 shadow-xl">
          <h2 className="mb-5 text-xl font-medium uppercase">
            Top 4 sản phẩm bán chạy nhất tháng
          </h2>
          <div className="flex flex-col gap-2">
            {[...Array(4)].map((_, index) => (
              <div
                key={index}
                className="relative flex w-[600px] gap-2 bg-gray-200 px-2 py-1"
              >
                <div className="size-20">
                  <img
                    alt="Ảnh sản phẩm"
                    src="https://product.hstatic.net/1000360022/product/id-000557a_ed253198d9ec4355ada9678a4d229d3e_1024x1024.jpg"
                    className="max-h-full"
                  />
                </div>
                <div className="w-[300px]">
                  <h4 className="font-medium text-blue-600">100 lượt mua</h4>
                  <h3 className="max-w-full break-words text-gray-600">
                    Áo hoodie nam thu đông Gucci
                  </h3>
                </div>
                <p className="absolute right-2 top-2 rounded bg-green-500 px-2 py-1 text-sm text-white">
                  {formatPrice(200000, 'VNĐ')}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default DashboardPage;
