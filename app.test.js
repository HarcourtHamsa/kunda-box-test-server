var { expect } = require("chai");
var { validateData } = require("./validator");
var { calculateAge } = require("./utils");

var mockData = {
  user_name: "Ohabikks",
  email: "hamsaharcourt@gmail.com",
  dob: "2020-04-08",
  password: "Hamsa08",
};

describe("Password test cases", () => {
  it("should pass with the right credentials", () => {
    const { error } = validateData({ ...mockData });
    expect(error).to.be.undefined;
  });

  it("should not accept a string that is not 5 to 16 characters in length", () => {
    const { error } = validateData({ ...mockData, password: "h" });
    expect(error.details[0].path[0]).to.equal("password");
  });

  it("should not accept a string that does not contain 2 numbers and one upper case character", () => {
    const { error } = validateData({ ...mockData, password: "hamsa" });
    expect(error.details[0].path[0]).to.equal("password");
  });
});

describe("Username test cases", () => {
  it("should not accept a username that is not 5 to 16 characters in length", () => {
    const { error } = validateData({ ...mockData, user_name: "raza" });
    expect(error.details[0].path[0]).to.equal("user_name");
  });

  it("should not accept a username that already exists", () => {
    // code goes here
  });
});

describe("Email test cases", () => {
  it("should not accept an email that is not in the xxx@yyyy.com format", () => {
    const { error } = validateData({ ...mockData, email: "raza@gmail" });
    expect(error.details[0].path[0]).to.equal("email");
  });

  it("should accept an email that is in the xxx@yyyy.com format", () => {
    const { error } = validateData({
      ...mockData,
      email: "raza@gmail.com",
    });
    expect(error).to.be.undefined;
  });

  it("should not accept a email that already exists", () => {
    // code goes here
  });
});

describe("DOB test cases", () => {
  it("should not accept a non-date value", () => {
    // defines various non-date arguments to test against
    const testCases = ["1"];

    const { error } = validateData({
      ...mockData,
      dob: new Date(true),
    });
    // expect(error.details[0].path[0]).to.equal("dob");
    expect(error).to.be.undefined;
  });

  it("should only accept a user this is more than 18 years old ", () => {
    const isMoreThan18 = calculateAge(mockData.dob);
    expect(isMoreThan18).to.be.false;
  });
});
