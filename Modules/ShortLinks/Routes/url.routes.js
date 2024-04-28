import express from "express";
import UrlController from "../Controllers/url.controller.js";
import { authenticateToken } from "../../Auth/Middleware/auth.middleware.js";
import {
  createUrlValidation,
  updateUrlValidation,
} from "../Validations/url.validation.js";

const urlController = new UrlController();
const router = express.Router();

router.post(
  "/url/add-url",
  createUrlValidation,
  authenticateToken,
  urlController.addUrl
);
router.post(
  "/url/update-url",
  updateUrlValidation,
  authenticateToken,
  urlController.updateUrl
);
router.get("/:short_code", urlController.getUrlByShortCode);
router.post(
  "/url/get-urls-by-user",
  authenticateToken,
  urlController.getUrlsByUser
);

export default router;
