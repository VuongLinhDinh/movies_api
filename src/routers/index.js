import { Router } from "express";
import moviesRouter from "./movies";
import categoryRouter from "./categories";
import genresRouter from "./genres";
import authRouter from "./auth";
import roleRouter from "./roles";
const router = Router();

router.use("/auth", authRouter);
router.use("/roles", roleRouter);
router.use("/movies", moviesRouter);
router.use("/categories", categoryRouter);
router.use("/genres", genresRouter);

export default router;
