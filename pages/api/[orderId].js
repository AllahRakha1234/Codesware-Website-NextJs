import connectDb from "../../middleware/mongoose"; // Adjust the path based on your project structure
import Order from "../../models/Order";

const handler = async (req, res) => {
  if (req.method === "GET") {
    const { orderId } = req.query; // Extract orderId from the query

    try {
      const order = await Order.findOne({ orderId: orderId });
      if (!order) {
        return res.status(404).json({ message: "Order not found" });
      }
      console.log("order insdie order: ",order)
      res.status(200).json({ order });
    } catch (error) {
      console.error("Error fetching order:", error);
      res.status(500).json({ message: "Error fetching order" });
    }
  } else {
    res.status(400).json({ message: "This method is not allowed!" });
  }
};

export default connectDb(handler);
