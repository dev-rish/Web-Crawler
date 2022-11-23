const { isEmpty } = require("lodash");
const { Pool } = require("pg");
const { JOB_STATUSES } = require("./constants");

const pool = new Pool({ connectionString: process.env.POSTGRES_URI });

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

module.exports = {
  isUrlExists,
  addUrl,
};
