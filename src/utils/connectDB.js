import mongoose from "mongoose";

const connectDB = async () => {
  try {
    if (mongoose.connection.readyState) return;

    await mongoose.connect(process.env.MONGO_URI);

    console.log("connected to DB");
  } catch (error) {
    console.log("can not connect to DB\n", error);
    return;
  }
};

export default connectDB;
