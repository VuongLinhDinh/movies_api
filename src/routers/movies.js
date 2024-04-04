import { Router } from "express";
import MoviesController from "../controllers/movies";

const moviesRouter = Router();
const moviesController = new MoviesController();

moviesRouter.get("/", moviesController.getAllMovies);
moviesRouter.get("/:id", moviesController.getDetailMovie);
moviesRouter.post("/", moviesController.createMovie);
moviesRouter.put("/:id", moviesController.updateMovie);
moviesRouter.delete("/:id", moviesController.deleteMovie);

export default moviesRouter;
