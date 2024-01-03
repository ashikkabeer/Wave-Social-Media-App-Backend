const errorHandler = (error, req, res, next) => {
  res.status(400).render('error', { error });
};

module.exports = errorHandler;
