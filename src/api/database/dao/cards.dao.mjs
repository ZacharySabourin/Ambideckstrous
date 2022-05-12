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

    static async getCardByFilter(filter = {})
    {
        try
        {
            return await cards.findOne(filter);
        }
        catch(err)
        {
            throw err;
        }
    }
}