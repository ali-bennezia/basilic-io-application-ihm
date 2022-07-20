//Utilitaires
import { isObjectString, isObjectNullOrUndefined } from "./sanitation";

//Configuration
import validationConfig from "./../config/validation.json";

const validation = validationConfig.validation;

//Expressions régulières

const specialCharactersAndSpacesFormat =
  /[`!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~\s]/;
const specialCharactersFormat = /[`!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/;
const trueOrFalseFormat = /^(true|false)$/;

const onlyDigitsFormat = /^[0-9]+$/;
const onlyCapitalCharsOrDigitsFormat = /^[A-Z0-9]+$/;

const emailFormat = /^[\w-\.]+@[\w-\.]+$/;

//Implémentations

/*
    Pour toutes les méthodes de validation:
    Retournes un objet de la forme : {result:<booléenne>, err:<chaine de charactère>}
    Avec result étant le résultat de la validation, err une chaine de charactère qui représente la nature de l'erreur empêchant la validation.

    result: true si bon, false sinon.
    err: 'length' si longueur incorrecte, 'char' si présence de charactères interdits, 'format' si format incorrect, 'val' si type incorrect
*/

function validateEmail(val) {
  //Sanitation.
  if (isObjectNullOrUndefined(val) || !isObjectString(val))
    return { result: false, err: "val" };

  //Validation.
  //Validation de la taille de la chaîne de charactères.
  if (
    val.length < validation.user.email.length.min ||
    val.length > validation.user.email.length.max
  )
    return { result: false, err: "length" };

  //Validation du format
  if (!val.match(emailFormat)) return { result: false, err: "format" };

  return { result: true, err: null };
}

function validatePhoneNumber(val) {
  //Sanitation.
  if (isObjectNullOrUndefined(val) || !isObjectString(val))
    return { result: false, err: "val" };

  //Validation.
  //Validation de la taille de la chaîne de charactères.
  if (
    val.length < validation.user.phoneNumber.length.min ||
    val.length > validation.user.phoneNumber.length.max
  )
    return { result: false, err: "length" };

  //Validation du format
  if (!val.match(onlyDigitsFormat)) return { result: false, err: "format" };

  return { result: true, err: null };
}

function validateUsername(val) {
  //Sanitation.
  if (isObjectNullOrUndefined(val) || !isObjectString(val))
    return { result: false, err: "val" };

  //Validation.
  //Validation de la taille de la chaîne de charactères.
  if (
    val.length < validation.user.nomUtilisateur.length.min ||
    val.length > validation.user.nomUtilisateur.length.max
  )
    return { result: false, err: "length" };

  //Validation des charactères (pas de charactères spéciaux ou d'espaces)
  if (val.match(specialCharactersAndSpacesFormat))
    return { result: false, err: "char" };

  return { result: true, err: null };
}

function validatePassword(val) {
  //Sanitation.
  if (isObjectNullOrUndefined(val) || !isObjectString(val))
    return { result: false, err: "val" };

  //Validation.
  //Validation de la taille de la chaîne de charactères.
  if (
    val.length < validation.user.pwd.length.min ||
    val.length > validation.user.pwd.length.max
  )
    return { result: false, err: "length" };

  //Validation des charactères (pas de charactères spéciaux ou d'espaces)
  if (val.match(specialCharactersAndSpacesFormat))
    return { result: false, err: "char" };

  return { result: true, err: null };
}

//Donne un message d'erreur à afficher selon la valeur err donnée qui correspond à celle renvoyée par les méthodes de validation.
function getValidationErrorMessage(err) {
  switch (err) {
    case "length":
      return "Longueur incorrecte.";

    case "char":
      return "Présence de charactères interdits.";

    case "format":
      return "Format incorrect.";

    default:
      return "";
  }
}

export {
  validateEmail,
  validateUsername,
  validatePhoneNumber,
  validatePassword,
  getValidationErrorMessage,
};
