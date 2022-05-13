
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

    static async getAllCardsByPipeline(bsonPipeline = [])
    {
        try
        {
            const cursor = cards.aggregate(bsonPipeline)
            const result = await cursor.toArray()    
          
            const { cardList } = result[0] || []
            let count = 0

            if(cardList.length !== 0)
                 count = result[0].totalCount[0].count

            return { cardList, count }
        }
        catch(err)
        {
            throw err
        }
    }
}