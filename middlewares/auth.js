const jwt = require('jsonwebtoken')

module.exports = (req, res, next) => {
    const { authorization } = req.headers
    const token = authorization?.replace('Bearer ', '')
    // console.log(req.headers);
    if(!token) return res.json({ error: 'Token is not found!' })

    const user = jwt.verify(token, process.env.JWT_SECRET)
    if(!user) return res.json({ error: 'Token is not found!' })

    req.user = { _id: user.userId }
    next()
}