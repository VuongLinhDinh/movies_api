import mongoose from "mongoose";

const GenreShechema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true
    },
    description: {
      type: String,
      required: true
    },
    tags: {
      type: String
      // required: true
    }
  },
  {
    versionKey: false,
    timestamps: true
  }
);

const Genre = mongoose.model("genres", GenreShechema);

export default Genre;
