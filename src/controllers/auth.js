import User from "../models/UserModel";
import bcryptjs from "bcryptjs";
import { registerValidate, loginValidate } from "../validations/authValidate";
import jwt from "jsonwebtoken";
import Role from "../models/RoleModel";

class AuthController {
  async register(req, res, next) {
    try {
      // validate
      const { error } = registerValidate.validate(req.body, {
        abortEarly: false
      });
      if (error) {
        const errors = error.details.map((err) => err.message);
        throw new Error(errors.join(", "));
      }
      // check email đã tồn tại
      const { username, email, password } = req.body;
      const checkemail = await User.findOne({ email });
      if (checkemail) {
        throw new Error("Email đã được sử dụng trước đó!!!");
      }
      // Mặc định gán vai trò người dùng thông thường (có thể thay đổi tùy thuộc vào yêu cầu của bạn)
      const defaultRole = await Role.findOne({ rolekey: 0 });
      if (!defaultRole) {
        throw new Error("Không tìm thấy vai trò mặc định với rolekey 0");
      }
      if (!defaultRole) {
        const defaultRole1 = await Role.findOne({ rolekey: 1 });
        if (!defaultRole1) {
          throw new Error("Không tìm thấy vai trò mặc định");
        }
        defaultRole = defaultRole1;
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
      next(error); // Sử dụng next để chuyển lỗi đến middleware xử lý lỗi
    }
  }

  async login(req, res, next) {
    try {
      // validate
      const { error } = loginValidate.validate(req.body, {
        abortEarly: false
      });
      if (error) {
        const errors = error.details.map((err) => err.message);
        throw new Error(errors.join(", "));
      }
      // check email đã tồn tại
      const { email, password } = req.body;
      const user = await User.findOne({ email });
      if (!user) {
        throw new Error("Tài khoản không tồn tại!!");
      }
      // xác minh mật khẩu
      const checkLogin = await bcryptjs.compare(password, user.password);
      if (!checkLogin) {
        throw new Error("Mật khẩu không chính xác!!");
      }
      // Tạo mã thông báo JWT và bao gồm vai trò của người dùng trong mã thông báo
      const token = await jwt.sign(
        { id: user._id, role: user.role },
        process.env.SECRETKEY || "key",
        {
          expiresIn: "3h"
        }
      );
      return res.status(200).json({
        message: "Đăng nhập thành công",
        data: { ...user.toObject(), password: undefined },
        token: token
      });
    } catch (error) {
      next(error); // Sử dụng next để chuyển lỗi đến middleware xử lý lỗi
    }
  }
}

export default AuthController;
