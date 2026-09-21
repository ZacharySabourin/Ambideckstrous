import type { Collection, Document, Filter, MongoClient } from 'mongodb';
import type { Card, CardListResult } from './card.types.js';

let cards: Collection<Card>;

export default class CardsDao {
    static async injectDb(client: MongoClient): Promise<void> {
        if (!cards) {
            cards = client
                .db(process.env.DB_NAME)
                .collection<Card>(process.env.CARD_COLLECTION as string);
        }
    }

    static async getCardByFilter(bsonFilter: Filter<Card> = {}): Promise<Card | null> {
        return await cards.findOne(bsonFilter);
    }

    static async getAllCardsByPipeline(bsonPipeline: Document[] = []): Promise<CardListResult> {
        const cursor = cards.aggregate<{ cardList: Card[]; totalCount: { count: number }[] }>(
            bsonPipeline
        );
        const result = await cursor.toArray();

        const cardList = result[0]?.cardList ?? [];
        const count = cardList.length !== 0 ? result[0]?.totalCount?.[0]?.count ?? 0 : 0;

        return { cardList, count };
    }
}
