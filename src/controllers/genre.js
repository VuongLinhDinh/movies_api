import Genre from "../models/GenreModel";

export default class GenresController {
  async getAllGenres(req, res) {
    try {
      const genres = await Genre.find();
      return res.status(200).json({
        message: ">> GET Genres DONE",
        data: genres
      });
    } catch (error) {
      return res.status(400).json({
        message: ">> THE ERR: " + error.message
      });
    }
  }
  async getDetailGenre(req, res) {
    try {
      const genre = await Genre.findById(req.params.id);
      if (!genre) {
        return res.status(400).json({
          message: ">> This Genres is undefind "
        });
      }
      return res.status(200).json({
        message: ">> GET DETAIL DONE",
        data: genre
      });
    } catch (error) {
      return res.status(400).json({
        message: ">> THE ERR: " + error.message
      });
    }
  }
  async createGenre(req, res) {
    try {
      const genre = await Genre.create(req.body);
      return res.status(200).json({
        message: ">> CREATE Genres DONE",
        data: genre
      });
    } catch (error) {
      return res.status(400).json({
        message: ">> THE ERR: " + error.message
      });
    }
  }
  async updateGenre(req, res) {
    try {
      const genre = await Genre.findByIdAndUpdate(req.params.id, req.body, {
        new: true
      });
      if (!genre) {
        return res.status(400).json({
          message: ">> This Genres is undefind "
        });
      }
      return res.status(200).json({
        message: ">> UPDATE THIS Genres DONE",
        data: Genre
      });
    } catch (error) {
      return res.status(400).json({
        message: ">> THE ERR: " + error.message
      });
    }
  }
  async deleteGenre(req, res) {
    try {
      const genre = await Genre.findByIdAndDelete(req.params.id);
      if (!genre) {
        return res.status(400).json({
          message: ">> This Genres is undefind "
        });
      }
      return res.status(200).json({
        message: ">> DELETE Genres DONE"
      });
    } catch (error) {
      return res.status(400).json({
        message: ">> THE ERR: " + error.message
      });
    }
  }
}
