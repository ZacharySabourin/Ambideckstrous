
export default class ResponseBuilder
{
    static buildBadRequestResponse()
    {
        return { 
            status: 400, 
            body: { 
                error: "Error parsing parameter" 
            }
        }
    }

    static buildBadSearchResponse()
    {
        return { 
            status: 400, 
            body: { 
                error: "Not searching for anything!" 
            }
        }
    }

    static buildNotFoundResponse(param)
    {
        return { 
            status: 404, 
            body: { 
                param: param, 
                error: "Card(s) not found" 
            }
        }
    }

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
}