const { ACCEPTED_DOMAIN } = require("./constants");

const formatResponse = (success, data) => ({ success, data });

const formatJob = (job) => {
  const {
    id,
    data,
    state,
    retrylimit,
    retrycount,
    retrydelay,
    createdon,
    completedon,
  } = job;

  return {
    jobId: id,
    status: state,
    retryLimit: retrylimit,
    retryCount: retrycount,
    retryDelay: retrydelay,
    createdAt: createdon,
    completedAt: completedon,
    ...data,
  };
};

const formatProduct = (product) => {
  const { image_url, created_on, ...rest } = product;

  return {
    imageUrl: image_url,
    createdOn: created_on,
    ...rest,
  };
};

const isValidURL = (url) => {
  try {
    return new URL(url).host.replace("www.", "") === ACCEPTED_DOMAIN;
  } catch (err) {
    return false;
  }
};

module.exports = {
  formatResponse,
  formatJob,
  formatProduct,
  isValidURL,
};
