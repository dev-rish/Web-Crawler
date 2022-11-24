const { Pool } = require("pg");

const pool = new Pool({ connectionString: process.env.POSTGRES_URI });

const updateJobStatus = (id, status) => {
  return pool
    .query(
      "UPDATE public.processed_urls SET status = $1, updated_at = NOW() WHERE id = $2",
      [status, id]
    )
    .then((res) => res.rowCount === 1)
    .catch((err) => console.error("Error executing query", err.stack));
};

const addProduct = ({ id, title, brand, imageUrl }) => {
  return pool
    .query(
      "INSERT INTO public.products (id, title, brand, image_url) VALUES ($1, $2, $3, $4);",
      [id, title, brand, imageUrl]
    )
    .then((res) => res.rowCount === 1)
    .catch((err) => console.error("Error executing query", err.stack));
};

module.exports = {
  updateJobStatus,
  addProduct,
};
