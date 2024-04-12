import { Router } from "express";
import GenresController from "../controllers/genre";
import { checkPermission } from "../middlewares/authCheckPermission";

const genresRouter = Router();
const genresController = new GenresController();

genresRouter.get("/", genresController.getAllGenres);
genresRouter.get("/:id", genresController.getDetailGenre);
genresRouter.post("/", checkPermission, genresController.createGenre);
genresRouter.put("/:id", checkPermission, genresController.updateGenre);
genresRouter.delete("/:id", checkPermission, genresController.deleteGenre);

export default genresRouter;
