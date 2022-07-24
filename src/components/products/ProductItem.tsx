import useImage from "../../hooks/useImage";
import { Product } from "../../types/Product";

interface Props {
  product: Product;
}

const ProductItem: React.FC<Props> = ({ product }) => {
  const image = useImage(product.id);

  return (
    <div className="p-5 mx-auto cursor-pointer sm:max-w-sm">
      <div className="overflow-hidden rounded-lg ">
        <img
          className="object-cover transition-all duration-500 rounded-lg hover:scale-110"
          src={image.image}
          alt={product.name}
        />
      </div>
      <h2 className="text-2xl text-gray-800">{product.name}</h2>
      <p className="text-gray-500">{`$${product.price.toString()}`}</p>
    </div>
  );
};

export default ProductItem;
