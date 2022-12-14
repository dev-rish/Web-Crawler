const { Router } = require("express");
const { isEmpty } = require("lodash");
const { StatusCodes } = require("http-status-codes");

const { formatResponse, formatJob, isValidURL } = require("../utils");
const boss = require("../boss");
const { addUrl, isUrlExists, updateJobStatus, getAllJobs } = require("../database");
const {
  CRAWL_JOB_QUEUE_NAME,
  RETRY_LIMIT,
  RETRY_DELAY,
  JOB_STATUSES,
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

router.patch("/get-job", async (req, res) => {
  try {
    let job = await boss.fetch(CRAWL_JOB_QUEUE_NAME, 1, {
      includeMetadata: true,
    });

    if (isEmpty(job)) {
      return res.send(formatResponse(true, null));
    }
    job = job[0];

    await updateJobStatus(job.id, JOB_STATUSES.ACTIVE);

    res.send(formatResponse(true, formatJob(job)));
  } catch (err) {
    console.log(err);
    res.sendStatus(StatusCodes.INTERNAL_SERVER_ERROR);
  }
});

router.patch("/update-job", async (req, res) => {
  const { jobId, status } = req.body;

  if (!jobId || !status) {
    return res.sendStatus(StatusCodes.BAD_REQUEST);
  }

  try {
    switch (status) {
      case JOB_STATUSES.COMPLETED:
        await boss.complete(jobId);
        break;
      case JOB_STATUSES.FAILED:
        await boss.fail(jobId);
        break;
    }

    res.send(formatResponse(true, { jobId }));
  } catch (err) {
    console.log(err);
    res.sendStatus(StatusCodes.INTERNAL_SERVER_ERROR);
  }
});

router.get("/get-jobs", async (req, res) => {
  const { status } = req.query;

  if (!Object.values(JOB_STATUSES).includes(status)) {
    return res.sendStatus(StatusCodes.BAD_REQUEST);
  }

  try {
    const jobs = await getAllJobs(status);
    if (isEmpty(jobs)) {
      return res.send(formatResponse(true, []));
    }
    res.send(formatResponse(true, jobs.map(formatJob)));
  } catch (err) {
    console.log(err);
    res.sendStatus(StatusCodes.INTERNAL_SERVER_ERROR);
  }
});

module.exports = router;
