import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, Link } from "react-router-dom";
import { products } from "./Products";
import {
  setItems,
  removeItem,
} from "../Components/slices/CartSlice";
import Navbar from "./Navbar";
import Footer from "./Footer";

const Product = () => {
  const { cart } = useSelector((state) => state.cart);
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const dispatch = useDispatch();

  useEffect(() => {
    const foundProduct = products.find(
      (item) => item.id.toString() === id.toString()
    );
    setProduct(foundProduct);
  }, [cart, id]);

  const isInCart = cart.some((item) => item.id === product?.id);

  const handleAddToCart = () => {
    let count = 1;
    dispatch(setItems({ ...product, count }));
  };

  const handleRemoveFromCart = () => {
    dispatch(removeItem(product.id));
  };

  if (!product) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-300">
        <p className="text-lg font-semibold text-gray-600">
          Product not found 😕
        </p>
      </div>
    );
  }

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gray-300 flex flex-col items-center justify-center p-5 font-[Poppins]">
        <div className="bg-gray-400 rounded-xl shadow-lg p-6 sm:p-10 max-w-xl w-full flex flex-col sm:flex-row gap-6">
          <div className="flex-1 flex justify-center items-center">
            <img
              src={product.image}
              alt={product.productName}
              className="h-56 sm:h-72 object-contain"
            />
          </div>

          <div className="flex-1 flex flex-col justify-center gap-3">
            <h1 className="text-2xl sm:text-3xl font-semibold">
              {product.productName}
            </h1>
            <p className="text-gray-600 text-sm sm:text-base">
              {product.description}
            </p>
            <p className="font-bold text-lg mt-2">Price: ₹{product.price}</p>
            <span>
              {isInCart ? (
                <button
                  onClick={() => handleRemoveFromCart(id)}
                  className="bg-gray-500 hover:cursor-pointer px-1 rounded active:scale-95 active:translate-z-1"
                >
                  Remove from Cart
                </button>
              ) : (
                <button
                  onClick={() => handleAddToCart(id)}
                  className="bg-gray-500 px-1 hover:cursor-pointer rounded active:scale-95 active:translate-z-1"
                >
                  Add to Cart
                </button>
              )}
            </span>

            <Link
              to="/"
              className="mt-4 font-bold hover:underline text-l sm:text-xl"
            >
              Back to Home
            </Link>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Product;
