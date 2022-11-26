if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}

const cron = require("node-cron");
const { isEmpty } = require("lodash");
const cheerio = require("cheerio");
const {
  IMAGE_SELECTOR,
  PRODUCT_BRAND_SELECTOR,
  PRODUCT_NAME_SELECTOR,
  JOB_STATUSES,
} = require("./constants");
const { addProduct } = require("./database");
const { fetchData } = require("./utils");

cron.schedule("*/5 * * * * *", async () => {
  let jobId, jobUrl;

  try {
    const { data: job } = await fetchData({
      method: "PATCH",
      url: `${process.env.API_URL}/get-job`,
    });

    if (isEmpty(job)) return;

    jobId = job.jobId;
    jobUrl = job.jobUrl;

    console.log(`Crawling ${jobUrl}...`);

    const productData = await getData(jobUrl);

    if (isEmpty(productData)) {
      await updateJobStatus(jobId, JOB_STATUSES.FAILED);
      return;
    }

    await addProduct({ id: jobId, ...productData });

    await updateJobStatus(jobId, JOB_STATUSES.COMPLETED);
  } catch (err) {
    if (jobId && jobUrl) {
      await updateJobStatus(jobId, JOB_STATUSES.FAILED);
    }
    console.log(`Crawling Failed`, err);
  }
});

async function getData(url) {
  console.log("Getting Data...");

  const html = await fetchData({
    method: "GET",
    url,
    headers: {
      Accept: "text/html",
    },
  });

  if (isEmpty(html)) return;

  const $ = cheerio.load(html);

  return {
    title: $(PRODUCT_NAME_SELECTOR).text(),
    brand: $(PRODUCT_BRAND_SELECTOR).text(),
    imageUrl: $(IMAGE_SELECTOR).attr("src"),
  };
}

async function updateJobStatus(jobId, status) {
  console.log("Updating Job Status");

  return fetchData({
    method: "PATCH",
    url: `${process.env.API_URL}/update-job`,
    data: { jobId, status },
  });
}
