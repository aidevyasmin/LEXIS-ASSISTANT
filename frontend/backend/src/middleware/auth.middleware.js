const jwt = require('jsonwebtoken');

const verifyToken = (req, res, next) => {
  const token = req.headers['authorization']?.split(' ')[1]; // Bearer TOKEN

  if (!token) {
    return res.status(403).send({ message: 'No token provided!' });
  }

  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) {
      return res.status(401).send({ message: 'Unauthorized!' });
    }
    req.userId = decoded.id;
    req.userRole = decoded.role;
    next();
  });
};

const verifyRole = (roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.userRole)) {
      return res.status(403).send({ message: 'Require Role!' });
    }
    next();
  };
};

const isAdmin = verifyRole(['ADMIN']);
const isLawyer = verifyRole(['LAWYER', 'ADMIN']);
const isClient = verifyRole(['CLIENT', 'LAWYER', 'ADMIN']);

module.exports = {
  verifyToken,
  isAdmin,
  isLawyer,
  isClient
};
