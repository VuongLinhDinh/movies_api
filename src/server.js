import express from "express";
import "express-async-errors";
import connectMongoDB from "./config/dbconfig";
import dotenv from "dotenv";
import router from "./routers";
import errorHadler from "./middlewares/errorHandler";
dotenv.config("./.env");
const app = express();
app.use(
  express.urlencoded({
    extended: true
  })
);
app.use(express.json());
app.use(express.raw());

// create db
const dbUrl = process.env.DBCONNECT || "mongodb://localhost:27017/db_movies";
connectMongoDB(dbUrl);
app.use("/api", router);

// handel err
app.use(errorHadler);
export const viteNodeApp = app;
