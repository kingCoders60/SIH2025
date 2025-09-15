import mongoose from "mongoose";
export const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGODB_URL);
    console.log(`MONGODB is connected sucessfully..!`);
  } catch (error) {
    console.log("MongoDb Error!", error);
  }
};
