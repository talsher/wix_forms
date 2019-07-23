var validateField = require("./validationUtil");

exports.validateFieldsDuplicates = formFields => {
  // validate form fields for duplicates
  let validationSet = new Set();
  let isValid = true;
  formFields.forEach(field => {
    if (validationSet.has(field.name)) {
      isValid = false;
      return;
    }
    validationSet.add(field.name);
  });

  return isValid;
};

exports.validateSubmission = (formFields, submission) => {
  // validate submission with form fields

  // check there are no extra fields
  if (Object.keys(submission).length > formFields.length)
    return [false, `submission contains uneeded fields`];

  // validate all fields
  res = [true, ""];
  formFields.forEach(field => {
    // validate all required fields
    if (!(field.name in submission)) {
      res = [false, `missing field ${field.name}`];
      return;
    }

    // validate fields by type
    if (!validateField(field.type, submission[field.name])) {
      res = [false, `${field.name} is not of type ${field.type}`];
      return;
    }
  });

  return res;
};
