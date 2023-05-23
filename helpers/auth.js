const jwt = require("jsonwebtoken");

const dotenv = require("dotenv");

dotenv.config();

// Middleware untuk verifikasi token
const verifyAuth = (req, res, next) => {
  const token = req.headers.authorization.split(" ")[1];
  if (!token) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  try {
    const decodedToken = jwt.verify(token, process.env.SECRET_KEY || "secret");
    req.user = decodedToken;
    next();
  } catch (error) {
    return res.status(401).json({ message: "Invalid token" });
  }
};

module.exports = verifyAuth