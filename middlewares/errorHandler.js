const errorHandler = (error, req, res, next) => {
  console.log(error)
  res.status(400).render('error', { error });
};

module.exports = errorHandler;
