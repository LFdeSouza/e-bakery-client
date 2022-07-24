//Core
import { useEffect, useState } from "react";
import { Route, Routes } from "react-router-dom";
//Components
import Header from "./components/shared/Header";
import Footer from "./components/shared/Footer";
import Home from "./components/home/Home";
import ProductsPage from "./components/products/ProductsPage";
//Types
import { Product } from "./types/Product";

function App() {
  const [products, setProducts] = useState<Product[]>([]);

  const fetchProducts = async () => {
    const res = await fetch("http://localhost:3000/products");
    const data = await res.json();
    setProducts(data);
  };
  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <>
      <Header user="John Doe" />
      <Routes>
        <Route path="/" element={<Home products={products} />} />
        <Route
          path="/products"
          element={<ProductsPage products={products} />}
        />
      </Routes>
      <Footer />
    </>
  );
}

export default App;
