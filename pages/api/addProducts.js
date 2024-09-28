import Product from "../../models/Product";
import connectDb from "../../middleware/mongoose";

const handler = async (req, res) => {
  if (req.method == "POST") {
    let products = req.body;
    for (let i = 0; i < products.length; i++) {
      let product = products[i];
      let newProduct = new Product(product);
      await newProduct.save();
    }
    res.status(200).json({ message: "Products added successfully!" });
  } else {
    res.status(400).json({ message: "This method is not allowed!" });
  }
};

export default connectDb(handler);
