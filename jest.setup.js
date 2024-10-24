import { MongoMemoryServer } from 'mongodb-memory-server';
import { cleanupDatabase, closeDatabase, connectToDatabase } from './mongo-mock-setup';

let connection;
let mongo

beforeAll(async () => {
  try {
    mongo = await MongoMemoryServer.create();
    const uri = mongo.getUri();
    connection = await connectToDatabase(uri);
  } catch (error) {
    console.error('Error al conectar con la db', error);
  }
});

afterEach(async () => {
  await cleanupDatabase();
});

afterAll(async () => {
  await mongo.stop()
  await closeDatabase()
});
