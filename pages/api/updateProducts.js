import Product from "../../models/product";
import connectDb from "../../middleware/mongoose";

const handler = async (req, res) => {
  if (req.method == "POST") {
    let products = req.body;
    for (let i = 0; i < products.length; i++) {
      let product = await Product.findByIdAndUpdate(
        products[i]._id,
        products[i]
      );
    }
    res.status(200).json({ message: "Products updated successfully!" });
  } else {
    res.status(400).json({ message: "This method is not allowed!" });
  }
};

export default connectDb(handler);
