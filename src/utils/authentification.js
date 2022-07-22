import config from "../config/config.json";

//Valeurs utiles.
const ONE_DAY_MILISECONDS = 1000 * 3600 * 24;

//Implémentations.
function isAuthPayloadValid(payload) {
  if (payload == null || !payload) return false;

  let currentTime = new Date();
  let issuedAt = payload.issueAt;
  let tokenLifetime =
    (payload.rememberMe
      ? parseFloat(config.token.longLifetimeDays)
      : parseFloat(config.token.defaultLifetimeDays)) * ONE_DAY_MILISECONDS;

  return currentTime.getTime() - issuedAt.getTime() < tokenLifetime;
}

function isAuthPayloadNearingExpiration(payload) {
  if (payload == null || !payload) return false;

  let currentTime = new Date();
  let issuedAt = payload.issueAt;
  let tokenLifetime =
    (payload.rememberMe
      ? parseFloat(config.token.longLifetimeDays)
      : parseFloat(config.token.defaultLifetimeDays)) * ONE_DAY_MILISECONDS;

  return currentTime.getTime() - issuedAt.getTime() >= tokenLifetime * 0.55;
}

export { isAuthPayloadValid, isAuthPayloadNearingExpiration };
