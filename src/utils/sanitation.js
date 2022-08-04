//Sanitation des valeurs.

const isObjectString = (obj) => typeof obj == "string" || obj instanceof String;
const isObjectNullOrUndefined = (obj) => obj == null || obj == undefined;
const isStringBlank = (obj) => obj.replace(" ", "").length == 0;

export { isObjectString, isObjectNullOrUndefined, isStringBlank };
