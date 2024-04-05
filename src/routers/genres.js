import { Router } from "express";
import GenresController from "../controllers/genre";

const genresRouter = Router();
const genresController = new GenresController();

genresRouter.get("/", genresController.getAllGenres);
genresRouter.get("/:id", genresController.getDetailGenre);
genresRouter.post("/", genresController.createGenre);
genresRouter.put("/:id", genresController.updateGenre);
genresRouter.delete("/:id", genresController.deleteGenre);

export default genresRouter;
