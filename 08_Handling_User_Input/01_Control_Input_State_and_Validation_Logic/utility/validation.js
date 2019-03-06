// METODO GENERICO DE VALIDACION
const validate = (val, rules, connectedValue) => {
  let isValid = true;
  for (let rule in rules) {
    switch (rule) {
      case "isEmail":
        // ####### IMPORTANTE #######
        // value = value && validation(val)
        // SI ALGUNA VEZ VALUE ES FALSO, NO REVISA EJECUTA MAS EL METODO validation()
        isValid = isValid && emailValidator(val);
        break;
      case "minLength":
        isValid = isValid && minLengthValidator(val, rules[rule]);
        break;
      case "equalTo":
        isValid = isValid && equalToValidator(val, connectedValue[rule]);
        break;
      default:
        isValid = true;
    }
  }
  
  return isValid;
};

const emailValidator = val => {
  // return REGEX_DE_EMAIL.test( val )
  return /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/.test(
    val
  );
};

const minLengthValidator = (val, minLength) => {
    return val.length >= minLength;
};

const equalToValidator = (val, checkValue) => {
    return val === checkValue;
};

export default validate;