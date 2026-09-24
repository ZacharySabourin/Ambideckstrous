import type { Card, CardListResult, QueryParams } from '../models/card.types.js';

export interface ApiResponse<TBody = unknown> {
    status: number;
    body: TBody;
}

export default class ResponseBuilder {
    static buildSingleCardOkResponse(card: Card): ApiResponse<Card> {
        return {
            status: 200,
            body: card
        };
    }

    static buildMultiCardOkResponse(
        result: CardListResult,
        queryParams: QueryParams
    ): ApiResponse {
        return {
            status: 200,
            body: {
                totalCount: result.count,
                page: queryParams.page,
                searchQuery: queryParams.text,
                pageSize: queryParams.pageSize,
                cards: result.cardList
            }
        };
    }

    static buildBadRequestResponse(): ApiResponse {
        return {
            status: 400,
            body: {
                error: 'Invalid request parameters'
            }
        };
    }

    static buildNotFoundResponse(param: unknown): ApiResponse {
        return {
            status: 404,
            body: {
                param: param,
                error: 'Resource(s) not found'
            }
        };
    }

    static buildInternalErrorResponse(): ApiResponse {
        return {
            status: 500,
            body: {
                error: 'Something Broke!'
            }
        };
    }
}
