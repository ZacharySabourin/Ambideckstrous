import mongodb, { MongoClient } from 'mongodb';

const uri: string = process.env.MONGO_URI;

const client = new MongoClient(uri);

export default class DatabaseClient
{
    static async connect()
    {
        await client.connect()   
        .catch(err => {
            throw err;
        })
        .then(async client => {
            //inject DBs
        });
    }
};