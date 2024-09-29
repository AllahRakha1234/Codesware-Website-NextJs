import connectDb from "../../middleware/mongoose";
var CryptoJS = require("crypto-js");
// Set your secret key. Remember to switch to your live secret key in production.
// See your keys here: https://dashboard.stripe.com/apikeys
const stripe = require("stripe")(`${process.env.NEXT_PUBLIC_SECRET_KEY}`);

const handler = async (req, res) => {
    if (req.method == "POST") {
      let { products } = req.body;
      console.log("products---------------", products);
  
      // Map the products to the structure required by Stripe's API
    //   const lineItems = products.map((product) => {
    //     return {
    //       price_data: {
    //         currency: "usd", // Define your currency here
    //         product_data: {
    //           name: product.name, // Assuming product has a name field
    //           description: product.description, // Assuming product has a description field
    //         },
    //         unit_amount: product.price * 100, // Stripe expects the amount in cents
    //       },
    //       quantity: product.quantity, // Assuming product has a quantity field
    //     };
    //   });

    const lineItems = [
        {
          price_data: {
            currency: 'usd',
            product_data: {
              name: 'Dummy Product 1',
              description: 'This is a test product',
            },
            unit_amount: 2000, // $20.00
          },
          quantity: 1, // 1 unit
        },
        {
          price_data: {
            currency: 'usd',
            product_data: {
              name: 'Dummy Product 2',
              description: 'Another test product',
            },
            unit_amount: 1500, // $15.00
          },
          quantity: 2, // 2 units
        }
      ];
      
  
      try {
        const session = await stripe.checkout.sessions.create({
          payment_method_types: ["card"],
          line_items: lineItems,
          mode: "payment",
          success_url: "http://localhost:3000/successpage",
          cancel_url: "http://localhost:3000/cancelpage",
        });
  
        res.status(200).json({ message: "Success!", session_id: session.id });
      } catch (error) {
        console.error("Error creating Stripe session:", error);
        res.status(500).json({ message: "Error creating Stripe session", error });
      }
    } else {
      res.status(400).json({ message: "This method is not allowed!" });
    }
  };
  
export default connectDb(handler);
