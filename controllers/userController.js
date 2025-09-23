import User from "../models/User.js";
import bcrypt from "bcrypt";

const getUsers = async (req, res) => {
  try {
    const users = await User.find().select("-password");

    return res.status(200).json({ success: true, users });
  } catch (error) {
    return res
      .status(500)
      .json({ success: false, error: "server error getting users" });
  }
};

const getUser = async (req, res) => {
  const { id } = req.params;
  try {
    const user = await User.findById({ _id: id }).select("-password");

    return res.status(200).json({ success: true, user });
  } catch (error) {
    return res
      .status(500)
      .json({ success: false, error: "server error getting user" });
  }
};

const updateUser = async (req, res) => {
  try {
    const { id } = req.params;

    const { name, email, oldPassword, newPassword } = req.body;

    const user = await User.findById({ _id: id });

    if (!user) {
      return res.status(404).json({ success: false, error: "User not found" });
    }

    user.name = name;
    user.email = email;

    if (oldPassword && newPassword) {
      const isMatch = await bcrypt.compare(oldPassword, user.password);
      if (!isMatch) {
        return res
          .status(400)
          .json({ success: false, error: "Old password is incorrect" });
      }
      const isSame = await bcrypt.compare(newPassword, user.password);
      if (isSame) {
        return res.status(400).json({
          success: false,
          error: "New password cannot be the same as old password",
        });
      }
      user.password = await bcrypt.hash(newPassword, 10);
    }

    await user.save();

    return res
      .status(200)
      .json({ success: true, message: "Updated User Successfully" });
  } catch (error) {
    return res
      .status(500)
      .json({ success: false, error: "server error updating user" });
  }
};

const deleteUser = async (req, res) => {
  try {
    const { id } = req.params;

    const deleteUser = await User.findByIdAndDelete({ _id: id });

    await deleteUser.deleteOne();

    return res
      .status(200)
      .json({ success: true, message: "Deleted User Successfully" });
  } catch (error) {
    return res
      .status(500)
      .json({ success: false, error: "server error updating user" });
  }
};

export { getUsers, getUser, updateUser, deleteUser };
