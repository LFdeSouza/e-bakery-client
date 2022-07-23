import Footer from "./components/shared/Footer";
import Navbar from "./components/shared/Navbar";

function App() {
  return (
    <>
      <Navbar user="John Doe" />
      <h1 className="font-bold text-red-500">Hello world</h1>
      <Footer />
    </>
  );
}

export default App;
