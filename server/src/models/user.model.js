import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      trim: true,
      minlength: 3,
      maxlength: 30,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowercase: true,
    },
    password: {
      type: String,
      required: true,
      select: false,
      minLenght: 8,
    },
    role: {
      type: String,
      enum: ["user", "admin"],
      default: "user",
    },
    isVerified: {
      type: Boolean,
      default: false,
    },
    verificationToken: {
      type: String,
      default: null,
    },
    verificationTokenExpiry: {
      type: Date,
      default: null,
    },
    resetPasswordToken: {
      type: String,
      default: null,
    },
    resetPasswordTokenExpiry: {
      type: Date,
      default: null,
    },
    avatar: {
      public_id: {
        type: String,
        default: "default_avatar",
      },
      url: {
        type: String,
        default:
          "https://res.cloudinary.com/dn57femqe/image/upload/f_auto,q_auto/icon-default-icon_lnptag",
      },
    },
    // favorites: {
    //   type: [
    //     {
    //       type: mongoose.Schema.Types.ObjectId,
    //       ref: "Product",
    //     },
    //   ],
    //   default: [],
    // },
  },
  { timestamps: true },
);

export default mongoose.model("User", userSchema);
