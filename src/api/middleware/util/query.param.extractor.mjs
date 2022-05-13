
export default function extractQueryParams(query)
{
    const { text } = query   
    const pageSize = query.pageSize ? parseInt(query.pageSize, 10) : 20
    const page = query.page ? parseInt(query.page, 10) : 0

    const queryParams = { text, pageSize, page }
    return queryParams
}