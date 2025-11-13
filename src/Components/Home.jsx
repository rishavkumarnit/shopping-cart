import React from "react";

import { useState, useEffect } from "react";
import { products } from "./Products";
import Navbar from "./Navbar";
import Footer from "./Footer";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import {
  setItems,
  removeItem,
  setTotalItems,
} from "../Components/slices/CartSlice";

const Home = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [productList, setProductList] = useState([]);
  const [search, setSearch] = useState("");
  const dispatch = useDispatch();
  const { cart, totalItems, totalPrice } = useSelector((state) => state.cart);

  useEffect(() => {
    const initializedProducts = products.map((item) => ({
      ...item,
      added: false,
    }));
    setProductList(initializedProducts);
  }, []);

  const handleIsOpen = () => {
    setIsOpen(!isOpen);
  };

  useEffect(() => {
    setProductList((prevList) =>
      prevList.map((item) => ({
        ...item,
        added: cart.some((cartItem) => cartItem.id === item.id),
      }))
    );
  }, [cart]);

  const handleSearch = () => {
    if (!search.trim()) {
      setProductList(products);
      return;
    }
    const newList = products.filter(
      (item) =>
        item.description.toLowerCase().includes(search.toLowerCase()) ||
        item.productName.toLowerCase().includes(search.toLowerCase())
    );
    setProductList(newList);
  };

  const handleSearchChange = (e) => {
    setSearch(e.target.value);
  };

  const handleAddToCart = (product) => {
    let count = 1;
    dispatch(setItems({ ...product, count }));
    // dispatch(setItems(product));
    // dispatch(setTotalItems());
    const updatedList = productList.map((item) =>
      item.id === product.id ? { ...item, added: !item.added } : item
    );
    setProductList(updatedList);
    console.log(cart);
  };

  const handleRemoveFromCart = (id) => {
    dispatch(removeItem(id));
    // dispatch(setTotalItems());
    const updatedList = productList.map((item) =>
      item.id === id ? { ...item, added: !item.added } : item
    );
    setProductList(updatedList);
  };

  return (
    <div className="relative">
      <Navbar />
      <div className="pt-15 flex fixed ml-5  items-center w-full justify-center gap-1 z-20">
        <input
          type="text"
          name="search"
          value={search}
          onChange={handleSearchChange}
          className=" bg-cyan-100 h-10 w-[30%] border border-cyan-400 items-center justify-center text-center opacity-75 p-2 rounded-3xl"
        />
        <button
          onClick={handleSearch}
          className="rounded-full h-10 w-10 border font-medium flex justify-center items-center border-green-400 hover:cursor-pointer opacity-75 bg-green-100"
        >
          <img
            src="/search-2911.png"
            className="h-5 w-5 active:scale-90 active:translate-z-1"
            alt=""
          />
        </button>
        <div
          onClick={handleIsOpen}
          className={`bg-green-100 z-20 p-1 top-15 fixed min-w-[25%] rounded flex h-10 justify-start items-center gap-2 transition-all duration-500 hover:cursor-pointer 
        ${isOpen ? "right-0" : "sm:-right-66 -right-58"}`}
        >
          <img src="/iconCart.png" className="h-4 w-4" alt="" />
          Cart:
          <span>
            Total Items-<span>{totalItems}</span>
          </span>
          <span>
            Total Price-<span>{totalPrice}</span>
          </span>
        </div>
      </div>

      <div className="bg-gray-300 min-h-screen pt-26 pb-5">
        <p className="text-center font-semibold">Products List</p>
        <div className="mx-15  bg-gray-300  items-center mt-2 grid g sm:grid-cols-3 md:grid-cols-4 grid-cols-1 gap-2 z-10">
          {productList.map((item) => {
            return (
              <div
                key={item.id}
                className=" flex bg-gray-400 rounded-xl flex-col items-center justify-center"
              >
                <div className="text-center">
                  <Link to={`/product/${item.id}`}>
                    <img
                      src={item.image}
                      alt=""
                      className="h-[70%] w-[70%] inline-block object-contain"
                    />
                  </Link>
                </div>
                <div className="flex gap-2 sm:gap-6 mb-2">
                  <span>{item.productName}</span>
                  <span>
                    {item.added ? (
                      <button
                        onClick={() => handleRemoveFromCart(item.id)}
                        className="bg-gray-500 hover:cursor-pointer text-[60%] sm:text-[90%] px-1 rounded active:scale-95 active:translate-z-1"
                      >
                        Remove from Cart
                      </button>
                    ) : (
                      <button
                        onClick={() => handleAddToCart(item)}
                        className="bg-gray-500 hover:cursor-pointer text-[60%] sm:text-[90%] px-1  rounded active:scale-95 active:translate-z-1"
                      >
                        Add to Cart
                      </button>
                    )}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Home;
