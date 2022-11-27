# Web Crawler
## About
This can crawl any product page from www.flaconi.de and extract the title, brand, image of that product.
It has 3 parts to it:
#### Job Queue
Responsible for handling multiple jobs aka product URLs to crawl. Ensures that no 2 crawlers get the same job!
#### Dashboard
This is where the status of the Queue & the results from the product URLs crawled are shown
#### Crawler
Monitors the Job Queue & does the actual job aka crawling of the product page after getting details from the Job Queue.

## APIs
### Create Job
Creates & adds the job to the Job Queue which will later be picked by the Crawler.

```
  GET /create-job
```

| Parameter     | Type     | Description                |
| :--------     | :------- | :------------------------- |
| `jobName`     | `string` | **Required**. Any name |
| `jobUrl`      | `string` | **Required**. Url to product page |
| `retryLimit`  | `number` | **Optional**. No. of time to retry in case job fails  |
| `retryDelay`  | `number` | **Optional**. Delay in seconds between retries |

Example: ```
{
    "jobName": "Example Job Name",
    "retryLimit": 3,
    "retryDelay": 5
    "jobUrl": "https://www.flaconi.de/pflege/flaconi/24-love-brands/flaconi-24-love-brands-men-s-edition-adventskalender.html#sku=80070786-1"
}```

### Get Job
Returns a Job from the Queue and marks status of that Job as active. This API is primarily used by Crawlers. Ensures that the same job is not returned more than once except when the job fails.
```
PATCH /get-job
```


### Update Job Status
Updates the status of the Job in the Queue. This API is primarily used by Crawlers. Possible values of status: `completed` or `failed`. If the job is marked as `failed`, it will be picked by up the crawler again depending upon the parameters provided while creating the job.

```
PATCH /update-job
```

| Parameter     | Type     | Description                |
| :--------     | :------- | :------------------------- |
| `jobId`       | `string` | **Required**. |
| `status`      | `string` | **Required**. `completed` or `failed` |

Example: ```
{
    "jobId": "some-job-id",
    "status": "completed"
}```

### Get all Jobs
Returns all the Jobs matching the `status` query. This API is primarily used by Crawlers.
This does not updates the status of the Jobs.

```
GET /get-jobs?status=${status}
```
| Parameter     | Type     | Description                |
| :--------     | :------- | :------------------------- |
| `status`      | `string` | **Required**. `created`, `active`, `completed` or `failed` |



### Get Products
Used by the dashboard to list all the products resulting after performing jobs. Used by dashboard to show list of all the products,

```
GET /products
```
| Parameter     | Type     | Description                |
| :--------     | :------- | :------------------------- |
| `jobId`       | `string` | **Required**. |
| `status`      | `string` | **Required**. `completed` or `failed` |

Example: ```
{
    "jobId": "some-job-id",
    "status": "completed"
}```

## Installation
The project was tested on Node 18 & Postgres 14.

#### 1. Setup env file
Rename `.env.example` to `.env` and update the contents of the file accordingly for `queue` & `crawler`.
#### 2. Install dependencies
Run the following command in `queue` followed by `crawler`
```
npm ci
npm run dev
```

For production environments...
```
npm ci
npm run start
```

### Docker
If you are using Docker, simply update the Postgres DB credentials in `docker-compose.yml` file (steps above not required) and run

```
docker-compose up -d
```
