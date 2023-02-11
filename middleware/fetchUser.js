const jwt = require("jsonwebtoken");
const JWT_SECRET =  require('../config/keys');


const fetchUser = (req, res, next) => {
     // Get the user from the JWT token and Add id from req object 
     const token = req.header("auth-token")
     if (!token) {
          res.status(401).send({error: "Please authenticate with your valid token."});
     }

     try {
         const data= jwt.verify(token, JWT_SECRET);
         req.user = data.user;
         next(); 
     } catch (error) {
          res.status(401).send({error: "Please authenticate with your valid token."});
     }
}

module.exports = fetchUser;