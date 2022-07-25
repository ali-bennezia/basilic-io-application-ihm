import config from "../config/config.json";
import { isObjectString } from "./sanitation";
import { getAuthPayload } from "./../contexts/AuthentificationContext";

//Valeurs utiles.
const ONE_DAY_MILISECONDS = 1000 * 3600 * 24;

//Implémentations.
function isAuthPayloadValid(payload) {
  if (payload == null || !payload) return false;

  let currentTime = new Date();
  let issuedAt = new Date(payload.issuedAt);
  let tokenLifetime =
    (payload.rememberMe
      ? parseFloat(config.token.longLifetimeDays)
      : parseFloat(config.token.defaultLifetimeDays)) * ONE_DAY_MILISECONDS;

  return currentTime.getTime() - issuedAt.getTime() < tokenLifetime;
}

function isAuthPayloadNearingExpiration(payload) {
  if (payload == null || !payload) return false;

  let currentTime = new Date();
  let issuedAt = new Date(payload.issuedAt);
  let tokenLifetime =
    (payload.rememberMe
      ? parseFloat(config.token.longLifetimeDays)
      : parseFloat(config.token.defaultLifetimeDays)) * ONE_DAY_MILISECONDS;

  return currentTime.getTime() - issuedAt.getTime() >= tokenLifetime * 0.55;
}

const generatePayloadFromSessionData = (data, rememberMe = false) => {
  return {
    rememberMe: rememberMe,
    issuedAt: new Date(),
    ...data,
  };
};

function processApplicationServerResponse(response, setAuthPayload, navigate) {
  if (
    "data" in response &&
    "status" in response &&
    isObjectString(response.data) &&
    response === "Invalid Token" &&
    response.status === 401
  ) {
    setAuthPayload(null);
    navigate("/connexion");
  }
}

function isUserAuthentified() {
  let authPayload = getAuthPayload();
  return authPayload != null && isAuthPayloadValid(authPayload);
}

export {
  isAuthPayloadValid,
  isAuthPayloadNearingExpiration,
  generatePayloadFromSessionData,
  processApplicationServerResponse,
  isUserAuthentified,
};
