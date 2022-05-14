import CardsDao from "../../database/dao/cards.dao.mjs"
import pipelineBuilder from "../util/pipeline.builder.mjs"
import extractQueryParams from "../util/query.param.extractor.mjs";

export default class CardsService
{
    static async getCardPesponseById(params)
    {
        const { id } = params || {};
        if(!id)
            return { status: 400, body: { id: id, error: "Error parsing id" }}

        const card = await CardsDao.getCardByFilter({ _id: id })
        if(!card)
            return { status: 404, body: { id: id, error: "Card not found" }}

        return { status: 200, body: card }
    }

    static async getCardResponseByName(params)
    {
        const { name } = params || {};
        if(!name)
            return { status: 400, body: { name: name, error: "Error parsing name" }}

        const card = await CardsDao.getCardByFilter({ name: name })
        if(!card)
            return { status: 404, body: { name: name, error: "Card not found" }}

        return { status: 200, body: card }
    }

    static async getAllCardsResponseByText(query)
    {
        const queryParams = extractQueryParams(query)
        if(!queryParams.text)
            return { status: 400, body: { error: "Not searching for anything!" }}

        const pipeline = pipelineBuilder(queryParams)
        const result = await CardsDao.getAllCardsByPipeline(pipeline)

        if(result.cardList.length === 0)
            return { status: 404, body: { error: "Nothing matches this text" }}

        return {
            status: 200,
            body: {
                totalCount: result.count,
                page: queryParams.page,
                searchQuery: queryParams.text,
                pageSize: queryParams.pageSize,
                cards: result.cardList
            }
        }
    }
}