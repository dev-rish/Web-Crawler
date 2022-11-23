const { ACCEPTED_DOMAIN } = require("./constants");

const formatResponse = (success, data) => ({ success, data });

const isValidURL = (url) => {
  try {
    return new URL(url).host.replace("www.", "") === ACCEPTED_DOMAIN;
  } catch (err) {
    return false;
  }
};

module.exports = {
  formatResponse,
  isValidURL,
};
