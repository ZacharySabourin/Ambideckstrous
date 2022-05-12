import { query } from "express"
import { ObjectId } from "mongodb"
import CardsDao from "../../database/dao/cards.dao.mjs"

export default class CardsService
{
    static async getCardById(id)
    {
        const filter = { _id: id }

        return CardsDao.getCardByFilter(filter)
    }

    static async getCardByName(name)
    {
        const filter = { name: name }

        return CardsDao.getCardByFilter(filter)
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
                    paginatedList: [
                        { 
                            $skip: page
                        },
                        { 
                            $limit: pageSize
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

        return CardsDao.getAllCardsByPipeline({ bsonPipeline, pageSize, page })
    }
}