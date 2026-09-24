// Shape of a card document as stored in MongoDB.
// Extends loosely since the Scryfall-style card schema has many optional fields
// that aren't relevant to the queries this API currently performs.
export interface Card {
    _id: string;
    name: string;
    [key: string]: unknown;
}

export interface QueryParams {
    text: string | undefined;
    pageSize: number;
    page: number;
}

export interface CardListResult {
    cardList: Card[];
    count: number;
}
