import { useEffect, useState } from "react";
import { Route, Routes } from "react-router-dom";
import Header from "./components/shared/Header";
import Footer from "./components/shared/Footer";
import Home from "./components/home/Home";
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
      </Routes>
      <Footer />
    </>
  );
}

export default App;
