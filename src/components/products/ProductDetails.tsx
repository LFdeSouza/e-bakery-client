import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import useImage from "../../hooks/useImage";
import { Product } from "../../types/Product";
import { MinusIcon, PlusIcon } from "@heroicons/react/outline";

const ProductDetails = () => {
  const { productId } = useParams();
  const [product, setProduct] = useState<Product>({
    name: "",
    id: 0,
    url: "",
    price: 0,
    description: "",
    category: "",
  });
  const image = useImage(product.id);

  const fetchProduct = async () => {
    const res = await fetch(`http://localhost:3000/products/${productId}`);
    const data = (await res.json()) as Product;
    setProduct(data);
  };
  useEffect(() => {
    fetchProduct();
  }, []);

  return (
    <main className="mx-auto mt-32 mb-80 max-w-7xl">
      <div className="sm:mx-auto sm:flex sm:w-11/12 sm:justify-between sm:gap-4">
        <div className="mx-auto w-11/12 sm:max-w-[35rem] sm:p-5">
          <img
            className="object-cover w-full h-full rounded-lg"
            src={image.image}
            alt={product.name}
          />
        </div>
        <div className="flex flex-col w-11/12 mx-auto mt-10 sm:max-w-md">
          <h2 className="text-lg font-semibold text-mainOrange">
            {product.category}
          </h2>
          <h3 className="mt-2 text-4xl font-semibold text-gray-800">
            {product.name}
          </h3>
          <p className="mt-4 text-gray-500">{product.description}</p>
          <p className="mt-3 text-2xl font-semibold text-gray-800">
            {`$${product.price.toString()}`}
          </p>
          <div className="items-center sm:flex sm:justify-between sm:gap-3">
            <div className="flex items-center justify-between p-4 px-10 mt-3 rounded-lg bg-grayishBlue sm:w-2/5 sm:px-5">
              <button>
                <MinusIcon className="w-6 h-6 text-mainOrange" />
              </button>
              <p className="text-lg font-bold text-gray-800">0</p>
              <button>
                <PlusIcon className="w-6 h-6 text-mainOrange" />
              </button>
            </div>
            <button className="w-full p-4 mt-4 text-white rounded-lg bg-mainOrange hover:bg-orange-600 sm:w-3/5">
              Add to Cart
            </button>
          </div>
        </div>
      </div>
    </main>
  );
};

export default ProductDetails;
