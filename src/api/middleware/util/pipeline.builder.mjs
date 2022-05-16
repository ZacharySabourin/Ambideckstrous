
// @ts-check
export default function pipelineBuilder({ text, pageSize, page })
{
    const pipeline = [   
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
    ]  

    return pipeline;
}