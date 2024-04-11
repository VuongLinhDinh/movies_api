import { Router } from "express";
import RoleController from "../controllers/role";

const roleRouter = Router();
const roleController = new RoleController();

roleRouter.get("/", roleController.getAllRole);
roleRouter.get("/:id", roleController.getDetailRole);
roleRouter.post("/", roleController.createRole);
roleRouter.put("/:id", roleController.updateRole);
roleRouter.delete("/:id", roleController.deleteRole);

export default roleRouter;
