function logError(err, req, res, next)
{
    console.error(err.stack)
    next(err)
}

function badRoute(req, res)
{
    res.status(404).json({ error : 'Resource not found'})
}

export { logError, badRoute }