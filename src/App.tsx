//Core
import { useEffect } from "react";
import { Route, Routes } from "react-router-dom";
//Components
import Header from "./components/shared/Header";
import Footer from "./components/shared/Footer";
import Home from "./components/home/Home";
import ProductsPage from "./components/products/ProductsPage";
import ProductDetails from "./components/products/ProductDetails";
import About from "./components/about/About";
import Cart from "./components/cart/Cart";
//Store
import { useAppDispatch } from "./store/store";
import { setProducts } from "./store/productSlice";

function App() {
  const dispatch = useAppDispatch();

  useEffect(() => {
    const fetchProducts = async () => {
      const res = await fetch("http://localhost:3000/products");
      const data = await res.json();
      dispatch(setProducts(data));
    };
    fetchProducts();
  }, [dispatch]);

  return (
    <>
      <Header user="John Doe" />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/products" element={<ProductsPage />} />
        <Route path="/products/:productId" element={<ProductDetails />} />
        <Route path="/about" element={<About />} />
        <Route path="/cart" element={<Cart />} />
      </Routes>
      <Footer />
    </>
  );
}

export default App;
