import Joi from "joi";

const createUrlSchema = Joi.object({
  title: Joi.string().required().max(100),
  url: Joi.string().required().max(600),
  short_code: Joi.string().optional().max(11),
});

const updateUrlSchema = Joi.object({
  title: Joi.string().optional().max(100),
  url: Joi.string().optional().max(600),
  short_code: Joi.string().optional().max(11),
  is_active: Joi.boolean().optional(),
  id: Joi.string().required(),
});

export const createUrlValidation = (req, res, next) => {
  const { error } = createUrlSchema.validate(req.body);
  if (error) {
    return res.status(400).json({
      status: false,
      message: "Invalid Request Body",
      data: error?.message,
    });
  }
  next();
};

export const updateUrlValidation = (req, res, next) => {
  const { error } = updateUrlSchema.validate(req.body);
  if (error) {
    return res.status(400).json({
      status: false,
      message: "Invalid Request Body",
      data: error?.message,
    });
  }
  next();
};
