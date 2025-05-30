const jwt = require ("jsonwebtoken");
const User = require ("../models/User");

//Middleware to protect routes
const protect = async (req, res, next) => { // req, res, next, err => Error handling minddleware
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")//checks value starts with string Bearer
  ) {
    try {
      token = req.headers.authorization.split(" ")[1];// 1 - retrieves second element of the array(token)
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      req.user = await User.findById(decoded.user.id).select("-password");
      next();
    }catch (error) {
      console.error("Token Verification failed:", error);
      res.status(401).json({message: "Not authorize, token failed"});
    }
  }else{
    res.status(401).json({message: "Not authorized, no token provided"});
  }
};

//Middleware to check if the user is an admin
const admin = (req, res, next) => {
  if(req.user && req.user.role === "admin"){
    next();
  }else{
    res.status(403).json({message: "Not authorized as an admin"});
  }
}

module.exports = {protect, admin};