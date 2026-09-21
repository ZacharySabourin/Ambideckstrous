import type { NextFunction, Request, Response } from 'express';
import CardsService from '../services/cards.service.js';

export default class CardsController {
    // GET /api/v1/cards/{id}
    static async getCardByIdEndpoint(req: Request, res: Response, next: NextFunction): Promise<void> {
        CardsService.getCardPesponseById(req.params || {})
            .then((result) => {
                res.status(result.status).json(result.body);
            })
            .catch(next);
    }

    // GET /api/v1/cards/named/{name}
    static async getCardByNameEndpoint(req: Request, res: Response, next: NextFunction): Promise<void> {
        CardsService.getCardResponseByName(req.params || {})
            .then((result) => {
                res.status(result.status).json(result.body);
            })
            .catch(next);
    }

    // GET /api/v1/cards/search/?text={text}&pageSize={pageSize}&page={page}
    static async getCardsBySearchEndpoint(req: Request, res: Response, next: NextFunction): Promise<void> {
        CardsService.getAllCardsResponseByText(req.query || {})
            .then((result) => {
                res.status(result.status).json(result.body);
            })
            .catch(next);
    }
}
