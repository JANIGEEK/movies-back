const asyncHandler = require("express-async-handler");

const isAdmin = asyncHandler(async (req, res, next) => {
  /*const user = req.user;
  if (user.isAdmin) {
    next();
    
  } else {
    res
      .status(403)
      .json({
        message: "Forbidden: only administrators can access this endpoint",
      });
  }*/
  try{
    if(req.user.isAdmin !== 1){
      res.status(401)
      throw new Error("Not authorized as an admin")
    } else{
      next()
    }
  } catch(error){
    console.log(error)
    res.status(401)
    throw new Error('Acceso no permitido no es un administrados')
  }
});

module.exports = { isAdmin }