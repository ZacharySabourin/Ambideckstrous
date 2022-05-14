import CardsDao from "../../database/dao/cards.dao.mjs"
import pipelineBuilder from "../util/pipeline.builder.mjs"
import extractQueryParams from "../util/query.param.extractor.mjs";
import ResponseBuilder from '../util/response.builder.mjs'

export default class CardsService
{
    static async getCardPesponseById(requestParams)
    {
        const { id } = requestParams || {};
        if(!id)
            return ResponseBuilder.buildBadRequestResponse()

        const card = await CardsDao.getCardByFilter({ _id: id })
        if(!card)
            return ResponseBuilder.buildNotFoundResponse(id)

        return ResponseBuilder.buildSingleCardOkResponse(card)
    }

    static async getCardResponseByName(requestParams)
    {
        const { name } = requestParams || {};
        if(!name)
            return ResponseBuilder.buildBadRequestResponse()

        const card = await CardsDao.getCardByFilter({ name: name })
        if(!card)
            return ResponseBuilder.buildNotFoundResponse(name)

        return ResponseBuilder.buildSingleCardOkResponse(card)
    }

    static async getAllCardsResponseByText(requestQuery)
    {
        const queryParams = extractQueryParams(requestQuery)
        if(!queryParams.text)
            ResponseBuilder.buildBadSearchResponse()

        const pipeline = pipelineBuilder(queryParams)
        const result = await CardsDao.getAllCardsByPipeline(pipeline)

        if(result.cardList.length === 0)
            return ResponseBuilder.buildNotFoundResponse(text)

        return ResponseBuilder.buildMultiCardOkResponse(result, queryParams)
    }
}