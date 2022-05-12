import CardsService from "../services/cards.service.mjs";

export default class CardsController
{
    static async getCardByIdEndpoint(req, res, next)
    { 
        const { id } = req.params || {};
        
        CardsService.getCardById(id)
        .then(card => {
            if(!card)
                res.status(404).json({ error: "Card not found" })

            else
                res.json(card)
        })
        .catch(next)
    }
}