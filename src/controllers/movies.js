import ValidationError from "../errors/ValidationError";
import Movie from "../models/MovieModel";

export default class MoviesController {
  async getAllMovies(req, res, next) {
    try {
      const page = parseInt(req.query.page) || 1;
      const limit = parseInt(req.query.limit) || 10;
      const skip = (page - 1) * limit;

      let query = Movie.find();

      // Tìm kiếm theo tên phim
      if (req.query.search) {
        const searchRegex = new RegExp(req.query.search, "i");
        query = query.or([
          { name: searchRegex },
          { title: searchRegex },
          { description: searchRegex },
          { director: searchRegex },
          { cast: searchRegex }
        ]);
      }

      const totalMovies = await Movie.countDocuments(query);
      const totalPages = Math.ceil(totalMovies / limit);

      const movies = await query
        .skip(skip)
        .limit(limit)
        .populate("categories")
        .populate("genres")
        .sort({ releaseDate: -1 });

      if (movies.length === 0) {
        throw new Error("No movies found");
      }

      return res.status(200).json({
        message: ">> GET MOVIES DONE",
        data: movies,
        page: page,
        limit: limit,
        totalPages: totalPages
      });
    } catch (error) {
      next(error);
    }
  }

  async getDetailMovie(req, res, next) {
    try {
      const movie = await Movie.findById(req.params.id)
        .populate("categories")
        .populate("genres");
      if (!movie) {
        throw new Error("This movie is undefined");
      }
      return res.status(200).json({
        message: ">> GET DETAIL DONE",
        data: movie
      });
    } catch (error) {
      next(error);
    }
  }

  async createMovie(req, res, next) {
    try {
      const movie = await Movie.create(req.body);
      if (!movie) {
        throw new Error("Failed to create movie");
      }
      return res.status(200).json({
        message: ">> CREATE MOVIES DONE",
        data: movie
      });
    } catch (error) {
      next(error);
    }
  }

  async updateMovie(req, res, next) {
    try {
      const movie = await Movie.findByIdAndUpdate(req.params.id, req.body, {
        new: true
      });
      if (!movie) {
        throw new Error("This movie is undefined");
      }
      return res.status(200).json({
        message: ">> UPDATE THIS MOVIES DONE",
        data: movie
      });
    } catch (error) {
      next(error);
    }
  }

  async deleteMovie(req, res, next) {
    try {
      const movie = await Movie.findByIdAndDelete(req.params.id);
      if (!movie) {
        throw new Error("This movie is undefined");
      }
      return res.status(200).json({
        message: ">> DELETE MOVIES DONE"
      });
    } catch (error) {
      next(error);
    }
  }
}
