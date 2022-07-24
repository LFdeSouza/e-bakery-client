import { Product } from "../../types/Product";
import ProductItem from "./ProductItem";

interface Props {
  products: Product[];
}
const ProductsPage: React.FC<Props> = ({ products }) => {
  return (
    <main className="mx-auto mt-32 max-w-7xl">
      <div className="flex flex-wrap">
        {products.map((item) => (
          <ProductItem product={item} key={item.id} />
        ))}
      </div>
    </main>
  );
};

export default ProductsPage;
