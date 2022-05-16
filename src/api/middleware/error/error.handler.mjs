
import ResponseBuilder from "../util/response.builder.mjs"

// @ts-check
export default class ErrorHandler
{
    static async badRoute(req, res)
    {
        const result = ResponseBuilder.buildNotFoundResponse(req.params || {})
        res.status(result.status).json(result.body)
    }

    static async internalError(err, req, res, next)
    {
        const result = ResponseBuilder.buildInternalErrorResponse()
        res.status(result.status).send(result.body)
    }
}

