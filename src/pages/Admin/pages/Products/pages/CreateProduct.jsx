import CreateProductForm from '../components/CreateForm';

function CreateProductPage() {
  return (
    <div className="px-5 py-5">
      <h1 className="border-gray border-b border-solid pb-5 text-xl font-medium uppercase">
        Thêm sản phẩm
      </h1>
      <div className="py-5">
        <CreateProductForm />
      </div>
    </div>
  );
}

export default CreateProductPage;
