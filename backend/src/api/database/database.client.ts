import { MongoClient } from 'mongodb';
import CardsDao from './dao/cards.dao.js';

let client: MongoClient;

export default class DatabaseClient {
    static async connect(uri: string): Promise<void> {
        client = new MongoClient(uri);

        await client
            .connect()
            .catch((err) => {
                throw err;
            })
            .then(async (connectedClient) => {
                await CardsDao.injectDb(connectedClient);
            });
    }

    static async disconnect(): Promise<void> {
        await client.close();
    }
}
