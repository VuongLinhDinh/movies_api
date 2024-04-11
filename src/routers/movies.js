import { Router } from "express";
import MoviesController from "../controllers/movies";
import { checkPermission } from "../middlewares/authCheckPermission";

const moviesRouter = Router();
const moviesController = new MoviesController();

moviesRouter.get("/", moviesController.getAllMovies);
moviesRouter.get("/:id", moviesController.getDetailMovie);
moviesRouter.post("/", checkPermission, moviesController.createMovie);
moviesRouter.put("/:id", checkPermission, moviesController.updateMovie);
moviesRouter.delete("/:id", checkPermission, moviesController.deleteMovie);

export default moviesRouter;
