import connectDb from "../../middleware/mongoose";
import Order from "../../models/Order";
const stripe = require("stripe")(`${process.env.NEXT_PUBLIC_SECRET_KEY}`);

const handler = async (req, res) => {
  if (req.method === "POST") {
    const { sessionId } = req.body; // You pass sessionId from frontend

    try {
      // Retrieve the Stripe session using the sessionId
      const session = await stripe.checkout.sessions.retrieve(sessionId);

      if (session.payment_status === "paid") {
        // Find the order by the client_reference_id (orderId)
        let order = await Order.findOneAndUpdate(
          { orderId: session.client_reference_id }, // Matches orderId stored in Stripe session
          { status: "Paid" }, // Update order status to "Paid"
          { new: true } // Return the updated order
        );

        // Send success response with updated order details
        res.status(200).json({ message: "Order updated successfully", order });
      } else {
        res.status(400).json({ message: "Payment not successful!" });
      }
    } catch (error) {
      console.error("Error fetching session or updating order:", error);
      res.status(500).json({ message: "Internal server error", error });
    }
  } else {
    res.status(400).json({ message: "This method is not allowed!" });
  }
};

export default connectDb(handler);
