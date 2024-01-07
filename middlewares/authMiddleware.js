 const jwt = require('jsonwebtoken')
 
 class authMiddlewares {
    static isAuthenticated(req, res, next) {
      if (req.session && req.session.user) {
        return next();
      }
      res.redirect("/login");
    }

    static signToken(req,res,next) {

    }

    static verifyToken(req,res,next) {
      
      const token = req.headers['authenticated']
      if(!token) {
        res.status(401).json({error: 'tokens error'})
      }
      jwt.verify(token, )
    }
  }

  module.exports = authMiddlewares;