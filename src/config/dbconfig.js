import mongoose from "mongoose";

const connectMongoDB = async (dbUrl) => {
  try {
    await mongoose.connect(dbUrl);
    console.log(">> connect successfully");
  } catch (error) {
    console.log("CONNECT FALSE");
  }
};
export default connectMongoDB;
