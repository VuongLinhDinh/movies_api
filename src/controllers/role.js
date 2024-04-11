import Role from "../models/RoleModel";

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
      const role = await Role.create(req.body);
      return res.status(200).json({
        message: "create role done",
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
