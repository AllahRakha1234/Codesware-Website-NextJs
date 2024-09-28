import React from "react";
import Link from "next/link";
import mongoose from "mongoose";
import Product from "../models/Product";

const Stickerspage = ({ products }) => {
  return (
    <>
      <section className="text-gray-600 body-font">
        <div className="container px-5 py-20">
          <div className="flex flex-wrap justify-center md:ml-[8vw] lg:ml-[1vw]">
            {Object.values(products).length === 0 && (
              <h1 className="text-3xl">
                No products available in stock. Please wait.{" "}
              </h1>
            )}
            {Object.values(products).map((item) => {
              return (
                <Link
                  key={item._id}
                  href={`/products/${item.slug}`}
                  className="tshirtBox lg:w-1/4 md:w-1/2 sm:w-4/5 ml-12 mb-12 p-4 shadow-2xl"
                >
                  <img
                    alt="ecommerce"
                    className="object-top mx-auto h-[45vh] block"
                    src={item.img}
                  />
                  <div className="mt-4">
                    <h3 className="text-gray-500 text-xs tracking-widest title-font mb-1">
                      Hoodie
                    </h3>
                    <h2 className="text-gray-900 title-font text-lg font-medium">
                      {item.title}
                    </h2>
                    <p className="font-semibold">Rs. {item.price}</p>
                    <div className="sizeBox mt-1">
                      {item.size.includes("S") && (
                        <span className="border border-gray-400 px-1 me-1">
                          S
                        </span>
                      )}
                      {item.size.includes("M") && (
                        <span className="border border-gray-400 px-1 me-1">
                          M
                        </span>
                      )}
                      {item.size.includes("L") && (
                        <span className="border border-gray-400 px-1 me-1">
                          L
                        </span>
                      )}
                      {item.size.includes("XL") && (
                        <span className="border border-gray-400 px-1 me-1">
                          XL
                        </span>
                      )}
                      {item.size.includes("XXL") && (
                        <span className="border border-gray-400 px-1 me-1">
                          XXL
                        </span>
                      )}
                    </div>
                    <div className="colorBox flex">
                      {item.color.includes("red") && (
                        <button className="border-1 border-gray-400 bg-red-600 me-1 mt-2 rounded-full w-6 h-6 focus:outline-none"></button>
                      )}
                      {item.color.includes("green") && (
                        <button className="border-1 border-gray-400 bg-green-600 me-1 mt-2 rounded-full w-6 h-6 focus:outline-none"></button>
                      )}
                      {item.color.includes("yellow") && (
                        <button className="border-1 border-gray-400 bg-yellow-400 me-1 mt-2 rounded-full w-6 h-6 focus:outline-none"></button>
                      )}
                      {item.color.includes("white") && (
                        <button className="border-2 border-gray-400 bg-white me-1 mt-2 rounded-full w-6 h-6 focus:outline-none"></button>
                      )}
                      {item.color.includes("black") && (
                        <button className="border-1 border-gray-400 bg-black me-1 mt-2 rounded-full w-6 h-6 focus:outline-none"></button>
                      )}
                      {item.color.includes("purple") && (
                        <button className="border-1 border-gray-400 bg-purple-600 me-1 mt-2 rounded-full w-6 h-6 focus:outline-none"></button>
                      )}
                    </div>
                  </div>
                </Link>
              );
            })}
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
  let products = await Product.find({ category: "sticker" });
  let hoodies = {};
  for (let item of products) {
    if (item.title in hoodies) {
      if (
        !hoodies[item.title].color.includes(item.color) &&
        item.availableQty > 0
      ) {
        hoodies[item.title].color.push(item.color);
      }
      if (
        !hoodies[item.title].size.includes(item.size) &&
        item.availableQty > 0
      ) {
        hoodies[item.title].size.push(item.size);
      }
    } else {
      hoodies[item.title] = JSON.parse(JSON.stringify(item));
      if (item.availableQty > 0) {
        hoodies[item.title].color = [item.color];
        hoodies[item.title].size = [item.size];
      }
    }
  }
  return {
    props: { products: JSON.parse(JSON.stringify(hoodies)) },
  };
}

export default Stickerspage;
