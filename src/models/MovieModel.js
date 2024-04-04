import mongoose from "mongoose";

const MovieShechema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true
    },
    poster: {
      type: String
    },
    director: {
      type: String
    },
    cast: {
      type: String
    },
    genre: {
      type: String
    },
    runingTime: {
      type: Number
    },
    language: {
      type: String
    },
    rated: {
      type: Number
    },
    trailer: {
      type: String
    },
    imgBanner: {
      type: String
    }
  },
  {
    versionKey: false,
    timestamps: true
  }
);

const Movie = mongoose.model("movie", MovieShechema);

export default Movie;
