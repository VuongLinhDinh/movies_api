import Category from "../models/CategoryModel";

export default class CategoriesController {
  async getAllCategories(req, res, next) {
    try {
      const categories = await Category.find();
      return res.status(200).json({
        message: ">> GET Categories DONE",
        data: categories
      });
    } catch (error) {
      next(error);
    }
  }

  async getDetailCategory(req, res, next) {
    try {
      const category = await Category.findById(req.params.id);
      if (!category) {
        throw new Error("This Category is undefined");
      }
      return res.status(200).json({
        message: ">> GET DETAIL DONE",
        data: category
      });
    } catch (error) {
      next(error);
    }
  }

  async createCategory(req, res, next) {
    try {
      const category = await Category.create(req.body);
      return res.status(200).json({
        message: ">> CREATE Categories DONE",
        data: category
      });
    } catch (error) {
      next(error);
    }
  }

  async updateCategory(req, res, next) {
    try {
      const category = await Category.findByIdAndUpdate(
        req.params.id,
        req.body,
        {
          new: true
        }
      );
      if (!category) {
        throw new Error("This Category is undefined");
      }
      return res.status(200).json({
        message: ">> UPDATE THIS Categories DONE",
        data: category
      });
    } catch (error) {
      next(error);
    }
  }

  async deleteCategory(req, res, next) {
    try {
      const category = await Category.findByIdAndDelete(req.params.id);
      if (!category) {
        throw new Error("This Category is undefined");
      }
      return res.status(200).json({
        message: ">> DELETE Categories DONE"
      });
    } catch (error) {
      next(error);
    }
  }
}
