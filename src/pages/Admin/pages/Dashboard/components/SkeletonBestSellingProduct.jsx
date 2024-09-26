import placeholder80x80 from '~/assets/images/placeholder80x80.svg';
SkeletonBestSellingProduct.propTypes = {};

function SkeletonBestSellingProduct() {
  return (
    <div className="relative flex gap-2 rounded bg-gray-200 px-2 py-1">
      <div className="size-20 overflow-hidden rounded-sm">
        <img alt="Ảnh sản phẩm" src={placeholder80x80} className="max-h-full" />
      </div>
      <div className="mt-1 w-[300px]">
        <div className="h-4 w-20 rounded-sm bg-gray-300"></div>
        <div className="mt-2 h-4 w-40 rounded-sm bg-gray-300"></div>
      </div>
      <div className="absolute right-2 top-2 h-4 w-20 rounded-sm bg-gray-300 text-xs text-white"></div>
    </div>
  );
}

export default SkeletonBestSellingProduct;
