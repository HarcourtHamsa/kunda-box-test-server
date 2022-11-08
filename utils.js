function calculateAge(dob) {
  let today = new Date(Date.now());
  let eighteenYearsBack = new Date(
    new Date(today).getDate() +
      "/" +
      new Date(today).getMonth() +
      "/" +
      (new Date(today).getFullYear() - 18)
  );
  let userInput = new Date(dob);
  return eighteenYearsBack > userInput;
}

module.exports = {
  calculateAge,
};
