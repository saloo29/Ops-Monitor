import jwt from "jsonwebtoken";

const authenticate = (req, res, next) => {
  const token = req.headers.authorization?.split(" ") [1];

  if(!token){return res.status(401).json({message: "Token missing"})};

  if(token){
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.userId = decoded;
    next();
  }

}

export default authenticate;