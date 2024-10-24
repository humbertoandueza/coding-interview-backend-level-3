import mongoose from 'mongoose';
import { Item } from './src/models/item.model';


let connection;

export const connectToDatabase = async (uri) => {

  connection = await mongoose.connect(uri);
  return connection;
};

export const cleanupDatabase = async () => {

  await Item.deleteMany({})
};

export const closeDatabase = async () => {
  await mongoose.connection.close();
};

export { MongoClient };

