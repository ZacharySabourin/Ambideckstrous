
// @ts-check
import CardsService from "../services/cards.service.mjs"

export default class CardsController
{
    //GET /api/v1/cards/{id}
    static async getCardByIdEndpoint(req, res, next)
    {        
        CardsService.getCardPesponseById(req.params || {})
        .then(result => {
            res.status(result.status).json(result.body)           
        })
        .catch(next)
    }

    //GET /api/v1/cards/named/{name}
    static async getCardByNameEndpoint(req, res, next)
    {
        CardsService.getCardResponseByName(req.params || {})
        .then(result => {
            res.status(result.status).json(result.body)           
        })
        .catch(next)
    }

    //GET /api/v1/cards/search/?text={text}&pageSize={pageSize}&page={page}
    static async getCardsBySearchEndpoint(req, res, next)
    {
        CardsService.getAllCardsResponseByText(req.query || {})
        .then(result => {
            res.status(result.status).json(result.body)
        })
        .catch(next)
    }
}