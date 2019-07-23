var validator = require("validator");

// dictionary of key type and value validation function
const validationFuncDict = {
  text: str => true,
  color: validator.isHexColor,
  date: validator.isISO8601,
  email: validator.isEmail,
  tel: validateTel,
  number: validator.isNumeric
};

// local tel validation function
function validateTel(str) {
  let telPatt = /[0-9]{2,3}-[0-9]{7}/;
  return telPatt.test(str);
}

module.exports = function validateField(type, str) {
  /*
    recive type and string and validate the string is of that type
    @type: string on of [text,color, date, email, tel, number]
    @str: string     
  */
  if (!(type in validationFuncDict)) return false;

  return validationFuncDict[type](str);
};
