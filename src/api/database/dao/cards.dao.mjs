// @ts-check
let cards

export default class CardsDao
{
    static async injectDb(client)
    {
        if(!cards)
            cards = await client.db(process.env.DB_NAME).collection(process.env.CARD_COLLECTION)
    }

    static async getCardByFilter(bsonFilter = {})
    {
        return await cards.findOne(bsonFilter)
    }

    static async getAllCardsByPipeline(bsonPipeline = [])
    {
        const cursor = cards.aggregate(bsonPipeline)
        const result = await cursor.toArray()    
          
        const { cardList } = result[0] || []
        let count = 0

        if(cardList.length !== 0)
            count = result[0].totalCount[0].count

        return { cardList, count }
    }
}