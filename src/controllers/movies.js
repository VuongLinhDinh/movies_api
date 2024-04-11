import Movie from "../models/MovieModel";

export default class MoviesController {
  async getAllMovies(req, res) {
    try {
      const movies = await Movie.find()
        .populate("categories")
        .populate("genres");
      return res.status(200).json({
        message: ">> GET MOVIES DONE",
        data: movies
      });
    } catch (error) {
      return res.status(400).json({
        message: ">> THE ERR: " + error.message
      });
    }
  }
  async getDetailMovie(req, res) {
    try {
      const movie = await Movie.findById(req.params.id)
        .populate("categories")
        .populate("genres");
      if (!movie) {
        return res.status(400).json({
          message: ">> This movies is undefind "
        });
      }
      return res.status(200).json({
        message: ">> GET DETAIL DONE",
        data: movie
      });
    } catch (error) {
      return res.status(400).json({
        message: ">> THE ERR: " + error.message
      });
    }
  }
  async createMovie(req, res) {
    try {
      const movie = await Movie.create(req.body);
      return res.status(200).json({
        message: ">> CREATE MOVIES DONE",
        data: movie
      });
    } catch (error) {
      return res.status(400).json({
        message: ">> THE ERR: " + error.message
      });
    }
  }
  async updateMovie(req, res) {
    try {
      const movie = await Movie.findByIdAndUpdate(req.params.id, req.body, {
        new: true
      });
      if (!movie) {
        return res.status(400).json({
          message: ">> This movies is undefind "
        });
      }
      return res.status(200).json({
        message: ">> UPDATE THIS MOVIES DONE",
        data: movie
      });
    } catch (error) {
      return res.status(400).json({
        message: ">> THE ERR: " + error.message
      });
    }
  }
  async deleteMovie(req, res) {
    try {
      const movie = await Movie.findByIdAndDelete(req.params.id);
      if (!movie) {
        return res.status(400).json({
          message: ">> This movies is undefind "
        });
      }
      return res.status(200).json({
        message: ">> DELETE MOVIES DONE"
      });
    } catch (error) {
      return res.status(400).json({
        message: ">> THE ERR: " + error.message
      });
    }
  }
}
