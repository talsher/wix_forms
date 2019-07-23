var validateField = require("./validationUtil");

const typeFields = ["text", "color", "date", "email", "tel", "number"];

describe("test field types validation", () => {
  test("test bad fields", () => {
    typeFields.forEach(type => {
      if (type !== "text")
        expect(validateField(type, "bad fields")).toBeFalsy();
    });
  });

  test("test good fields", () => {
    let goodFields = {
      text: "text",
      color: "#cccccc",
      date: "2019-07-18",
      email: "tal@tal.tal",
      tel: "03-7777777",
      number: "123"
    };

    Object.keys(goodFields).forEach(field => {
      expect(validateField(field, goodFields[field])).toBeTruthy();
    });
  });
});
