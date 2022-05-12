import { Console } from 'console'
import mongodb from 'mongodb'

const objectId = mongodb.ObjectId
let cards

export default class CardsDao
{
    static async injectDb(client)
    {
        if(cards)
            return

        try
        {
            cards = await client.db(process.env.DB_NAME).collection(process.env.CARD_COLLECTION)
            console.log('Cards injected')
        }
        catch(err)
        {
            throw err
        }
    }

    static async getCardByFilter(bsonFilter = {})
    {
        try
        {
            return await cards.findOne(bsonFilter)
        }
        catch(err)
        {
            throw err
        }
    }

    static async getAllCardsByFilter({ bsonPipeline = {}, pageSize = 50, page = 0 } = {})
    {
        try
        {
            const cursor = cards.aggregate(bsonPipeline)
            const displayCursor = cursor.limit(pageSize).skip(pageSize * page)

            const result = await displayCursor.toArray()

            return result
        }
        catch(err)
        {
            throw err
        }

    }
}