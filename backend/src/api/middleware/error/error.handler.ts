import type { NextFunction, Request, Response } from 'express';
import ResponseBuilder from '../util/response.builder.js';

export default class ErrorHandler {
    static badRoute(req: Request, res: Response): void {
        const result = ResponseBuilder.buildNotFoundResponse(req.params || {});
        res.status(result.status).json(result.body);
    }

    static internalError(err: Error, req: Request, res: Response, next: NextFunction): void {
        const result = ResponseBuilder.buildInternalErrorResponse();
        res.status(result.status).json(result.body);
    }
}
