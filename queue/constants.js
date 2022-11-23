const CRAWL_JOB_QUEUE_NAME = "CRAWL_JOB_QUEUE";
const RETRY_LIMIT = 3;
const RETRY_DELAY = 5;

const ACCEPTED_DOMAIN = "flaconi.de";

const JOB_STATUSES = {
  CREATED: "created",
  ACTIVE: "active",
  COMPLETED: "completed",
  FAILED: "failed",
  EXPIRED: "expired",
  CANCELLED: "cancelled",
};

module.exports = {
  CRAWL_JOB_QUEUE_NAME,
  JOB_STATUSES,
  ACCEPTED_DOMAIN,
  RETRY_LIMIT,
  RETRY_DELAY,
};
