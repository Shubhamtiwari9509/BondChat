const jwt = require("jsonwebtoken");

const jwt_authenticate = async (req, res, next) => {
   
  console.log("Auth header:", req.headers.authorization);

  const authHeader = req.headers.authorization;
  if (!authHeader) {
     
    return res.status(401).json({ message: "Unauthorized user" });
  }

  const token = authHeader.split(" ")[1];
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
     
    req.userId = decoded.id;
    next();
  } catch (err) {
    return res.status(401).json({ message: "Invalid or expired token" });
  }
};

module.exports = jwt_authenticate;