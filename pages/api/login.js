import User from "../../models/User";
import connectDb from "../../middleware/mongoose";
var CryptoJS = require("crypto-js");
var jwt = require("jsonwebtoken");

const handler = async (req, res) => {
  if (req.method == "POST") {
    let user = await User.findOne({ email: req.body.email });
    let bytes = CryptoJS.AES.decrypt(user.password, "secret123");
    let decryptedPass = JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
    if (user) {
      if (req.body.email == user.email && req.body.password == decryptedPass) {
        var token = jwt.sign(
          {
            name: user.name,
            email: user.email,
            password: user.password,
          },
          "jwt-secret-key",
          { expiresIn: "2d" }
        );
        res.status(200).json({
          success: true,
          token: token,
        });
      } else {
        res
          .status(200)
          .json({ success: false, error: "Invalid email or password!" });
      }
    } else {
      res.status(200).json({ success: false, error: "User not found!" });
    }
  } else {
    res.status(400).json({ message: "This method is not allowed!" });
  }
};

export default connectDb(handler);
