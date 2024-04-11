import mongoose, { Schema } from "mongoose";

const UserShema = new mongoose.Schema(
  {
    username: {
      type: String
      // required: true
    },
    email: {
      type: String,
      required: true
    },
    password: {
      type: String,
      required: true
    },
    role: {
      type: Schema.Types.ObjectId,
      ref: "roles",
      required: true
    }
  },
  {
    versionKey: false,
    timestamps: true
  }
);

const User = mongoose.model("users", UserShema);

export default User;
