import React from "react";
import Navigation from "../components/navbar/Navbar";
import ListProduct from "../components/ListProduct";
import { ToastContainer } from "react-toastify";
import Footer from "../components/footer";

function Home() {
  return (
    <div>
      <Navigation />
      <ListProduct />
      <ToastContainer
        position="bottom-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
      />
      <Footer />
    </div>
  );
}

export default Home;
