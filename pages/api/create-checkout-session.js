import connectDb from "../../middleware/mongoose";
var CryptoJS = require("crypto-js");
const stripe = require("stripe")(`${process.env.NEXT_PUBLIC_SECRET_KEY}`);
import Order from "../../models/Order";

const handler = async (req, res) => {
  if (req.method == "POST") {
    let { products } = req.body;


    // --> FOR SAVING ORDER IN DATABASE
    const data = products.map((product) => {
        return {
            cart: product.cart,
            subTotal: product.subTotal,
            oid: product.oid,
            name: product.name,
            email: product.email,
            address: product.address,
            phone: product.phone,
            city: product.city,
            state: product.state,
        };
    })
    const order = new Order({
        name: data[0].name,
        email: data[0].email,
        orderId: data[0].oid,
        products: data[0].cart,
        address: data[0].address,
        amount: data[0].subTotal,
    });
    await order.save();


    // --> FOR SESSION ID PURPOSE 
    // Extract and map the products to the structure required by Stripe's API
    const lineItems = products.flatMap((productObj) => {
      // Extract cart object from each productObj
      const cart = productObj.cart;

      // Map each product inside the cart object
      return Object.keys(cart).map((productKey) => {
        const product = cart[productKey]; // Access each product object by its key

        return {
          price_data: {
            currency: "pkr", // Define your currency here
            product_data: {
              name: product.name, // Assuming the product has a name field
              description: `Size: ${product.size}, Variant: ${product.variant}`, // Add custom description based on size and variant
            },
            unit_amount: product.price * 100, // Stripe expects the amount in cents
          },
          quantity: product.qty, // Assuming product has a qty field
        };
      });
    });

    try {
      const session = await stripe.checkout.sessions.create({
        payment_method_types: ["card"],
        line_items: lineItems,
        mode: "payment",
        success_url: `http://localhost:3000/orderpage?orderId=${order.orderId}`, // Pass orderId in the URL
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
