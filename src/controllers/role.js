import Role from "../models/RoleModel";

class RoleController {
  async getAllRole(req, res) {
    try {
      const roles = await Role.find();
      return res.status(200).json({
        message: "get role done",
        data: roles
      });
    } catch (error) {
      return res.status(400).json({
        message: error.message
      });
    }
  }
  async getDetailRole(req, res) {
    try {
      const role = await Role.findById(req.params.id);
      return res.status(200).json({
        message: "get detail done",
        data: role
      });
    } catch (error) {
      return res.status(400).json({
        message: error.message
      });
    }
  }
  async createRole(req, res) {
    try {
      const role = await Role.create(req.body);
      if (!role) {
        return res.status(400).json({
          message: "role không tồn tại"
        });
      }
      return res.status(200).json({
        message: "create role done",
        data: role
      });
    } catch (error) {
      return res.status(400).json({
        message: error.message
      });
    }
  }
  async updateRole(req, res) {
    try {
      const role = await Role.findByIdAndUpdate(req.params.id, req.body, {
        new: true
      });
      if (!role) {
        return res.status(400).json({
          message: "role không tồn tại"
        });
      }
      return res.status(200).json({
        message: "update role done",
        data: role
      });
    } catch (error) {
      return res.status(400).json({
        message: error.message
      });
    }
  }
  async deleteRole(req, res) {
    try {
      const role = await Role.findByIdAndDelete(req.params.id);
      if (!role) {
        return res.status(400).json({
          message: "role không tồn tại"
        });
      }
      return res.status(200).json({
        message: "delete role done"
      });
    } catch (error) {
      return res.status(400).json({
        message: error.message
      });
    }
  }
}
export default RoleController;
