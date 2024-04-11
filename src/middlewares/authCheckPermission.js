import User from "../models/UserModel";
import jwt from "jsonwebtoken";

const checkPermission = async (req, res, next) => {
  try {
    const token = req.headers.authorization?.split(" ")[1];
    if (!token) {
      throw new Error("No Auth");
    }
    console.log(token);
    console.log(process.env.SECRETKEY);
    const data = jwt.verify(token, process.env.SECRETKEY);
    if (!data) {
      throw new Error("No Authorization");
    }
    const user = await User.findById(data.id).populate("role");
    if (!user) {
      throw new Error("Not Found");
    }
    if (user.role.rolekey === 1) {
      next();
    } else {
      throw new Error("Bạn cần đăng nhập với quyền admin để làm điều này");
    }
  } catch (error) {
    throw new Error(error.message);
  }
};
export { checkPermission };
