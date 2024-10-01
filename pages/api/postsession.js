import connectDb from "../../middleware/mongoose";
import Order from "../../models/Order";

const handler = async (req, res)=>{

    // UPDATING ORDER STATUS AFTER CHECKING TRANSACTION STATUS  
    let order = await Order.

}

export default connectDb(handler);