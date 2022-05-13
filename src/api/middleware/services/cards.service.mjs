import CardsDao from "../../database/dao/cards.dao.mjs"
import pipelineBuilder from "../util/pipeline.builder.mjs"

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
        return CardsDao.getAllCardsByPipeline(pipelineBuilder(queryParams))
    }
}