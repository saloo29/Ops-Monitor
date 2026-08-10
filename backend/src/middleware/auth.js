import jwt from "jsonwebtoken";

const authenticate = (req, res, next) => {
  console.log("authorization header:", req.headers.authorization);

  const token = req.headers.authorization?.split(" ") [1];

  console.log("extracted token here:", token);

  if(!token){return res.status(401).json({message: "Token missing"})};

  const decoded = jwt.verify(token, process.env.JWT_SECRET);
  req.user = decoded;

  console.log("decoded user:", req.user);

  next();

}

export default authenticate;