var { validateFieldsDuplicates, validateSubmission } = require("./validation");

const typeFields = ["text", "color", "date", "email", "tel", "number"];

describe("testing form validations", () => {
  test("duplicate fields validation", () => {
    let duplicatedFields = [
      { name: "tal", type: "test" },
      { name: "tal", type: "test1" }
    ];

    expect(validateFieldsDuplicates(duplicatedFields)).toBe(false);

    let nonDuplicatedFields = [
      { name: "tal", type: "test" },
      { name: "wix", type: "test" }
    ];

    expect(validateFieldsDuplicates(nonDuplicatedFields)).toBe(true);
  });

  let formFields = [];
  typeFields.forEach(type => {
    formFields.push({
      name: type,
      type: type
    });
  });

  test("submission validation bad fields test", () => {
    let missingFieldsSubmission = {
      field: "wow"
    };

    let [valid, err] = validateSubmission(formFields, missingFieldsSubmission);
    expect(valid).toBeFalsy();

    let extraFieldsSubmission = Object.create(formFields);
    extraFieldsSubmission["extra_fields"] = "wow";

    [valid, err] = validateSubmission(formFields, extraFieldsSubmission);
    expect(valid).toBeFalsy();

    let badNameFieldSubmission = Object.create(formFields);
    extraFieldsSubmission["text"] = "name not in form";

    [valid, err] = validateSubmission(formFields, badNameFieldSubmission);
    expect(valid).toBeFalsy();
  });

  test("submission validation bad fields type", () => {
    let goodForm = {
      text: "text",
      color: "#cccccc",
      date: "2019-07-18",
      email: "tal@tal.tal",
      tel: "03-7777777",
      number: "123"
    };

    [valid, err] = validateSubmission(formFields, goodForm);
    console.log(err);
    expect(valid).toBeTruthy();

    let badFieldSubmission;
    Object.keys(goodForm).forEach(fieldName => {
      badFieldSubmission = Object.create(goodForm);
      if (fieldName !== "text") {
        badFieldSubmission[fieldName] = "bad field";
        [valid, err] = validateSubmission(formFields, badFieldSubmission);
        expect(valid).toBeFalsy();
      }
    });
  });
});
