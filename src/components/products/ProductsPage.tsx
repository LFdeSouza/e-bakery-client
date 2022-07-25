import { useEffect, useState } from "react";
import { Product } from "../../types/Product";
import ProductItem from "./ProductItem";

interface Props {
  products: Product[];
}
const ProductsPage: React.FC<Props> = ({ products }) => {
  const [selection, setSelection] = useState("pastry");
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);

  useEffect(() => {
    setFilteredProducts(products.filter((item) => item.category === selection));
  }, [selection]);

  return (
    <main className="mx-auto mt-32 max-w-7xl">
      <div className="flex items-center mb-10">
        <button
          onClick={() => setSelection("pastry")}
          className={`${
            selection === "pastry" && "underline"
          } ml-10 rounded-lg text-xl font-semibold text-gray-800 hover:underline`}
        >
          Pastry
        </button>
        <button
          onClick={() => setSelection("bakery")}
          className={`${
            selection === "bakery" && "underline"
          } ml-10 rounded-lg text-xl font-semibold text-gray-800 hover:underline`}
        >
          Bakery
        </button>
      </div>
      <section className="flex flex-wrap">
        {filteredProducts.map((item) => (
          <ProductItem product={item} key={item.id} />
        ))}
      </section>
    </main>
  );
};

export default ProductsPage;
