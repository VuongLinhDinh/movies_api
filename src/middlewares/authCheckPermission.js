import User from "../models/UserModel";
import jwt from "jsonwebtoken";

const checkPermission = async (req, res, next) => {
  try {
    // console.log(req.headers.authorization?.split(" "));
    const token = req.headers.authorization?.split(" ");
    if (!token) {
      return res.status(401).json({
        message: "No Auth"
      });
    }
    const data = jwt.verify(token, process.env.SECRETKEY);
    if (!data) {
      return res.status(401).json({
        message: "No Authorization"
      });
    }
    const user = await User.findById(data.id).populate("role");
    if (!user) {
      return res.status(404).json({
        message: "Not Found"
      });
    }
    if (user.role.rolekey === 1) {
      next();
    } else {
      return res.status(403).json({
        message: "Bạn cần đăng nhập với quyền admin để làm điều này"
      });
    }
  } catch (error) {
    return res.status(400).json({
      message: error.message
    });
  }
};
export { checkPermission };
