import { MongoClient, ServerApiVersion } from 'mongodb'
import CardsDao from './dao/cards.dao.mjs'

const options = { 
    useNewUrlParser: true, 
    useUnifiedTopology: true, 
    serverApi: ServerApiVersion.v1
};

let client

export default class DatabaseClient
{
    static async connect(uri)
    {
        client = new MongoClient(uri)

        client.connect()   
        .catch(err => {
            throw err
        })
        .then(async client => {
            await CardsDao.injectDb(client)
        })
    }

    static async disconnect()
    {
        await client.close()
    }
};