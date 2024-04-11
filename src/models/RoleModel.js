import mongoose from "mongoose";

const RoleShema = new mongoose.Schema(
  {
    rolename: {
      type: String,
      required: true
    },
    rolekey: {
      type: Number,
      required: true
    }
  },
  {
    versionKey: false,
    timestamps: true
  }
);

const Role = mongoose.model("roles", RoleShema);

export default Role;
