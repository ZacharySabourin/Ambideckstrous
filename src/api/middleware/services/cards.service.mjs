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

        const bsonPipeline = [{
            $search: {
                index: 'default',
                text: {
                    query: text,
                    path: {
                        wildcard: '*'
                    }
                }
            }
        }]

        const { pageSize } = queryParams
        const { page } = queryParams

        return CardsDao.getAllCardsByFilter({ bsonPipeline, pageSize, page })
    }
}