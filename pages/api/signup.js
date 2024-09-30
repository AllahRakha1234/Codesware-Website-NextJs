import User from "../../models/User";
import connectDb from "../../middleware/mongoose";
var CryptoJS = require("crypto-js");

const handler = async (req, res) => {
  if (req.method == "POST") {
    let { name, email } = req.body;
    // Access the AES secret key from environment variables
    const secretKey = process.env.AES_SECRET_KEY;
    let user = new User({
      name,
      email,
      password: CryptoJS.AES.encrypt(req.body.password, secretKey).toString(),
    });
    await user.save();
    console.log(user);
    res.status(200).json({ message: "Success!" });
  } else {
    res.status(400).json({ message: "This method is not allowed!" });
  }
};

export default connectDb(handler);
