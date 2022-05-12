
export default function requestLogger(req, res, next)
{
    console.log('Request made to ', req.url)
    console.log('Time: ', Date.now())
    next()
}