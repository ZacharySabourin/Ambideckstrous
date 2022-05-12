
export default function badRoute(req, res)
{
    res.status(404).json({ error : 'Resource not found'})
}

export { badRoute }