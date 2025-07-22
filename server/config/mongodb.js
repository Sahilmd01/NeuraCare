import mongoose from "mongoose";

const connectDB = async () => {
  if (mongoose.connection.readyState >= 1) {
    console.log("Already connected to the database");
    return;
  }

  try {
    mongoose.connection.once("connected", () => {
      console.log("✅ Database connected successfully");
    });

    mongoose.connection.on("error", (err) => {
      console.error("❌ Database connection error:", err);
    });

    mongoose.connection.on("disconnected", () => {
      console.warn("⚠️ Database disconnected");
    });

    await mongoose.connect(`${process.env.MONGODB_URI}/test`);

  } catch (err) {
    console.error("❌ Failed to connect to the database:", err);
    process.exit(1);
  }
};

export default connectDB;



// Do not use '@' symbol in your databse user's password else it will show an error.

//i triend hard to make the code systematics so it can arrange better . i have completed the server first then one bye one pushed all the code file to it can be easy to undes atand thanks 