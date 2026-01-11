import jwt from "jsonwebtoken";

const authenticate = (req, res, next) => {
  const token = req.headers.authorization?.split(" ") [1];

  if(!token){return res.status(401).json({message: "Token missing"})};

  if(token){
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;

    console.log("inside authmiddleware, check the user object:", req.user);

    next();
  }

}

export default authenticate;