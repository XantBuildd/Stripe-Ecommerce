import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
      minlength: 3,
      maxlength: 150,
    },

    slug: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },

    description: {
      type: String,
      required: true,
      trim: true,
      maxlength: 2000,
    },

    images: [
      {
        public_id: {
          type: String,
          required: true,
        },

        url: {
          type: String,
          required: true,
        },
      },
    ],

    price: {
      type: Number,
      required: true,
      min: 0,
    },

    categories: {
      type: [String],
      required: true,
      default: [],
    },

    stock: {
      type: Number,
      required: true,
      min: 0,
      default: 0,
    },

    isActive: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  },
);

export default mongoose.model("Product", productSchema);
