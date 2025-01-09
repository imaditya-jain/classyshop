import mongoose from "mongoose";

const connectToDatabase = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI);
        console.log("Connected to MongoDB")
    } catch (error) {
        if (error instanceof mongoose.Error) {
            console.error(`MongoDB connection error: ${error.message}`);
        } else {
            console.log(`An unknown error occurred: ${error.message}`);
        }

        process.exit(1);
    }
}

export default connectToDatabase;