
export default class Logger
{
    static async logRequest(req, res, next)
    {
        console.log('Request made to:', req.url)
        console.log('Time: ', Date.now())
        next()
    }

    static async logError(err, req, res, next)
    {
        console.error(err.stack)
        next(err)
    }
}