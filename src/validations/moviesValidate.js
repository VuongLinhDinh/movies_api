import Joi from "joi";

const moviesVallidate = Joi.object({
  categories: Joi.string().required().messages({
    "any.required": "Thể loại phim là bắt buộc",
    "string.empty": "Thể loại phim không được để trống"
  }),
  genres: Joi.array().items(Joi.string()).required().messages({
    "any.required": "Thể loại phim là bắt buộc",
    "array.base": "Thể loại phim phải là một mảng",
    "array.empty": "Thể loại phim không được để trống"
  }),
  name: Joi.string().required().messages({
    "any.required": "Tên phim là bắt buộc",
    "string.empty": "Tên phim không được để trống"
  }),
  poster: Joi.string().optional(),
  director: Joi.string().optional(),
  cast: Joi.string().optional(),
  runningTime: Joi.number().optional(),
  language: Joi.string().optional(),
  rated: Joi.number().optional(),
  trailer: Joi.string().optional(),
  imgBanner: Joi.string().optional()
}).messages({
  "any.required": "{{#label}} là bắt buộc",
  "string.empty": "{{#label}} không được để trống",
  "array.base": "{{#label}} phải là một mảng",
  "array.empty": "{{#label}} không được để trống"
});

export { moviesVallidate };
