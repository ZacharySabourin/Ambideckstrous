import dotenv from 'dotenv';
import mongoose from 'mongoose';

dotenv.config();

export async function connectDatabase(): Promise<void> {
  const mongoUri = process.env.MONGODB_URI;

  if (!mongoUri) {
    throw new Error('MONGODB_URI environment variable is missing.');
  }

  mongoose.connection.on('error', (err) => {
    console.error(`MongoDB connection error: ${err}`);
  });

  await mongoose.connect(mongoUri);
}

export async function disconnectDatabase(): Promise<void> {
  if (mongoose.connection.readyState !== 0) {
    console.log('Stopping MongoDB connection pool...');
    await mongoose.disconnect();
    console.log('MongoDB connection pool closed successfully.');
  }
}