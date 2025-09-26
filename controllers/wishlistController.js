import User from "../models/User.js";
import Wishlist from "../models/Wishlist.js";

const addWishItem = async (req, res) => {
  try {
    const { id, userId } = req.params;
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ success: false, error: "User not found" });
    }

    const existingWish = await Wishlist.findOne({ userId, productId: id });

    if (existingWish) {
      await Wishlist.findByIdAndDelete(existingWish._id);

      user.wishlist = user.wishlist.filter(
        (wishId) => wishId.toString() !== existingWish._id.toString()
      );

      await user.save();

      return res.status(200).json({
        success: true,
        message: "Removed item from wishlist",
        action: "removed",
      });
    }

    const newWishItem = new Wishlist({
      userId,
      productId: id,
    });
    const savedWishItem = await newWishItem.save();

    user.wishlist.push(savedWishItem._id);
    await user.save();
    return res.status(200).json({
      success: true,
      message: "Added item to wishlist",
      action: "added",
    });
  } catch (error) {
    return res
      .status(500)
      .json({ success: false, error: "add WishItem server error" });
  }
};

const getWishItems = async (req, res) => {
  
  try {
    const { id } = req.params;
   

    const wishlist = await User.findById(id)
      .select("-password")
      .populate({
        path: "wishlist",
        populate: {
          path: "productId",
          select: "_id name description price productImage",
        },
      });
      

    if (!wishlist) {
      return res.status(404).json({ success: false, error: "User not found" });
    }

    return res.status(200).json({
      success: true,
      products: wishlist.wishlist,
    });
  } catch (error) {
    console.log(error);

    return res
      .status(500)
      .json({ success: false, error: "getting wishlist server error" });
  }
};

export { addWishItem, getWishItems };
