import mongoose from 'mongoose';
import { MONGO_URI } from '../enviroments';

export const connectDB = async () => {
    try {
        await mongoose.connect(MONGO_URI);
    } catch (error) {
        console.error('MongoDB connection error:', error);
        process.exit(1); 
    }
};



