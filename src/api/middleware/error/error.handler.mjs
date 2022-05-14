
export default class ErrorHandler
{
    static async badRoute(req, res)
    {
        res.status(404).json({ error : 'Resource not found'})
    }

    static async internalError(err, req, res, next)
    {
        res.status(500).send({ error: 'Something broke!' })
    }
}

