import User from "../models/user.model.js";
import bcrypt from "bcryptjs";
import uploadImage from "../services/cloudinary.service.js";

export const getProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select(
      "-password -verificationToken -verificationTokenExpiry -resetPasswordToken -resetPasswordTokenExpiry",
    );
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    return res.json({ user });
  } catch (err) {
    return res.status(500).json({ message: "Server error" });
  }
};

export const updateProfile = async (req, res) => {
  const { username, email } = req.body;

  try {
    const user = await User.findById(req.user.id);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    if (email) {
      const emailExist = await User.findOne({
        email,
        _id: { $ne: req.user.id },
      });
      if (emailExist) {
        return res.status(400).json({ message: "Email already in use" });
      }
    }

    if (req.file) {
      const result = await uploadImage(req.file.buffer);

      user.avatar = {
        public_id: result.public_id,
        url: result.secure_url,
      };
    }

    if (username) user.username = username;
    if (email) user.email = email;
    await user.save();

    return res.json({
      message: "Profile updated successfully",
      user: {
        id: user._id,
        username: user.username,
        email: user.email,
        avatar: user.avatar,
        role: user.role,
      },
    });
  } catch (err) {
    return res.status(500).json({ message: "Server error" });
  }
};

export const changePassword = async (req, res) => {
  const { currentPassword, newPassword } = req.body;

  try {
    const user = await User.findById(req.user.id).select("+password");

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const isMatch = await bcrypt.compare(currentPassword, user.password);

    if (!isMatch) {
      return res.status(400).json({ message: "Current password is incorrect" });
    }

    if (currentPassword === newPassword) {
      return res.status(400).json({
        message: "New password must be different from current password",
      });
    }

    user.password = await bcrypt.hash(newPassword, 10);

    await user.save();
    return res.json({ message: "Password changed successfully" });
  } catch (err) {
    return res.status(500).json({ message: "Server error" });
  }
};

export const getFavorites = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).populate(
      "favorites",
      "title price images slug",
    );

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    return res.status(200).json({ favorites: user.favorites });
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};

export const addToFavorites = async (req, res) => {
  const { productId } = req.params;

  try {
    const user = await User.findById(req.user.id);
    const product = await Product.findById(productId);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    const favoriteIndex = user.favorites.findIndex(
      (favorite) => favorite.toString() === productId,
    );

    if (favoriteIndex !== -1) {
      user.favorites.splice(favoriteIndex, 1);
      await user.save();
      return res
        .status(200)
        .json({ message: "Product removed from favorites" });
    }

    user.favorites.push(productId);

    await user.save();

    return res(200).json({ message: "Product added to favorites" });
  } catch (err) {
    return res.status(500).json({ message: "Server error" });
  }
};
