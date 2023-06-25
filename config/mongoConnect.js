import mongoose from "mongoose";

const mongoConnect = async () => {
  mongoose.set("strictQuery", false);
  try {
    const connected = await mongoose.connect(process.env.MONGO_URL);
    console.log(
      `Mongodb connected successfully ${connected.connection.host}`
    );
  } catch (error) {
    console.log(`Error: ${error.message}`);
    process.exit(1);
  }
};

export default mongoConnect;

