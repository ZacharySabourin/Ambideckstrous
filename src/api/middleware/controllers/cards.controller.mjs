import CardsService from "../services/cards.service.mjs"
import extractQueryParams from "../util/query.param.extractor.mjs";

export default class CardsController
{
    static async getCardByIdEndpoint(req, res, next)
    { 
        const { id } = req.params || {};
        if(!id)
            res.status(400).json({ error: "Error parsing id" })
        
        CardsService.getCardById(id)
        .then(card => {
            if(!card)
                res.status(404).json({ id: id, error: "Card not found" })
            else
                res.json(card)
        })
        .catch(next)
    }

    static async getCardByNameEndpoint(req, res, next)
    {
        const { name } = req.params || {}
        if(!name)
            res.status(400).json({ error: "Error parsing name" })

        CardsService.getCardByName(name)
        .then(card => {
            if(!card)
                res.status(404).json({ name: name, error: "Card not found" })
            else
                res.json(card)
        })
        .catch(next)
    }

    static async getCardsBySearchEndpoint(req, res, next)
    {
        const queryParams = extractQueryParams(req.query)

        if(!queryParams.text)
            res.status(400).json({ error: "Not searching for anything!" })

        CardsService.getAllCardsByText(queryParams)
        .then(result => {
            res.json({
                totalResults: result.length,
                page: queryParams.page,
                searchQuery: queryParams.text,
                pageSize: queryParams.pageSize,
                cards: result
            })            
        })
        .catch(next)
    }
}