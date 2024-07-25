import TableBody from './components/TableBody';
import TableHeader from './components/TableHeader';

function ProductsList() {
  return (
    <section className="relative px-5 py-6">
      <TableHeader />
      <TableBody />
    </section>
  );
}

export default ProductsList;
