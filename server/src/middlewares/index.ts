import {Request, Response, NextFunction } from "express";
import jwt, { Secret } from "jsonwebtoken";
import { z } from "zod";
require("dotenv").config();

//after compilation .env file is not getting added in dist
//Backup Key is temp solution for that
const USER_KEY = process.env.USER_KEY || "Backup Key for USER ";
export const USER_SECRET_KEY: Secret =  USER_KEY as Secret; 

const ADMIN_KEY = process.env.ADMIN_KEY || "Backup Key for ADMIN";
export const ADMIN_SECRET_KEY: Secret =  ADMIN_KEY as Secret; 


const tokenCheck = z.object({
  authorization: z.string().min(1),
})

//autharization for admin
export const authenticateAdmin = (req: Request, res: Response, next: NextFunction) => {
  const authHeader = tokenCheck.safeParse(req.headers);
  if(!authHeader.success) {
    return res.status(401).json({message: "Login or signup"});
  }

  const token = authHeader.data.authorization.split(' ')[1];
  
  jwt.verify(token, ADMIN_SECRET_KEY, (err, payload) =>{
    if(err) {
      return res.status(403).json({message: "Login or signup"});
    }
    if(!payload || typeof payload == "string") {
      //payload should neither be undefined nor a string.
      return res.status(403).json({message: "Login or signup"});
    }
  
    req.headers["userId"] = payload.id;
    next();
  
  });
};

//authorization for users
export const authenticateUser = (req: Request, res: Response, next: NextFunction) => {
  const authHeader = tokenCheck.safeParse(req.headers);
  if(!authHeader.success) {
    return res.status(401).json({message: "Login or signup"});
  }

  const token = authHeader.data.authorization.split(' ')[1];
  
  jwt.verify(token, USER_SECRET_KEY, (err, payload) =>{
    if(err) {
      return res.status(403).json({message: "Login or signup"});
    }
    if(!payload || typeof payload == "string") {
      //payload should neither be undefined nor a string.
      return res.status(403).json({message: "Login or signup"});
    }
  
    req.headers["userId"] = payload.id;
    next();
  
  });
};

//Invalid Routes
export const handleInvalidRoutes = (req: Request, res: Response, next: NextFunction) => {
  // If no route has matched the request so far, this middleware will be executed
  // Respond with a "404 Not Found" error
  res.status(404).json({ message: 'Route not found' });
};