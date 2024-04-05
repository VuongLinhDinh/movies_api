import { Router } from "express";
import moviesRouter from "./movies";
import categoryRouter from "./categories";
import genresRouter from "./genres";
const router = Router();

router.use("/movies", moviesRouter);
router.use("/categories", categoryRouter);
router.use("/genres", genresRouter);

export default router;
