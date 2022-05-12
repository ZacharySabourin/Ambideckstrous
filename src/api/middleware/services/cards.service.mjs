import { ObjectId } from "mongodb";
import CardsDao from "../../database/dao/cards.dao.mjs";

export default class CardsService
{
    static async getCardById(id)
    {
        const filter = { _id: id }

        return CardsDao.getCardByFilter(filter);
    }
}