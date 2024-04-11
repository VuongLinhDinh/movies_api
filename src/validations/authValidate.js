import Joi from "joi";

const registerValidate = Joi.object({
  username: Joi.string().empty().messages({
    "string.empty": "Tên người dùng không được để trống"
  }),
  email: Joi.string().email().required().messages({
    "string.email": "Email phải có định dạng hợp lệ",
    "any.required": "Email là bắt buộc"
  }),
  password: Joi.string().required().min(3).max(20).messages({
    "string.empty": "Mật khẩu không được để trống",
    "string.min": "Mật khẩu phải chứa ít nhất {#limit} ký tự",
    "string.max": "Mật khẩu không được vượt quá {#limit} ký tự",
    "any.required": "Mật khẩu là bắt buộc"
  }),
  role: Joi.number().required()
});
const loginValidate = Joi.object({
  email: Joi.string().email().required().messages({
    "string.email": "Email phải có định dạng hợp lệ",
    "any.required": "Email là bắt buộc"
  }),
  password: Joi.string().required().min(3).max(20).messages({
    "string.empty": "Mật khẩu không được để trống",
    "string.min": "Mật khẩu phải chứa ít nhất {#limit} ký tự",
    "string.max": "Mật khẩu không được vượt quá {#limit} ký tự",
    "any.required": "Mật khẩu là bắt buộc"
  })
});

export { registerValidate, loginValidate };
