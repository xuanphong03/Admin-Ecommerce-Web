function TableHeader() {
  return (
    <div className="mb-5 flex justify-between py-2 text-sm font-medium shadow-table">
      <div className="basis-[10%] text-center">
        <h3>SKU</h3>
      </div>
      <div className="basis-[5%] text-center">
        <h3>Ảnh</h3>
      </div>
      <div className="basis-[20%] text-center">
        <h3>Tên sản phẩm</h3>
      </div>
      <div className="basis-[10%] text-center">
        <h3>Giá</h3>
      </div>
      <div className="basis-[10%] text-center">
        <h3>Giảm giá</h3>
      </div>
      <div className="basis-[20%] text-center">
        <h3>Mô tả sản phẩm</h3>
      </div>
      <div className="basis-[10%] text-center">
        <h3>Số lượng</h3>
      </div>
      <div className="basis-[15%] text-center">
        <h3>Sửa/Xóa</h3>
      </div>
    </div>
  );
}

export default TableHeader;
