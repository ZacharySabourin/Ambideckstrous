export default class Logger
{
    static async logRequest(req, res, next)
    {
        console.log(Date.now(), ': Request made to:', req.url)
        next()
    }

    static async logError(err, req, res, next)
    {
        console.error(err.stack)
        next(err)
    }
}