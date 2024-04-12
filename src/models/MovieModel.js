import mongoose, { Schema } from "mongoose";

const MovieShechema = new mongoose.Schema(
  {
    categories: {
      type: Schema.Types.ObjectId,
      ref: "categoríe",
      required: true
    },
    genres: {
      type: [Schema.Types.ObjectId],
      ref: "genres",
      required: true
    },
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
    runingTime: {
      type: String
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
