import path from "path";
import Order from "../models/Order.js";
import User from "../models/User.js";

const order = async (req, res) => {
  try {
    const { productId, userId } = req.params;
    const { fullName, phone, street, city, state, pincode } = req.body;

    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ success: false, error: "User not found" });
    }

    const newOrder = new Order({
      userId,
      productId,
      fullName,
      phone,
      street,
      city,
      state,
      pincode,
    });

    const savedOrder = await newOrder.save();

    user.orders.push(savedOrder._id);
    await user.save();

    return res.status(201).json({
      success: true,
      message: "Order placed successfully",
    });
  } catch (error) {
    return res
      .status(500)
      .json({ success: false, error: "order server error" });
  }
};

const getOrders = async (req, res) => {
  try {
    const orders = await Order.find()
      .populate("productId", " name price productImage")
      .populate("userId", "name email");

    if (!orders) {
      return res.status(404).json({ success: false, error: "Order not found" });
    }

    return res.status(200).json({ success: true, orders });
  } catch (error) {
    return res
      .status(500)
      .json({ success: false, error: "getting orders server error" });
  }
};

const getOrder = async (req, res) => {
  try {
    const { id } = req.params;
    const order = await Order.findById(id)
      .populate("productId", " name price productImage description")
      .populate("userId", "name email");

    return res.status(200).json({ success: true, order });
  } catch (error) {
    return res
      .status(500)
      .json({ success: false, error: "getting orders server error" });
  }
};

const getUserOrder = async (req, res) => {
  try {
    const { id } = req.params;
   
    const orders = await User.findById(id).select('-password').populate({
      path: "orders",
      select:
        "fullName phone street city state pincode status createdAt updatedAt",
      populate: {
        path: "productId",
        select: "_id name description price productImage",
      },
    });
    
    if (!orders) {
      return res.status(404).json({ success: false, error: "User not found" });
    }

    return res.status(200).json({
      success: true,
      orders: orders.orders,
    });

  } catch (error) {
   
    return res
      .status(500)
      .json({ success: false, error: "getting user orders server error" });
  }
};

const updateStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const order = await Order.findByIdAndUpdate(
      { _id: id },
      { status: req.body.status }
    );

    if (!order) {
      return res.status(404).json({ success: false, error: "Order not found" });
    }

    return res
      .status(200)
      .json({ success: true, message: "Order update successfully" });
  } catch (error) {
    return res
      .status(500)
      .json({ success: false, error: "getting orders server error" });
  }
};

const cancelOrder = async (req,res) => {
  try {
    const { id } = req.params;
    const order = await Order.findByIdAndUpdate(
      { _id: id },
      { status: "cancelled" }
    );

    if (!order) {
      return res.status(404).json({ success: false, error: "Order not found" });
    }

    return res
      .status(200)
      .json({ success: true, message: "Order cancel successfully" });
  } catch (error) {
    console.log(error,'hi');
    
    return res
      .status(500)
      .json({ success: false, error: "Cancel order server error" });
  }
}

export { order, getOrders, getOrder, updateStatus ,getUserOrder ,cancelOrder};
