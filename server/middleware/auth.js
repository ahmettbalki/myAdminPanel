const jwt = require('jsonwebtoken');

const auth = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader) return res.status(401).json({ message: "Token gerekli" });

    const token = authHeader.split(' ')[1];
    const decodedData = jwt.verify(token, process.env.SECRET_TOKEN);

    req.userId = decodedData.id;
    next();
  } catch (error) {
    console.error("Auth middleware hatası:", error.message);
    res.status(401).json({ message: "Geçersiz veya eksik token" });
  }
};

module.exports = auth;
