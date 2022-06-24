import jwt from 'jsonwebtoken';

const userExtractor = (req, res, next) => {
  try {
    const token = req.headers.authorization.split(' ')[1];
    const decodedData = jwt.verify(token, process.env.SECRET_KEY);
    if (!token) return res.status(403).json({ error: 'User not authorized' });
    req.user = decodedData;
    next();
  } catch (e) {
    console.log(e);
    return res.status(403).json({ error: 'User not authorized' });
  }
};

export { userExtractor };
