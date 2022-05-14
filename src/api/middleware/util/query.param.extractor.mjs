
//Ensures defaults are set regardless of received input
function attemptIntParse(value, defaultValue)
{
    let finalValue = value ? parseInt(value) : defaultValue
    if(Number.isNaN(finalValue))
        finalValue = defaultValue

    return finalValue
}

export default function extractQueryParams(query)
{
    const { text } = query   
    const pageSize = attemptIntParse(query.pageSize, 20)
    const page = attemptIntParse(query.page, 0)

    return { text, pageSize, page }
}