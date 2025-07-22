import mongoose from "mongoose";

const connectDB = async () => {

    mongoose.connection.on('connected', () => console.log("Database Connected"))
    await mongoose.connect(`${process.env.MONGODB_URI}/test`)

}

export default connectDB;

// Do not use '@' symbol in your databse user's password else it will show an error.

//i triend hard to make the code systematics so it can arrange better . i have completed the server first then one bye one pushed all the code file to it can be easy to undes atand thanks 