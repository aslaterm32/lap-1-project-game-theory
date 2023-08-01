const logger = (req, res, next) => {
    {
        console.log(req.method, req.originalUrl, res.statusCode)
    }
    next()
}

module.exports = logger
