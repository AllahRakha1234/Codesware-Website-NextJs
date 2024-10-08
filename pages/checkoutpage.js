import React, {useState} from "react";
import Link from "next/link";
import { BsFillBagCheckFill } from "react-icons/bs";
import { FaCcAmazonPay } from "react-icons/fa";
import { AiFillPlusCircle, AiFillMinusCircle } from "react-icons/ai";
import {checkout} from "../utils/checkout";

const Checkout = ({ cart, addToCart, removeFromCart, clearCart, subTotal }) => {


  const [name, setName] = useState("1234")
  const [email, setEmail] = useState("1234")
  const [address, setAddress] = useState("1234")
  const [phone, setPhone] = useState("1234")
  const [pincode, setPincode] = useState("1234")
  const [city, setCity] = useState("city")
  const [state, setState] = useState("state")
  const [payDisable, setPayDisable] = useState(true)



  const handleChange = (e)=>{
    const {name, value} = e.target
    if(name == "name"){
      setName(value)
    }else if(name == "email"){
      setEmail(value)
    }else if(name == "address"){
      setAddress(value)
    }else if(name == "phone"){
      setPhone(value)
    }else if(name == "pincode"){
      setPincode(value)
    }
    if(name.length > 3 && email.length > 3 && address.length > 3 && phone.length > 3 && pincode.length > 3){
      setPayDisable(false)
    }
    else{
      setPayDisable(true)
    }
  }

  // FUNCITON TO HANDLE PAY NOW BUTTON CLICK
  const handlePayNowBtnClick = () => {
      let oid = Math.floor(Math.random() * Date.now())
      checkout({
        lineItems: [
          { cart: cart, subTotal: subTotal, oid:oid, name:name, email:email, address:address, phone:phone, city:city, state:state },
        ],
      });
    
  }

  // RETURNING THE JSX
  return (
    <div className="container m-auto my-12 p-4">
      <h2 className="text-3xl font-bold text-center my-8">Checkout</h2>
      <h3 className="text-xl font-bold my-3">1. Delivery Details</h3>
      <div className="nameEmailBox mx-auto my-2 w-5/6 flex justify-between">
        <div className="w-2/5">
          <label
            htmlFor="name"
            className="leading-7 text-md font-bold text-black-600"
          >
            Name
          </label>
          <br />
          <input
            type="text"
            id="name"
            name="name"
            value={name}
            onChange={handleChange}
            className="w-full bg-white rounded border border-gray-300 focus:border-pink-500 focus:ring-2 focus:ring-pink-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
          />
        </div>
        <div className="w-2/5">
          <label
            htmlFor="email"
            className="leading-7 text-md font-bold text-black-600"
          >
            Email
          </label>
          <br />
          <input
            type="email"
            id="email"
            name="email"
            value={email}
            onChange={handleChange}
            className="w-full bg-white rounded border border-gray-300 focus:border-pink-500 focus:ring-2 focus:ring-pink-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
          />
        </div>
      </div>

      <div className="addressBox mx-auto my-2 w-5/6">
        <div className="w-full">
          <label
            htmlFor="name"
            className="leading-7 text-md font-bold text-black-600"
          >
            Address
          </label>
          <br />
          <textarea
            name="address"
            id="address"
            cols="30"
            rows="2"
            value={address}
            onChange={handleChange}
            className="w-full bg-white rounded border border-gray-300 focus:border-pink-500 focus:ring-2 focus:ring-pink-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
          ></textarea>
        </div>
      </div>

      <div className="phoneCityBox mx-auto my-2 w-5/6 flex justify-between">
        <div className="w-2/5">
          <label
            htmlFor="phone"
            className="leading-7 text-md font-bold text-black-600"
          >
            Phone
          </label>
          <br />
          <input
            type="phone"
            id="phone"
            name="phone"
            value={phone}
            onChange={handleChange}
            className="w-full bg-white rounded border border-gray-300 focus:border-pink-500 focus:ring-2 focus:ring-pink-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
          />
        </div>
        <div className="w-2/5">
          <label
            htmlFor="pincode"
            className="leading-7 text-md font-bold text-black-600"
          >
            Pincode
          </label>
          <br />
          <input
            type="text"
            id="pincode"
            name="pincode"
            value={pincode}
            onChange={handleChange}
            className="w-full bg-white rounded border border-gray-300 focus:border-pink-500 focus:ring-2 focus:ring-pink-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
          />
        </div>
        
      </div>

      <div className="phoneCityBox mx-auto my-2 w-5/6 flex justify-between">
        <div className="w-2/5">
          <label
            htmlFor="state"
            className="leading-7 text-md font-bold text-black-600"
          >
            State
          </label>
          <br />
          <input
            type="text"
            id="state"
            name="state"
            value = {state}
            className="w-full bg-white rounded border border-gray-300 focus:border-pink-500 focus:ring-2 focus:ring-pink-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" readOnly={true}
          />
        </div>

        <div className="w-2/5">
          <label
            htmlFor="city"
            className="leading-7 text-md font-bold text-black-600"
          >
            City
          </label>
          <br />
          <input
            type="text"
            id="city"
            name="city"
            value = {city}
            className="w-full bg-white rounded border border-gray-300 focus:border-pink-500 focus:ring-2 focus:ring-pink-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" readOnly
          />
        </div>
       
      </div>
      

      <h3 className="text-xl font-bold my-3">2. Review Cart Items</h3>

      <div className="container bg-pink-100 w-[90vw] mx-auto p-3 lg:w-5/6 md:w-[90vw] sm:w-[90vw]">
        <ol className="list-decimal mt-3 font-bold">
          {/* LOGIC TO DISPLAY THE CART ITEMS */}
          {Object.keys(cart).length == 0 && (
            <div className="text-center">Nothing in the cart! 😢</div>
          )}
          {Object.keys(cart).map((key) => {
            return (
              <li className="ml-5" key={key}>
                <div className="flex my-2">
                  <div className="item w-2/3 break-words">
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
          <p className="font-bold text-lg ">SubTotal: {subTotal} Rs</p>
        </div>
        <div className="flex my-2">
          <Link href={"/checkoutpage"}>
            <button className="mr-1 flex-shrink-0 inline-flex text-white bg-pink-500 border-0 py-1 px-2 focus:outline-none hover:bg-pink-600 rounded"
            onClick={() => handlePayNowBtnClick()}
            disabled={payDisable}
            >
              <FaCcAmazonPay className="mt-1 mr-1 text-lg" /> Pay Now
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
