
import mongoose from 'mongoose';

const dbConnect = async () => {
    try {
        const conn = await mongoose.connect(
            process.env.MONGODB_CLOUD_URI
        );

        console.log(`☁️ MongoDB Connected: ${conn.connection.host}`);
    } catch (err) {
        console.log(`❌ Cloud DB failed: ${err.message}`);

        try {
            const conn = await mongoose.connect(
                process.env.MONGO_URI_LOCAL
            );

            console.log(`💻 Local MongoDB Connected: ${conn.connection.host}`);
        } catch (localErr) {
            console.log(`❌ Local DB also failed: ${localErr.message}`);
        }
    }
};

export default dbConnect;