import connectDb from "../../middleware/mongoose";
var CryptoJS = require("crypto-js");
const stripe = require("stripe")(`${process.env.NEXT_PUBLIC_SECRET_KEY}`);
import Order from "../../models/Order";

const handler = async (req, res) => {
  if (req.method == "POST") {
    let { products } = req.body;

    // Create your order in the database
    const data = products.map((product) => ({
      cart: product.cart,
      subTotal: product.subTotal,
      oid: product.oid,
      name: product.name,
      email: product.email,
      address: product.address,
      phone: product.phone,
      city: product.city,
      state: product.state,
    }));
    const order = new Order({
      email: data[0].email,
      orderId: data[0].oid, // <-- This will be used later in post-session
      products: data[0].cart,
      address: data[0].address,
      amount: data[0].subTotal,
      status: "Pending", // Initial status
    });
    await order.save();

    // Extract and map the products to the structure required by Stripe's API
    const lineItems = products.flatMap((productObj) => {
      const cart = productObj.cart;
      return Object.keys(cart).map((productKey) => {
        const product = cart[productKey];
        return {
          price_data: {
            currency: "pkr",
            product_data: {
              name: product.name,
              description: `Size: ${product.size}, Variant: ${product.variant}`,
            },
            unit_amount: product.price * 100,
          },
          quantity: product.qty,
        };
      });
    });

    try {
      const session = await stripe.checkout.sessions.create({
        payment_method_types: ["card"],
        line_items: lineItems,
        mode: "payment",
        success_url: "http://localhost:3000/successpage",
        cancel_url: "http://localhost:3000/cancelpage",
        client_reference_id: order.orderId, // <-- Attach the orderId to session
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
