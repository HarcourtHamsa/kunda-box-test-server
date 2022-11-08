const User = require("../models/user");
const { validateData } = require("../validator");
const { calculateAge } = require("../utils");

async function insert_user(req, res) {
  const { error } = validateData(req.body);

  if (error) {
    const errorPath = error.details[0].path[0];
    console.log(errorPath);

    const errorType =
      errorPath === "user_name"
        ? "INVALID_NAME"
        : errorPath === "dob"
        ? "INVALID_DOB"
        : errorPath === "email"
        ? "INVALID_EMAIL"
        : "INVALID_PASSWORD";

    res.status(400).json({
      result: false,
      code: errorType,
    });
    res.end();
    return;
  }

  const usernameExists = await User.findOne({ user_name: req.body.user_name });
  const emailExists = await User.findOne({ email: req.body.email });

  // checks if user exists
  if (usernameExists || emailExists) {
    res.status(406).json({
      result: false,
      code: "USER_ALREADY_REGISTERED",
    });
    res.end();
    return;
  }

  const isOlderThan18 = calculateAge(req.body.dob);

  if (!isOlderThan18) {
    res.status(406).json({
      result: false,
      code: "INVALID_DOB",
    });
    res.end();
    return;
  }

  await User.create({ ...req.body }).then(() => {
    res.status(200).json({
      result: true,
    });
  });
}

module.exports = {
  insert_user,
};
