import Product from "../models/product.model.js";
import uploadImage from "../services/cloudinary.service.js";
import cloudinary from "../settings/cloudinary.js";
import { generateUniqueSlug } from "../services/generateUniqueSlug.js";

export const getProducts = async (req, res) => {
  try {
    const products = await Product.find({
      isActive: true,
    });

    return res.status(200).json({
      products,
    });
  } catch (err) {
    return res.status(500).json({
      message: "Server error",
    });
  }
};

export const getProduct = async (req, res) => {
  const slug = req.params.slug;

  try {
    const product = await Product.findOne({ slug, isActive: true });

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    return res.status(200).json({ product });
  } catch (err) {
    return res.status(500).json({ message: "Server error" });
  }
};

export const createProduct = async (req, res) => {
  const { title, description, price, categories, stock } = req.body;

  try {
    const slug = await generateUniqueSlug(title);

    const result = await Promise.all(
      req.files.map((file) => uploadImage(file.buffer)),
    );

    const images = result.map((image) => {
      return {
        public_id: image.public_id,
        url: image.secure_url,
      };
    });

    const product = await Product.create({
      title,
      description,
      price,
      categories,
      stock,
      slug,
      images,
    });

    return res.status(201).json({ product });
  } catch (err) {
    return res.status(500).json({ message: "Server error" });
  }
};

export const updateProduct = async (req, res) => {
  const { title, description, price, categories, stock } = req.body;
  const { slug } = req.params;

  try {
    const product = await Product.findOne({ slug, isActive: true });

    if (!product) {
      return res.status(404).json({
        message: "Product not found",
      });
    }

    if (title) {
      const slug = await generateUniqueSlug(title, product._id);
      product.title = title;
      product.slug = slug;
    }

    if (description) product.description = description;
    if (categories) product.categories = categories;

    if (price !== undefined) {
      product.price = price;
    }

    if (stock !== undefined) {
      product.stock = stock;
    }

    if (req.files?.length > 0) {
      await Promise.all(
        product.images.map((image) =>
          cloudinary.uploader.destroy(image.public_id),
        ),
      );

      const result = await Promise.all(
        req.files.map((file) => uploadImage(file.buffer)),
      );

      product.images = result.map((image) => ({
        public_id: image.public_id,
        url: image.secure_url,
      }));
    }

    await product.save();

    return res.status(200).json({
      product,
    });
  } catch (err) {
    return res.status(500).json({
      message: "Server error",
    });
  }
};

export const deleteProduct = async (req, res) => {
  const { slug } = req.params;

  try {
    const product = await Product.findOne({ slug, isActive: true });

    if (!product) {
      return res.status(404).json({
        message: "Product not found",
      });
    }

    product.isActive = false;
    await product.save();

    return res.status(200).json({
      message: "Product deleted successfully",
    });
  } catch (err) {
    return res.status(500).json({
      message: "Server error",
    });
  }
};
