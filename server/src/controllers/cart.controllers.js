import Cart from "../models/cart.model.js";
import Product from "../models/product.model.js";

export const getCart = async (req, res) => {
  try {
    const cart = await Cart.findOne({ user: req.user.id }).populate(
      "items.product",
      "title price images slug",
    );

    if (!cart) {
      return res.status(200).json({
        cart: {
          items: [],
        },
        subTotal: 0,
      });
    }

    const subTotal = cart.items.reduce((total, item) => {
      return (total += item.product.price * item.quantity);
    }, 0);

    return res.status(200).json({
      cart,
      subTotal,
    });
  } catch (err) {
    return res.status(500).json({ message: "Server error" });
  }
};

export const createItemCart = async (req, res) => {
  const { productId, quantity } = req.body;

  try {
    let cart = await Cart.findOne({ user: req.user.id });
    const product = await Product.findById(productId);

    if (quantity <= 0) {
      return res
        .status(400)
        .json({ message: "Quantity must be greater than 0" });
    }

    if (!cart) {
      cart = new Cart({
        user: req.user.id,
        items: [],
      });
      await cart.save();
    }

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    const cartItem = cart.items.find(
      (item) => item.product.toString() === productId,
    );

    if (cartItem) {
      cartItem.quantity += quantity;
      await cart.save();
      return res
        .status(200)
        .json({ message: "Item updated successfully", cart });
    } else {
      const newCartItem = {
        product: productId,
        quantity,
      };
      cart.items.push(newCartItem);
      await cart.save();
      return res.status(201).json({ message: "Item added successfully", cart });
    }
  } catch (err) {
    return res.status(500).json({ message: "Server error" });
  }
};

export const updateItemCart = async (req, res) => {
  const { productId } = req.params;
  const { quantity } = req.body;

  try {
    const cart = await Cart.findOne({ user: req.user.id });

    if (quantity <= 0) {
      return res
        .status(400)
        .json({ message: "Quantity must be greater than 0" });
    }

    if (!cart) {
      return res.status(404).json({ message: "Cart not found" });
    }

    const cartItem = cart.items.find(
      (item) => item.product.toString() === productId,
    );

    if (cartItem === undefined) {
      return res.status(404).json({ message: "Item not found" });
    }

    cartItem.quantity = quantity;
    await cart.save();

    return res.status(200).json({ message: "Item updated successfully", cart });
  } catch (err) {
    return res.status(500).json({ message: "Server error" });
  }
};

export const deleteItemCart = async (req, res) => {
  const { productId } = req.params;

  try {
    const cart = await Cart.findOne({ user: req.user.id });

    if (!cart) {
      return res.status(404).json({ message: "Cart not found" });
    }

    cart.items = cart.items.filter(
      (item) => item.product.toString() !== productId,
    );

    await cart.save();

    return res.status(200).json({ message: "Item deleted successfully", cart });
  } catch (err) {
    return res.status(500).json({ message: "Server error" });
  }
};

export const clearCart = async (req, res) => {
  try {
    const cart = await Cart.findOne({ user: req.user.id });

    if (!cart) {
      return res.status(404).json({ message: "Cart not found" });
    }

    cart.items = [];
    await cart.save();

    return res.status(200).json({ message: "Cart cleared successfully", cart });
  } catch (err) {
    return res.status(500).json({ message: "Server error" });
  }
};
