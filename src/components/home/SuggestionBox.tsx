import React from "react";
import { Product } from "../../types/Product";

interface Props {
  product: Product;
}
const SuggestionBox: React.FC<Props> = ({ product }) => {
  const image =
    "https://images.unsplash.com/photo-1599819055803-717bba43890f?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2070&q=80";
  return (
    <div className="p-4 ">
      <div className="relative group">
        <div className="overflow-hidden rounded-lg h-80 w-72">
          <img
            className="object-cover w-full h-full transition-transform duration-500 cursor-pointer hover:scale-125"
            src={image}
            alt=";dlisaf"
          />
        </div>
        <p className="invisible absolute left-16 bottom-5  rounded-lg bg-white/60 p-1.5 px-4 group-hover:visible">
          Name of the product
        </p>
      </div>
    </div>
  );
};

export default SuggestionBox;
