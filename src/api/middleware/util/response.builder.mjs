// @ts-check

export default class ResponseBuilder
{
    static buildSingleCardOkResponse(card)
    {
        return { 
            status: 200, 
            body: card 
        }
    }

    static buildMultiCardOkResponse(result, queryParams)
    {
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

    static buildBadRequestResponse()
    {
        return { 
            status: 400, 
            body: { 
                error: "Invalid request parameters" 
            }
        }
    }
 
    static buildNotFoundResponse(param)
    {
        return { 
            status: 404, 
            body: { 
                param: param, 
                error: "Resource(s) not found" 
            }
        }
    }

    static buildInternalErrorResponse()
    {
        return { 
            status: 500, 
            body: { 
                error: "Something Broke!" 
            }
        }
    }
}