import { useParams } from "react-router-dom";
import { useAppSelector, useAppDispatch } from "../../store/store";
import useImage from "../../hooks/useImage";
import {
  addItemToCart,
  decrementQuantity,
  incrementQuantity,
} from "../../store/cartSlice";
import { MinusIcon, PlusIcon } from "@heroicons/react/outline";

const ProductDetails = () => {
  const dispatch = useAppDispatch();
  const { productId } = useParams();

  const product = useAppSelector((state) => state.products.products).find(
    (item) => item.id.toString() === productId
  );

  const quantityInCart = useAppSelector((state) => state.cart.items).find(
    (item) => item.id.toString() === productId
  )?.quantity;

  const image = useImage(product?.id);

  return !product ? (
    <div className="mx-auto mt-32 mb-[40rem] max-w-7xl text-3xl font-semibold text-gray-800">
      We could not find your request
    </div>
  ) : (
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
              <button
                onClick={() => dispatch(decrementQuantity(Number(productId)))}
              >
                <MinusIcon className="w-6 h-6 text-mainOrange" />
              </button>
              <p className="text-lg font-bold text-gray-800">
                {quantityInCart?.toString() || "0"}
              </p>
              <button
                onClick={() =>
                  quantityInCart
                    ? dispatch(incrementQuantity(Number(productId)))
                    : dispatch(addItemToCart({ ...product, quantity: 1 }))
                }
              >
                <PlusIcon className="w-6 h-6 text-mainOrange" />
              </button>
            </div>
            <button
              onClick={() =>
                dispatch(addItemToCart({ ...product, quantity: 1 }))
              }
              className="w-full p-4 mt-4 text-white rounded-lg bg-mainOrange hover:bg-orange-600 sm:w-3/5"
            >
              Add to Cart
            </button>
          </div>
        </div>
      </div>
    </main>
  );
};

export default ProductDetails;
