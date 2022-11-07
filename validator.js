const Joi = require("@hapi/joi");

const newUserValidator = (data) => {
  const schema = Joi.object({
    user_name: Joi.string().min(5).max(16).required(),
    dob: Joi.date().required(),
    email: Joi.string().email().required(),
    password: Joi.string()
      .min(5)
      .max(16)
      .pattern(
        /\b[^\dA-Z]*(?:\d[^\dA-Z]*\d[^\dA-Z]*[A-Z])|(?:\d[^\dA-Z]*[A-Z][^\dA-Z]*\d)|(?:[A-Z][^\dA-Z]*\d[^\dA-Z]*\d)[^\dA-Z]*\b/
      )
      .required(),
  });

  return schema.validate(data);
};

module.exports = {
  newUserValidator,
};
