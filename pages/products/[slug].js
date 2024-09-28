import React, { useState } from "react";
import { useRouter } from "next/router";
import mongoose from "mongoose";
import Product from "../../models/Product";
import { ToastContainer, toast, Flip, Bounce } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Slug = ({ addToCart, product, variants, buyNow }) => {
  const router = useRouter();
  const { slug } = router.query;
  const [pin, setPin] = useState(" ");
  const [service, setService] = useState(null);

  const checkServiceAbility = async () => {
    const pincodes = await fetch(
      `${process.env.NEXT_PUBLIC_HOST}/api/pincodes`
    );
    const pinsJson = await pincodes.json();
    if (!pinsJson.includes(parseInt(pin))) {
      toast.error("Your pincode isn't serviceable.🤕", {
        position: "top-left",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        transition: Flip,
      });
      setService(false);
    } else {
      toast.success("Your pincode is serviceable.🤗", {
        position: "top-left",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        transtion: Flip,
      });
      setService(true);
      setPin(" ");
    }
  };

  const [color, setColor] = useState(product.color);
  const [size, setSize] = useState(product.size);

  const refreshVariant = (newSize, newColor) => {
    let url = `${process.env.NEXT_PUBLIC_HOST}/products/${variants[newColor][newSize]["slug"]}`;
    window.location = url;
  };

  const firstLetterCapital = (textString) => {
    return textString.charAt(0).toUpperCase() + textString.slice(1);
  };

  // RENDERING CODE
  return (
    <>
      <section className="text-gray-600 body-font overflow-hidden">
        <ToastContainer
          className={"mt-12"}
          position="top-left"
          autoClose={2000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="light"
          transition={Flip}
        />

        <div className="container px-5 py-8 mx-auto">
          <div className="lg:w-4/5 mx-auto flex flex-wrap">
            <img
              alt="ecommerce"
              className="slugImg shadow-2xl lg:w-1/2 w-full lg:h-auto object-fill object-top rounded p-16"
              src={product.img}
            />
            <div className="lg:w-1/2 w-full lg:pl-10 lg:py-6 mt-6 lg:mt-0">
              <h2 className="text-sm title-font text-gray-500 tracking-widest">
                CODESWARE
              </h2>
              <h1 className="text-gray-900 text-3xl title-font font-medium mb-1">
                {product.title} ({product.size}/
                {firstLetterCapital(product.color)})
              </h1>
              <p className="leading-relaxed">{product.desc}</p>
              <div className="colorBox flex mt-6 items-center pb-5 border-b-2 border-gray-100 mb-5">
                <div className="flex">
                  <span className="mr-3">Color</span>
                  {Object.keys(variants).includes("red") &&
                    Object.keys(variants["red"]).includes(size) && (
                      <button
                        className={`border-2 bg-red-600 rounded-full me-1 w-6 h-6 focus:outline-none ${
                          color === "red" ? "border-black" : "border-gray-300"
                        }`}
                        onClick={() => {
                          refreshVariant(size, "red");
                        }}
                      ></button>
                    )}
                  {Object.keys(variants).includes("green") &&
                    Object.keys(variants["green"]).includes(size) && (
                      <button
                        className={`border-2 bg-green-600 rounded-full me-1 w-6 h-6 focus:outline-none ${
                          color === "green" ? "border-black" : "border-gray-300"
                        }`}
                        onClick={() => {
                          refreshVariant(size, "green");
                        }}
                      ></button>
                    )}
                  {Object.keys(variants).includes("yellow") &&
                    Object.keys(variants["yellow"]).includes(size) && (
                      <button
                        className={`border-2 bg-yellow-600 rounded-full me-1 w-6 h-6 focus:outline-none ${
                          color === "yellow"
                            ? "border-black"
                            : "border-gray-300"
                        }`}
                        onClick={() => {
                          refreshVariant(size, "yellow");
                        }}
                      ></button>
                    )}
                  {Object.keys(variants).includes("white") &&
                    Object.keys(variants["white"]).includes(size) && (
                      <button
                        className={`border-2 bg-white rounded-full me-1 w-6 h-6 focus:outline-none ${
                          color === "white" ? "border-black" : "border-gray-300"
                        }`}
                        onClick={() => {
                          refreshVariant(size, "white");
                        }}
                      ></button>
                    )}
                  {Object.keys(variants).includes("black") &&
                    Object.keys(variants["black"]).includes(size) && (
                      <button
                        className={`border-2 bg-black rounded-full me-1 w-6 h-6 focus:outline-none ${
                          color === "black" ? "border-black" : "border-gray-300"
                        }`}
                        onClick={() => {
                          refreshVariant(size, "black");
                        }}
                      ></button>
                    )}
                  {Object.keys(variants).includes("purple") &&
                    Object.keys(variants["purple"]).includes(size) && (
                      <button
                        className={`border-2 bg-purple-600 rounded-full me-1 w-6 h-6 focus:outline-none ${
                          color === "purple"
                            ? "border-black"
                            : "border-gray-300"
                        }`}
                        onClick={() => {
                          refreshVariant(size, "purple");
                        }}
                      ></button>
                    )}
                </div>
                <div className="flex ml-6 items-center">
                  <span className="mr-3">Size</span>
                  <div className="relative">
                    <select
                      value={size}
                      onChange={(e) => {
                        refreshVariant(e.target.value, color);
                      }}
                      className="rounded border appearance-none border-gray-300 py-2 focus:outline-none focus:ring-2 focus:ring-pink-200 focus:border-pink-500 text-base pl-3 pr-10"
                    >
                      {Object.keys(variants[color]).includes("S") && (
                        <option>S</option>
                      )}
                      {Object.keys(variants[color]).includes("M") && (
                        <option>M</option>
                      )}
                      {Object.keys(variants[color]).includes("L") && (
                        <option>L</option>
                      )}
                      {Object.keys(variants[color]).includes("XL") && (
                        <option>XL</option>
                      )}
                      {Object.keys(variants[color]).includes("XXL") && (
                        <option>XXL</option>
                      )}
                    </select>
                    <span className="absolute right-0 top-0 h-full w-10 text-center text-gray-600 pointer-events-none flex items-center justify-center">
                      <svg
                        fill="none"
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        className="w-4 h-4"
                        viewBox="0 0 24 24"
                      >
                        <path d="M6 9l6 6 6-6"></path>
                      </svg>
                    </span>
                  </div>
                </div>
              </div>
              <div className="flex slugPageBtns">
                <span className="slugPrice title-font font-medium text-2xl text-gray-900">
                  Rs. {product.price}
                </span>
                <button
                  className="addToCartBtn flex mr-2 ml-auto text-white bg-pink-500 border-0 py-2 px-4 focus:outline-none hover:bg-pink-600 rounded"
                  onClick={() => {
                    addToCart(
                      product.slug,
                      1,
                      product.price,
                      product.title,
                      product.size,
                      firstLetterCapital(product.color)
                    );
                  }}
                >
                  Add to Cart
                </button>
                <button
                  onClick={() => {
                    buyNow(
                      product.slug,
                      1,
                      product.price,
                      product.title,
                      product.size,
                      firstLetterCapital(product.color)
                    );
                  }}
                  className="checkBtn text-white bg-pink-500 border-0 py-2 px-4 focus:outline-none hover:bg-pink-600 rounded"
                >
                  Buy Now
                </button>
              </div>
              <div className="pinBox mt-4">
                <input
                  onChange={(e) => setPin(e.target.value)}
                  className="pinInput p-2 border-2 mr-24 border-pink-300 h-[40px] w-[210px] rounded-e-md"
                  placeholder="Enter pincode"
                  type="text"
                />
                <button
                  onClick={() => checkServiceAbility()}
                  className="checkBtn text-white bg-pink-500 border-0 py-2 px-4 focus:outline-none hover:bg-pink-600 rounded"
                >
                  Check
                </button>
              </div>
              {service && service != null && (
                <div className="text-green-500 mt-2 text-sm font-bold">
                  <p>Service is Available ! </p>
                </div>
              )}
              {!service && service != null && (
                <div className="text-red-500 mt-2 text-sm font-bold">
                  <p>This pincode is not serviceable yet ! </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

// ******* THIS IS USING DIRECTLY THE MONGOOSE MODEL AND DB ********
export async function getServerSideProps(context) {
  if (!mongoose.connections[0].readyState) {
    await mongoose.connect(process.env.MONGO_URI);
  }
  let slug = context.query.slug;
  let product = await Product.findOne({ slug: slug }); // findOne AND find HAS SEPARATE RESULTS HERE SO USE CAREFULLY
  let variants = await Product.find({
    title: product.title,
    category: product.category,
  });
  let colorSizeSlug = {}; // {color: {xl: {slug: slugUrl}}}
  for (let item of variants) {
    if (Object.keys(colorSizeSlug).includes(item.color)) {
      colorSizeSlug[item.color][item.size] = { slug: item.slug };
    } else {
      colorSizeSlug[item.color] = {};
      colorSizeSlug[item.color][item.size] = { slug: item.slug };
    }
  }
  return {
    props: {
      product: JSON.parse(JSON.stringify(product)),
      variants: JSON.parse(JSON.stringify(colorSizeSlug)),
    },
  };
}

export default Slug;
