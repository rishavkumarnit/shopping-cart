import React, { useEffect } from "react";
import Navbar from "./Navbar";
import Footer from "./Footer";
import { useDispatch, useSelector } from "react-redux";
import { products } from "./Products";
import { Link } from "react-router-dom";

import {
  setItems,
  removeItem,
} from "../Components/slices/CartSlice";

const Cart = () => {
  const { cart, totalItems, totalPrice } = useSelector((state) => state.cart);
  const dispatch = useDispatch();
  const handleRemoveItems = (id) => {
    dispatch(removeItem(id));
  };
  const handleIncreaseCount = (product) => {
    let count = product.count + 1;
    dispatch(setItems({ ...product, count }));
  };
  const handleDecreaseCount = (product) => {
    let count = product.count - 1;
    if (count == 0) {
      handleRemoveItems(product.id);
    } else {
      dispatch(setItems({ ...product, count }));
    }
  };
  useEffect(() => {}, [cart]);
  return (
    <>
      <Navbar />
      <div className="bg-gray-300 pt-15 text-center min-h-screen relative">
        <p className="text-2xl font-bold mt-5">
          Your cart ({totalItems} items)
        </p>
        {cart.length === 0 ? (
          <p className="text-gray-600 text-lg mt-20">Your cart is empty 🛒</p>
        ) : (
          <div className="mt-5">
            {cart.map((item) => {
              return (
                <div
                  key={item.id}
                  className="flex gap-6  w-[70%] h-15 items-center rounded-xl bg-gray-400 my-4 mx-auto justify-center"
                >
                  <img
                    src={item.image}
                    alt={item.productName}
                    className="h-full w-10 rounded"
                  />
                  <p>{item.id}</p>
                  <p>{item.productName}</p>
                  <p>Rs {item.price}</p>

                  <p>{item.description}</p>
                  <button
                    onClick={() => handleIncreaseCount(item)}
                    className="bg-green-300 h-5 w-6 pb-5 rounded-2xl hover:cursor-pointer"
                  >
                    +
                  </button>
                  <button
                    onClick={() => handleRemoveItems(item.id)}
                    className="rounded-2xl p-1 bg-gray-200 hover:cursor-pointer"
                  >
                    Remove
                  </button>
                  <button
                    onClick={() => handleDecreaseCount(item)}
                    className="bg-red-300 pb-3 rounded-2xl h-5 w-6 hover:cursor-pointer"
                  >
                    -
                  </button>
                  <p>count: {item.count}</p>
                </div>
              );
            })}
            <div className="flex gap-4 h-14 bg-gray-500 rounded-xl w-[40%] font-semibold mx-auto items-center justify-center">
              <div>
                <span>Total items-</span>
                <span>{totalItems}</span>
              </div>
              <div>
                <span>Total price-</span>
                <span>{totalPrice}</span>
              </div>
            </div>
          </div>
        )}

        <Link to={"/checkout"}>
          <button className="fixed bottom-10 w-30 hover:cursor-pointer bg-green-200 rounded-2xl right-5">
            Checkout
          </button>
        </Link>
      </div>

      <Footer />
    </>
  );
};

export default Cart;
