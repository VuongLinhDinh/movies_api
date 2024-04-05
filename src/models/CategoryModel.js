import mongoose from "mongoose";

const CategoryShechema = new mongoose.Schema(
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

const Category = mongoose.model("categoríe", CategoryShechema);

export default Category;
