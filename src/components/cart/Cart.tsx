import { useAppSelector } from "../../store/store";
import CartItem from "./CartItem";

const Cart = () => {
  const cartItems = useAppSelector((state) => state.cart.items);

  return (
    <main className="justify-between w-5/6 mx-auto mt-36 max-w-7xl sm:flex sm:p-5">
      <section>
        <h2 className="mb-10 text-3xl font-semibold text-gray-700">
          Your cart
        </h2>
        {cartItems.map((item) => (
          <CartItem item={item} />
        ))}
      </section>
      <section>
        <h2 className="mb-10 text-3xl font-semibold text-gray-700">
          Procede to checkout
        </h2>
        <p>Total: </p>
      </section>
    </main>
  );
};

export default Cart;
