import User from "../models/UserModel";
import bcryptjs from "bcryptjs";
import { registerValidate, loginValidate } from "../validations/authValidate";
import jwt from "jsonwebtoken";
import Role from "../models/RoleModel";

class AuthController {
  async register(req, res) {
    try {
      // validate
      const { error } = registerValidate.validate(req.body, {
        abortEarly: false
      });
      if (error) {
        const errors = error.details.map((err) => err.message);
        return res.status(400).json({
          message: errors
        });
      }
      // check email đã tồn tại
      const { username, email, password } = req.body;
      const checkemail = await User.findOne({ email });
      if (checkemail) {
        return res.status(400).json({
          message: "Email đã được sử dụng trước đó!!!"
        });
      }
      // Mặc định gán vai trò người dùng thông thường (có thể thay đổi tùy thuộc vào yêu cầu của bạn)
      const defaultRole = await Role.findOne({ rolekey: 0 | 1 }); // Giả sử rolekey của người dùng thông thường là 2
      if (!defaultRole) {
        return res.status(500).json({
          message: "Không tìm thấy vai trò mặc định"
        });
      }
      // mã hóa mật khẩu
      const hashPassword = await bcryptjs.hash(password, 10);
      // Tạo người dùng mới
      const user = await User.create({
        username,
        email,
        password: hashPassword,
        role: defaultRole._id // Gán vai trò mặc định cho người dùng mới
      });
      return res.status(200).json({
        message: "Tạo người dùng thành công",
        data: { ...user.toObject(), password: undefined }
      });
    } catch (error) {
      return res.status(400).json({
        message: error.message
      });
    }
  }

  async login(req, res) {
    try {
      // validate
      const { error } = loginValidate.validate(req.body, {
        abortEarly: false
      });
      if (error) {
        const errors = error.details.map((err) => err.message);
        return res.status(400).json({
          message: errors
        });
      }
      // check email đã tồn tại
      const { email, password } = req.body;
      const user = await User.findOne({ email });
      if (!user) {
        return res.status(400).json({
          message: "Tài khoản không tồn tại!!"
        });
      }
      // xác minh mật khẩu
      const checkLogin = await bcryptjs.compare(password, user.password);
      if (!checkLogin) {
        return res.status(400).json({
          message: "Mật khẩu không chính xác!!"
        });
      }
      // Tạo mã thông báo JWT và bao gồm vai trò của người dùng trong mã thông báo
      const token = await jwt.sign(
        { id: user._id, role: user.role },
        process.env.SECRETKEY,
        {
          expiresIn: process.env.EXPIRESIN
        }
      );
      return res.status(200).json({
        message: "Đăng nhập thành công",
        data: { ...user.toObject(), password: undefined },
        token: token
      });
    } catch (error) {
      return res.status(400).json({
        message: error.message
      });
    }
  }
}

export default AuthController;
