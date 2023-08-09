import express from "express";
import { dbConnect } from "./db/connect";
import userRouter from "./routes/user";
import adminRouter from "./routes/admin";
import { handleInvalidRoutes } from "./middlewares";
import cors from "cors";

const app = express();
app.use(cors());
app.use(express.json());

//Routes
app.use("/user", userRouter);
app.use("/admin", adminRouter);
app.use(handleInvalidRoutes);

//Database connection
dbConnect().then(() =>{
  //Start server
  app.listen(3000, () => {
    console.log("listening on port 3000");
  })  
})


