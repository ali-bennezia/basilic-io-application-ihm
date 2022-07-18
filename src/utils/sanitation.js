//Sanitation des valeurs.

const isObjectString = (obj) => typeof obj == "string" || obj instanceof String;
const isObjectNullOrUndefined = (obj) => obj == null || obj == undefined;

export { isObjectString, isObjectNullOrUndefined };
