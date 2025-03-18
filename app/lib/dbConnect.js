import mongoose from "mongoose";

const url = process.env.MONGODB_URL;

let cached = global.mongoose || { conn: null, promise: null };

async function connectDb() {
    if (cached.conn) return cached.conn;

    if (!cached.promise) {
        cached.promise = mongoose.connect(url, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        }).then((mongoose) => mongoose);
    }

    cached.conn = await cached.promise;
    global.mongoose = cached; // Ensure global caching
    return cached.conn;
}

export default connectDb;
