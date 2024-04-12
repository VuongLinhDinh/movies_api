import { Router } from "express";
import { checkPermission } from "../middlewares/authCheckPermission";
import CategoriesController from "../controllers/categories";

const categoryRouter = Router();
const categoryController = new CategoriesController();

categoryRouter.get("/", categoryController.getAllCategories);
categoryRouter.get("/:id", categoryController.getDetailCategory);
categoryRouter.post("/", checkPermission, categoryController.createCategory);
categoryRouter.put("/:id", checkPermission, categoryController.updateCategory);
categoryRouter.delete(
  "/:id",
  checkPermission,
  categoryController.deleteCategory
);

export default categoryRouter;
