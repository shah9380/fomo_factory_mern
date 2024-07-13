import mongoose from 'mongoose';

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb+srv://shahislam9380:fomo_factory_123@cluster0.zckwib7.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0';

export async function connectDataBase() {
    try {
        await mongoose.connect(MONGODB_URI);
    } catch (error) {
        console.log('Error connectig to mongoDb:', error);
    }
}