import express from "express";
import connectMongoDB from "./config/dbconfig";
import dotenv from "dotenv";
import router from "./routers";
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

export const viteNodeApp = app;
