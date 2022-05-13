import CardsDao from "../../database/dao/cards.dao.mjs"

export default class CardsService
{
    static async getCardById(id)
    {
        return CardsDao.getCardByFilter({ _id: id })
    }

    static async getCardByName(name)
    {
        return CardsDao.getCardByFilter({ name: name })
    }

    static async getAllCardsByText(queryParams)
    {
        const { text } = queryParams
        const { pageSize } = queryParams
        const { page } = queryParams
              
        const bsonPipeline = [   
            {
                $search: {
                    index: 'default',
                    text: {
                        query: text,
                        path: {
                            wildcard: '*'
                        }
                    }
                }
            },
            {
                $facet: {
                    cardList: [
                        { 
                            $skip: page
                        },
                        { 
                            $limit: pageSize
                        },
                        {
                            $sort: { 
                                name: 1 
                            }
                        }
                    ],
                    totalCount: [
                        {
                            $count: 'count'
                        }
                    ]
                }
            }
        ]  

        return CardsDao.getAllCardsByPipeline(bsonPipeline)
    }
}