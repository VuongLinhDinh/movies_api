import Role from "../models/RoleModel";
import Joi from "joi";
class RoleController {
  async getAllRole(req, res, next) {
    try {
      const roles = await Role.find();
      return res.status(200).json({
        message: "get role done",
        data: roles
      });
    } catch (error) {
      next(error);
    }
  }

  async getDetailRole(req, res, next) {
    try {
      const role = await Role.findById(req.params.id);
      if (!role) {
        throw new Error("Role không tồn tại");
      }
      return res.status(200).json({
        message: "get detail done",
        data: role
      });
    } catch (error) {
      next(error);
    }
  }

  async createRole(req, res, next) {
    try {
      // Validate the request body
      const { error } = Joi.object({
        name: Joi.string().required(),
        description: Joi.string().required()
      }).validate(req.body, { abortEarly: false });

      if (error) {
        const errors = error.details.map((err) => err.message);
        throw new Error(errors.join(", "));
      }

      const role = await Role.create(req.body);
      if (!role) {
        throw new Error("Failed to create role");
      }
      return res.status(200).json({
        message: ">> CREATE Role DONE",
        data: role
      });
    } catch (error) {
      next(error);
    }
  }

  async updateRole(req, res, next) {
    try {
      const role = await Role.findByIdAndUpdate(req.params.id, req.body, {
        new: true
      });
      if (!role) {
        throw new Error("Role không tồn tại");
      }
      return res.status(200).json({
        message: "update role done",
        data: role
      });
    } catch (error) {
      next(error);
    }
  }

  async deleteRole(req, res, next) {
    try {
      const role = await Role.findByIdAndDelete(req.params.id);
      if (!role) {
        throw new Error("Role không tồn tại");
      }
      return res.status(200).json({
        message: "delete role done"
      });
    } catch (error) {
      next(error);
    }
  }
}
export default RoleController;
