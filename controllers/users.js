const User = require("../models/user");
const { newUserValidator } = require("../validator");

function calculateAge(dob) {
  let TODAY = new Date(Date.now());
  let EIGHTEEN_YEARS_BACK = new Date(
    new Date(TODAY).getDate() +
      "/" +
      new Date(TODAY).getMonth() +
      "/" +
      (new Date(TODAY).getFullYear() - 18)
  );
  let USER_INPUT = new Date(dob);
  let result = EIGHTEEN_YEARS_BACK > USER_INPUT;
  return result;
}

async function insert_user(req, res) {
  const { error } = newUserValidator(req.body);

  // checks JOI errors
  if (error) {
    const errorPath = error.details[0].path[0];

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
