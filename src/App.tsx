import { useEffect, useState } from "react";
import { Route, Routes } from "react-router-dom";
import Header from "./components/shared/Header";
import Footer from "./components/shared/Footer";
import Home from "./components/home/Home";
import data from "./data/data.json";
import { Product } from "./types/Product";
function App() {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    setProducts(data.products);
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
