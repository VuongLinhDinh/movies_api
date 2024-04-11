import Genre from "../models/GenreModel";
import Joi from "joi";
export default class GenresController {
  async getAllGenres(req, res, next) {
    try {
      const genres = await Genre.find();
      return res.status(200).json({
        message: ">> GET Genres DONE",
        data: genres
      });
    } catch (error) {
      next(error);
    }
  }

  async getDetailGenre(req, res, next) {
    try {
      const genre = await Genre.findById(req.params.id);
      if (!genre) {
        throw new Error("This Genre is undefined");
      }
      return res.status(200).json({
        message: ">> GET DETAIL DONE",
        data: genre
      });
    } catch (error) {
      next(error);
    }
  }

  async createGenre(req, res, next) {
    try {
      // Validate the request body
      const { error } = Joi.object({
        name: Joi.string().required(),
        description: Joi.string().required(),
        tags: Joi.string().optional()
      }).validate(req.body, { abortEarly: false });

      if (error) {
        const errors = error.details.map((err) => err.message);
        throw new Error(errors.join(", "));
      }

      const genre = await Genre.create(req.body);
      return res.status(200).json({
        message: ">> CREATE Genres DONE",
        data: genre
      });
    } catch (error) {
      next(error);
    }
  }

  async updateGenre(req, res, next) {
    try {
      const genre = await Genre.findByIdAndUpdate(req.params.id, req.body, {
        new: true
      });
      if (!genre) {
        throw new Error("This Genre is undefined");
      }
      return res.status(200).json({
        message: ">> UPDATE THIS Genres DONE",
        data: genre
      });
    } catch (error) {
      next(error);
    }
  }

  async deleteGenre(req, res, next) {
    try {
      const genre = await Genre.findByIdAndDelete(req.params.id);
      if (!genre) {
        throw new Error("This Genre is undefined");
      }
      return res.status(200).json({
        message: ">> DELETE Genres DONE"
      });
    } catch (error) {
      next(error);
    }
  }
}
