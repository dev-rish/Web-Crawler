const { Router } = require("express");
const { StatusCodes } = require("http-status-codes");

const { formatResponse, isValidURL } = require("../utils");
const boss = require("../boss");
const { addUrl, isUrlExists } = require("../database");
const {
  CRAWL_JOB_QUEUE_NAME,
  RETRY_LIMIT,
  RETRY_DELAY,
} = require("../constants");

const router = Router();

router.post("/create-job", async (req, res) => {
  const { jobName, jobUrl, retryLimit, retryDelay } = req.body;

  if (!jobName || !isValidURL(jobUrl)) {
    return res.sendStatus(StatusCodes.BAD_REQUEST);
  }

  try {
    if (await isUrlExists(jobUrl)) {
      return res
        .status(StatusCodes.BAD_REQUEST)
        .send(formatResponse(false, { error: "Url already exists" }));
    }

    const jobId = await boss.send(
      CRAWL_JOB_QUEUE_NAME,
      { jobName, jobUrl },
      {
        retryDelay: retryDelay || RETRY_DELAY,
        retryLimit: retryLimit || RETRY_LIMIT,
      }
    );

    await addUrl(jobId, jobUrl);

    res.send(formatResponse(true, { jobId }));
  } catch (err) {
    console.log(err);
    res.sendStatus(StatusCodes.INTERNAL_SERVER_ERROR);
  }
});

module.exports = router;
