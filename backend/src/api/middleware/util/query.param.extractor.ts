import type { QueryParams } from '../../database/dao/card.types.js';

// Ensures defaults are set regardless of received input
function attemptIntParse(value: unknown, defaultValue: number): number {
    let finalValue = value ? parseInt(value as string, 10) : defaultValue;
    if (Number.isNaN(finalValue)) finalValue = defaultValue;

    return finalValue;
}

export default function extractQueryParams(query: Record<string, unknown>): QueryParams {
    const text = query.text as string | undefined;
    const pageSize = attemptIntParse(query.pageSize, 20);
    const page = attemptIntParse(query.page, 0);

    return { text, pageSize, page };
}
