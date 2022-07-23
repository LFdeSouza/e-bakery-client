import React from "react";
import { Product } from "../../types/Product";

interface Props {
  product: Product;
}
const SuggestionBox: React.FC<Props> = ({ product }) => {
  console.log(product.url);
  return (
    <div className="p-4 ">
      <div className="relative group">
        <div className="w-full overflow-hidden rounded-lg h-80 ">
          <img
            className="object-cover w-full h-full transition-transform duration-500 cursor-pointer hover:scale-125"
            src={require(`../../assets/images/almond_croassant.jpg`)}
            alt={product.name}
          />
        </div>
        <p className="rounded-lg bg-white/60 p-1.5 px-4 text-center text-gray-700 group-hover:visible  sm:invisible sm:absolute sm:left-16 sm:bottom-5 sm:text-gray-900">
          {product.name}
        </p>
      </div>
    </div>
  );
};

export default SuggestionBox;
