import Category from "../models/CategoryModel";

export default class CategoriesController {
  async getAllCategories(req, res) {
    try {
      const categories = await Category.find();
      return res.status(200).json({
        message: ">> GET Categories DONE",
        data: categories
      });
    } catch (error) {
      return res.status(400).json({
        message: ">> THE ERR: " + error.message
      });
    }
  }
  async getDetailCategory(req, res) {
    try {
      const category = await Category.findById(req.params.id);
      if (!category) {
        return res.status(400).json({
          message: ">> This Categories is undefind "
        });
      }
      return res.status(200).json({
        message: ">> GET DETAIL DONE",
        data: category
      });
    } catch (error) {
      return res.status(400).json({
        message: ">> THE ERR: " + error.message
      });
    }
  }
  async createCategory(req, res) {
    try {
      const category = await Category.create(req.body);
      return res.status(200).json({
        message: ">> CREATE Categories DONE",
        data: category
      });
    } catch (error) {
      return res.status(400).json({
        message: ">> THE ERR: " + error.message
      });
    }
  }
  async updateCategory(req, res) {
    try {
      const category = await Category.findByIdAndUpdate(
        req.params.id,
        req.body,
        {
          new: true
        }
      );
      if (!category) {
        return res.status(400).json({
          message: ">> This Categories is undefind "
        });
      }
      return res.status(200).json({
        message: ">> UPDATE THIS Categories DONE",
        data: Category
      });
    } catch (error) {
      return res.status(400).json({
        message: ">> THE ERR: " + error.message
      });
    }
  }
  async deleteCategory(req, res) {
    try {
      const category = await Category.findByIdAndDelete(req.params.id);
      if (!category) {
        return res.status(400).json({
          message: ">> This Categories is undefind "
        });
      }
      return res.status(200).json({
        message: ">> DELETE Categories DONE"
      });
    } catch (error) {
      return res.status(400).json({
        message: ">> THE ERR: " + error.message
      });
    }
  }
}
