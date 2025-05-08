import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Products from "./pages/Products";
import About from "./pages/about";
import Cart from "./pages/Cart";
import Payment from "./pages/Payment";
import Blog from "./pages/Blog"; // Assurez-vous que cette page existe
import Contact from "./pages/Contact"; // Assurez-vous que cette page existe
import Navbar from "./components/NavBar";
import ProductDetails from "./pages/ProductDetail";
import ReviewDetails from "./pages/ReviewDetails";

import ArticleDetail from "./pages/ArticleDetail";
import Footer from "./components/footer";
import './darkTheme.css';

import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js"; 

function App() {
  return (
    <div>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/Home" element={<Home />} />
        <Route path="/products" element={<Products />} />
        <Route path="/products/:id" element={<ProductDetails />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/payment" element={<Payment />} />
        <Route path="/blog" element={<Blog />} />
        <Route path="/blog/:id" element={<ArticleDetail />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/About" element={<About />} />
        <Route path="/" element={<Home />} />
        <Route path="/review/:id" element={<ReviewDetails />} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
