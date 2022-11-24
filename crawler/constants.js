const BASE_URL = "http://localhost:4000";

const IMAGE_SELECTOR =
  "img.ProductPreviewSliderstyle__Image-sc-1t0tp5v-2.grpdtf";
const PRODUCT_BRAND_SELECTOR =
  "h1.BrandProductNameAndTypestyle__Wrapper-sc-117vbmi-0.ihnFtO > a";
const PRODUCT_NAME_SELECTOR =
  "h1.BrandProductNameAndTypestyle__Wrapper-sc-117vbmi-0.ihnFtO > span.BrandProductNameAndTypestyle__BrandName-sc-117vbmi-2.hRyxVn";

const JOB_STATUSES = {
  CREATED: "created",
  ACTIVE: "active",
  COMPLETED: "completed",
  FAILED: "failed",
  EXPIRED: "expired",
  CANCELLED: "cancelled",
};

module.exports = {
  BASE_URL,
  IMAGE_SELECTOR,
  PRODUCT_BRAND_SELECTOR,
  PRODUCT_NAME_SELECTOR,
  JOB_STATUSES,
};
