const logger = (req, res, next) => {
  {
    console.log(req.method, req.originalUrl, res.statusCode, res.statusMessage);
  }
  next();
};

module.exports = logger;
