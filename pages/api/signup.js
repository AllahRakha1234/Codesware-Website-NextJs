import User from "../../models/User";
import connectDb from "../../middleware/mongoose";
var CryptoJS = require("crypto-js");

const handler = async (req, res) => {
  if (req.method == "POST") {
    let { name, email } = req.body;
    let user = new User({
      name,
      email,
      password: CryptoJS.AES.encrypt(req.body.password, "secret123").toString(),
    });
    await user.save();
    console.log(user);
    res.status(200).json({ message: "Success!" });
  } else {
    res.status(400).json({ message: "This method is not allowed!" });
  }
};

export default connectDb(handler);
