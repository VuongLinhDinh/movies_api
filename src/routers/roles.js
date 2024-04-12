import { Router } from "express";
import RoleController from "../controllers/role";
import { checkPermission } from "../middlewares/authCheckPermission";

const roleRouter = Router();
const roleController = new RoleController();

roleRouter.get("/", checkPermission, roleController.getAllRole);
roleRouter.get("/:id", checkPermission, roleController.getDetailRole);
roleRouter.post("/", checkPermission, roleController.createRole);
roleRouter.put("/:id", checkPermission, roleController.updateRole);
roleRouter.delete("/:id", checkPermission, roleController.deleteRole);

export default roleRouter;
