import mongoose from "mongoose";
const { Schema } = mongoose;

const OrderSchema = new Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true },
    orderId: { type: String, required: true },
    paymentInfo: { type: String, default: "" },
    products: {type : Object, required: true},
    address: { type: String, required: true },
    amount: { type: Number, required: true },
    status: { type: String, default: "pending", required: true },
  },
  { timestamps: true }
);
mongoose.models = {};
export default mongoose.model("Order", OrderSchema);
