import { Router } from "express";
// import MoviesController from "../controllers/movies";
import CategoriesController from "../controllers/categories";

const categoryRouter = Router();
const categoryController = new CategoriesController();

categoryRouter.get("/", categoryController.getAllCategories);
categoryRouter.get("/:id", categoryController.getDetailCategory);
categoryRouter.post("/", categoryController.createCategory);
categoryRouter.put("/:id", categoryController.updateCategory);
categoryRouter.delete("/:id", categoryController.deleteCategory);

export default categoryRouter;
