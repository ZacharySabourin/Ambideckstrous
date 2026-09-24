import type { Document } from 'mongodb';
import type { QueryParams } from '../models/card.types.js';

export default function pipelineBuilder({ text, pageSize, page }: QueryParams): Document[] {
    const pipeline: Document[] = [
        {
            $search: {
                index: 'default',
                text: {
                    query: text,
                    path: {
                        wildcard: '*'
                    }
                }
            }
        },
        {
            $facet: {
                cardList: [
                    {
                        $skip: page
                    },
                    {
                        $limit: pageSize
                    },
                    {
                        $sort: {
                            name: 1
                        }
                    }
                ],
                totalCount: [
                    {
                        $count: 'count'
                    }
                ]
            }
        }
    ];

    return pipeline;
}
