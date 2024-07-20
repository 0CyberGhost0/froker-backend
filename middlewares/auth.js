const jwt=require("jsonwebtoken");
const auth = async (req, res, next) => {
    try {

      const token = req.header("x-auth-token");
    
      console.log(token);

      if (!token)
        return res.status(401).json({ msg: "No auth token, access denied" });

      const verified = jwt.verify(token, "password");

      if (!verified)
        return res
          .status(401)
          .json({ msg: "Token verification failed, authorization denied." });
  
      req.user = verified.id;
      req.token = token;
      next();
    } catch (err) {
      res.status(500).json({ err});
    }
  };
  
  module.exports = auth;