import CardsDao from '../../database/dao/cards.dao.js';
import pipelineBuilder from '../util/pipeline.builder.js';
import extractQueryParams from '../util/query.param.extractor.js';
import ResponseBuilder, { type ApiResponse } from '../util/response.builder.js';

export default class CardsService {
    static async getCardPesponseById(
        requestParams: Record<string, unknown>
    ): Promise<ApiResponse> {
        const { id } = requestParams || {};
        if (!id) return ResponseBuilder.buildBadRequestResponse();

        const card = await CardsDao.getCardByFilter({ _id: id as string });
        if (!card) return ResponseBuilder.buildNotFoundResponse(id);

        return ResponseBuilder.buildSingleCardOkResponse(card);
    }

    static async getCardResponseByName(
        requestParams: Record<string, unknown>
    ): Promise<ApiResponse> {
        const { name } = requestParams || {};
        if (!name) return ResponseBuilder.buildBadRequestResponse();

        const card = await CardsDao.getCardByFilter({ name: name as string });
        if (!card) return ResponseBuilder.buildNotFoundResponse(name);

        return ResponseBuilder.buildSingleCardOkResponse(card);
    }

    static async getAllCardsResponseByText(
        requestQuery: Record<string, unknown>
    ): Promise<ApiResponse> {
        const queryParams = extractQueryParams(requestQuery);
        if (!queryParams.text) return ResponseBuilder.buildBadRequestResponse();

        const pipeline = pipelineBuilder(queryParams);
        const result = await CardsDao.getAllCardsByPipeline(pipeline);

        if (result.cardList.length === 0) return ResponseBuilder.buildNotFoundResponse(queryParams.text);

        return ResponseBuilder.buildMultiCardOkResponse(result, queryParams);
    }
}
