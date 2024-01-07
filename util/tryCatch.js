const tryCatch = (controller) => async (req, res, next) => {
  try {
    console.log(typeof controller)
    await controller(req, res);
  } catch (error) {
    return next(error);
  }
};

module.exports = tryCatch;
