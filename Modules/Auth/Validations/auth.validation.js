import Joi from "joi";

const registerSchema = Joi.object({
  email: Joi.string().required(),
  password: Joi.string().required(),
  name: Joi.string().min(1).optional(),
});

const loginSchema = Joi.object({
  email: Joi.string().required(),
  password: Joi.string().required(),
});

const updateUserSchema = Joi.object({
  email: Joi.string().required(),
  password: Joi.string().optional(),
  name: Joi.string().min(1).optional(),
  is_active: Joi.boolean().optional(),
  googleId: Joi.string().optional(),
});

export const registerRequestValidator = (req, res, next) => {
  const { error } = registerSchema.validate(req.body);
  if (error) {
    return res
      .status(400)
      .json({
        status: false,
        message: "Invalid request body",
        data: error?.message,
      });
  }
  next();
};

export const loginRequestValidator = (req, res, next) => {
  const { error } = loginSchema.validate(req.body);
  if (error) {
    return res
      .status(400)
      .json({
        status: false,
        message: "Invalid request body",
        data: error?.message,
      });
  }
  next();
};

export const updateUserRequestValidator = (req, res, next) => {
  const { error } = updateUserSchema.validate(req.body);
  if (error) {
    return res
      .status(400)
      .json({
        status: false,
        message: "Invalid request body",
        data: error?.message,
      });
  }
  next();
};
