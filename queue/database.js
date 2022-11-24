const { isEmpty } = require("lodash");
const { Pool } = require("pg");
const { JOB_STATUSES, CRAWL_JOB_QUEUE_NAME } = require("./constants");

const pool = new Pool({ connectionString: process.env.POSTGRES_URI });

const getAllJobs = (status) => {
  return pool
    .query("SELECT * FROM pgboss.job WHERE name = $1 AND state = $2", [
      CRAWL_JOB_QUEUE_NAME,
      status,
    ])
    .then((res) => res.rows)
    .catch((err) => console.error("Error executing query", err.stack));
};

const isUrlExists = (url) => {
  return pool
    .query("SELECT * FROM public.processed_urls WHERE url = $1", [url])
    .then((res) => !isEmpty(res.rows))
    .catch((err) => console.error("Error executing query", err.stack));
};

const addUrl = (id, url, status = JOB_STATUSES.CREATED) => {
  return pool
    .query(
      "INSERT INTO public.processed_urls (id, url, status) VALUES ($1, $2, $3);",
      [id, url, status]
    )
    .then((res) => res.rowCount === 1)
    .catch((err) => console.error("Error executing query", err.stack));
};

const updateJobStatus = (id, status) => {
  return pool
    .query(
      "UPDATE public.processed_urls SET status = $1, updated_at = NOW() WHERE id = $2",
      [status, id]
    )
    .then((res) => res.rowCount === 1)
    .catch((err) => console.error("Error executing query", err.stack));
};

module.exports = {
  getAllJobs,
  isUrlExists,
  addUrl,
  updateJobStatus,
};
