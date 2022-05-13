import mongodb, { ServerApiVersion } from 'mongodb'
import CardsDao from './dao/cards.dao.mjs'

const options = { 
    useNewUrlParser: true, 
    useUnifiedTopology: true, 
    serverApi: ServerApiVersion.v1
};

const client = mongodb.MongoClient

export default class DatabaseClient
{
    static async connect(uri)
    {
        client.connect(uri, options)   
        .catch(err => {
            throw err
        })
        .then(async client => {
            await CardsDao.injectDb(client)
        })
    }
};