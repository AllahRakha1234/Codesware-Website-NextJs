import React, { useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { BsFillCartPlusFill } from "react-icons/bs";
import { BsFillBagCheckFill } from "react-icons/bs";
import { AiOutlineClear } from "react-icons/ai";
import { MdAccountCircle } from "react-icons/md";
import { RiLoginCircleFill } from "react-icons/ri";

import {
  AiFillCloseCircle,
  AiFillPlusCircle,
  AiFillMinusCircle,
} from "react-icons/ai";

const Navbar = ({
  user,
  logoutFunc,
  cart,
  addToCart,
  removeFromCart,
  clearCart,
  subTotal,
}) => {
  const ref = useRef(); // FOR DOM MANIPULATION
  const [dropdown, setDropdown] = useState(false);

  const toggleCart = () => {
    if (ref.current.classList.contains("translate-x-full")) {
      ref.current.classList.remove("translate-x-full");
      ref.current.classList.add("translate-x-0");
    } else if (ref.current.classList.contains("translate-x-0")) {
      ref.current.classList.remove("translate-x-0");
      ref.current.classList.add("translate-x-full");
    }
  };

  // Function to handle click outside of cart
  // const handleClickOutside = (event) => {
  //   if (ref.current) {
  //     const cartElement = ref.current;
  //     if (
  //       !cartElement.contains(event.target) &&
  //       !event.target.classList.contains("cartBtn")
  //     ) {
  //       const isCartOpen = cartElement.classList.contains("translate-x-0");
  //       if (isCartOpen) {
  //         toggleCart();
  //       }
  //     }
  //   }
  // };

  // Attach event listener when component mounts
  // useEffect(() => {
  //   document.addEventListener("mousedown", handleClickOutside);
  //   return () => {
  //     document.removeEventListener("mousedown", handleClickOutside);
  //   };
  // }, []);

  // RENDERING CODE
  return (
    <>
      <div className="navbar flex flex-row justify-between shadow-xl lg:flex-row sticky top-0 bg-white">
        <div className="webTitleMenuOptionBox flex items-center flex-col ms-[16vw] sm:ms-24 md:ms-24 lg:flex-row">
          <div className="titleLogoBox flex items-center lg:flex-row">
            <Link href="/">
              <Image
                src="/assets/images/logo1.png"
                alt="titleLogo"
                className="titleImg w-[70vw] h-[12vh] lg:w-[30vw] lg:h-[10vh]"
                width={1000}
                height={1000}
              />
            </Link>
          </div>
          <div className="menuoptions">
            <ul className="flex items-center flex-row space-x-1">
              <li>
                <Link
                  href="/tshirtspage"
                  className="menuOption text-2xl font-bold p-1  hover:text-pink-700 hover:rounded-lg hover:p-1"
                >
                  Tshirts
                </Link>
              </li>
              <li>
                <Link
                  href="/hoddiespage"
                  className="menuOption text-2xl font-bold p-1  hover:text-pink-700 hover:rounded-lg hover:p-1"
                >
                  {" "}
                  Hoodies{" "}
                </Link>
              </li>
              <li>
                <Link
                  href="/stickerspage"
                  className="menuOption text-2xl font-bold p-1  hover:text-pink-700 hover:rounded-lg hover:p-1"
                >
                  {" "}
                  Stickers{" "}
                </Link>
              </li>
              <li>
                <Link
                  href="/mugspage"
                  className="menuOption text-2xl font-bold p-1  hover:text-pink-700  hover:rounded-lg hover:p-1"
                >
                  {" "}
                  Mugs{" "}
                </Link>
              </li>
            </ul>
          </div>
        </div>
        <div className="cartLoginBtnBox flex mt-5 md:mt-16 lg:my-1 lg:mx-1">
          <div className="loginContainer">
            <span
              href=""
              onMouseOver={() => {
                setDropdown(true);
              }}
              onMouseLeave={() => {
                setDropdown(false);
              }}
            >
              {dropdown && (
                <div
                  className="accountOptionsBox absolute w-36 right-20 top-12 border-2 border-gray-500 
          bg-white rounded-lg p-3"
                  onMouseOver={() => {
                    setDropdown(true);
                  }}
                  onMouseLeave={() => {
                    setDropdown(false);
                  }}
                >
                  <ul>
                    <Link href={"/myaccountpage"}>
                      <li className="font-bold hover:text-pink-700 cursor-pointer">
                        My Account
                      </li>
                    </Link>
                    <Link href={"/orderspage"}>
                      <li className="font-bold hover:text-pink-700 cursor-pointer">
                        Orders
                      </li>
                    </Link>
                    <li
                      onClick={logoutFunc}
                      className="font-bold hover:text-pink-700 cursor-pointer"
                    >
                      Logout
                    </li>
                  </ul>
                </div>
              )}
              {user.value && (
                <MdAccountCircle
                  onClick={(e) => {
                    e.preventDefault();
                    setDropdown(true);
                  }}
                  className="cartBtn text-5xl py-1 px-2 rounded-m hover:text-pink-700 hover:py-1 hover:px-1 lg:text-5xl md:mt-[-10vh] lg:mt-2 lg:py-0 lg:px-1"
                />
              )}
            </span>
            {!user.value && (
              <Link href={"/loginpage"}>
                <RiLoginCircleFill className="loginBtn text-5xl py-1 px-2 rounded-m hover:text-pink-700 hover:py-1 hover:px-1 lg:text-5xl md:mt-[-10vh] lg:mt-2 lg:py-0 lg:px-1" />
              </Link>
            )}
          </div>
          <BsFillCartPlusFill
            onClick={toggleCart}
            className="cartBtn text-5xl py-1 px-2 rounded-m hover:text-pink-700 hover:py-1 hover:px-1 lg:text-5xl 
            md:mt-[-10vh] lg:mt-2 lg:py-0 lg:px-1"
          />
        </div>
      </div>

      {/* CARTBOX CODE LOGIC */}
      <div
        ref={ref}
        className="cartBox overflow-y-scroll fixed top-0 right-0 bg-pink-200 h-[100vh] w-[25vw] p-3 transform translate-x-full 
        lg:w-[25vw] md:w-[40vw] sm:w-[50vw] transition duration-500 ease-in-out"
      >
        <AiFillCloseCircle
          onClick={toggleCart}
          className="absolute top-2 right-2 menuOption text-2xl hover:text-pink-600 text-pink-500"
        />
        <h1 className="font-bold menuOption text-2xl pt-4 text-center">
          Shoping Cart
        </h1>
        <ol className="list-decimal mt-3 font-bold">
          {/* LOGIC TO DISPLAY THE CART ITEMS */}
          {Object.keys(cart).length == 0 && (
            <div className="text-center">Nothing in the cart! 😢</div>
          )}
          {Object.keys(cart).map((key) => {
            return (
              <li className="ml-5" key={key}>
                <div className="flex my-2">
                  <div className="item text-md w-2/3 break-words">
                    {cart[key].name} ({cart[key].size},{cart[key].variant})
                  </div>
                  <div className="quantity flex ml-3 justify-center items-center">
                    <AiFillMinusCircle
                      onClick={() => {
                        removeFromCart(
                          key,
                          1,
                          cart[key].price,
                          cart[key].name,
                          cart[key].size,
                          cart[key].variant
                        );
                      }}
                      className="text-pink-500 text-xl hover:text-pink-600"
                    />
                    <p className="mx-1">{cart[key].qty}</p>{" "}
                    <AiFillPlusCircle
                      onClick={() => {
                        addToCart(
                          key,
                          1,
                          cart[key].name,
                          cart[key].price,
                          cart[key].size,
                          cart[key].variant
                        );
                      }}
                      className="text-pink-500 text-xl hover:text-pink-600"
                    />{" "}
                  </div>
                </div>
              </li>
            );
          })}
        </ol>
        <div className="mt-[5vh]">
          <p className="font-bold text-lg ">SubTotal: {subTotal}</p>
        </div>
        <div className="flex mt-[1vh]">
          <Link href={"/checkoutpage"}>
            <button className="mr-1 flex-shrink-0 inline-flex text-white bg-pink-500 border-0 py-1 px-1 focus:outline-none hover:bg-pink-600 rounded">
              <BsFillBagCheckFill className="mt-1 mr-1" /> Checkout
            </button>
          </Link>
          <button
            onClick={() => {
              clearCart();
            }}
            className="flex-shrink-0 inline-flex text-white bg-pink-500 border-0 py-1 px-1 focus:outline-none hover:bg-pink-600 rounded"
          >
            <AiOutlineClear className="mt-1 mr-1" /> Clear Cart
          </button>
        </div>
      </div>
    </>
  );
};

export default Navbar;
