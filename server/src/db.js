import mongoose from "mongoose";

const dbConnect = async () => {
  try {
    const db = await mongoose.connect(process.env.MONGO_URI, {
      dbName: "stripe",
    });
    console.log("Connected to MongoDB");
  } catch (err) {
    console.error(err);
  }
};

export default dbConnect;
