import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";

const Orderpage = () => {
  const router = useRouter();
  const { orderId } = router.query; // Extract orderId from URL
  const [orderDetails, setOrderDetails] = useState({ products: {} }); // Initialize as an empty object

  useEffect(() => {
    if (orderId) {
      // Fetch order details from the backend
      const fetchOrderDetails = async () => {
        try {
          const response = await fetch(`${process.env.NEXT_PUBLIC_HOST}/api/${orderId}`); // Update this with your API endpoint
          const data = await response.json();
          console.log(data); // Log the response data to inspect its structure
          setOrderDetails(data.order); // Update to match the structure returned by your API
        } catch (error) {
          console.error("Error fetching order details:", error);
        }
      };

      fetchOrderDetails();
    }
  }, [orderId]);

  // RETURN JSX
  return (
    <section className="text-gray-600 body-font overflow-hidden">
      <div className="container px-5 py-24 mx-auto">
        <div className="lg:w-4/5 mx-auto flex flex-wrap">
          <div className="lg:w-1/2 w-full lg:pr-10 lg:py-6 mb-6 lg:mb-0">
            <h2 className="text-sm title-font text-gray-500 tracking-widest">CODESWARE.COM</h2>
            {orderDetails ? (
              <>
                <h1 className="text-gray-900 text-3xl title-font font-medium mb-1">
                  Order ID: #{orderDetails.orderId}
                </h1>
                <p className="leading-relaxed mb-4">
                  Your order has been placed successfully. ✅
                </p>
                <div className="flex mb-4">
                  <span className="flex-grow py-2 text-lg font-semibold">Item Description</span>
                  <span className="flex-grow border-l border-gray-300 py-2 text-lg font-semibold text-center">Quantity</span>
                  <span className="flex-grow border-l border-gray-300 py-2 text-lg font-semibold text-center">Item Total</span>
                </div>
                {orderDetails.products && Object.keys(orderDetails.products).length > 0 ? (
                  Object.entries(orderDetails.products).map(([key, product], index) => (
                    <div key={index} className="flex border-t border-gray-200 py-2">
                      <div className="flex-grow">
                        <span className="text-gray-500">
                          {product.name} ({product.size}/{product.variant})
                        </span>
                      </div>
                      <div className="flex-grow text-center">
                        <span className="text-gray-900">{product.qty}</span>
                      </div>
                      <div className="flex-grow text-center">
                        <span className="text-gray-900">Rs {product.price * product.qty}</span>
                      </div>
                    </div>
                  ))
                ) : (
                  <p className="text-gray-500">No products found in this order.</p>
                )}
                <div className="flex border-t border-gray-200 py-4 mt-4">
                  <span className="title-font font-medium text-2xl text-gray-900">Total Amount:</span>
                  <span className="ml-auto text-2xl text-gray-900">Rs {orderDetails.amount}</span>
                </div>
                <div className="flex mt-4">
                  <button className="flex ml-auto text-white bg-pink-500 border-0 py-2 px-4 focus:outline-none hover:bg-pink-600 rounded">
                    Track Order
                  </button>
                </div>
              </>
            ) : (
              <p className="text-gray-500">Loading order details...</p>
            )}
          </div>
          <img
            alt="ecommerce"
            className="lg:w-1/2 w-full lg:h-auto h-64 object-cover object-center rounded"
            src="https://dummyimage.com/400x400"
          />
        </div>
      </div>
    </section>
  );
};

export default Orderpage;
