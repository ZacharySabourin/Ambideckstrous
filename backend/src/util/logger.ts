import type { NextFunction, Request, Response } from 'express';

export default class Logger {
    static logRequest(req: Request, res: Response, next: NextFunction): void {
        console.log(Date.now(), ': Request made to:', req.url);
        next();
    }

    static logError(err: Error, req: Request, res: Response, next: NextFunction): void {
        console.error(err.stack);
        next(err);
    }
}
