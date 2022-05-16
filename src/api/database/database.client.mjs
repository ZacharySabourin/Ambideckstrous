
// @ts-check
import { MongoClient, ServerApiVersion } from 'mongodb'
import CardsDao from './dao/cards.dao.mjs'

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