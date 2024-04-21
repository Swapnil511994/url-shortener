import jwt from "jsonwebtoken";
import config from "../../../Config/config.js";

export const authenticateToken = (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1];

  if (!token)
    return res.status(401).json({
      status: false,
      message: "Invalid Token",
    });

  jwt.verify(
    token,
    config.Authentication.publicKEY,
    { algorithms: ["RS256"] },
    (err, decoded) => {
      if (err)
        return res.status(403).json({
          status: false,
          message: "Unable to decode token",
        });
      console.log("decoded", decoded);
      req.user = decoded;
      next();
    }
  );
};
