import jwt from 'jsonwebtoken';

const userExtractor = (req, res, next) => {
  try {
    if (!req.token) return res.status(401).json({ error: 'invalid token' });
    const decodedData = jwt.verify(req.token, process.env.SECRET_KEY);
    if (!decodedData) return response.status(401).json({ error: 'invalid data' });
    req.user = decodedData;

    next();
  } catch (e) {
    res.status(400).json({ error: 'authorization error' });
  }
};

export default userExtractor;
