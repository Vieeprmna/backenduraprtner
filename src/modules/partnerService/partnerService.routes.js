import express from "express";
import { getPartnerServicesHandler, assignPartnerServiceHandler, deletePartnerServiceHandler } from "./partnerService.controller.js";

const router = express.Router();

router.get("/", getPartnerServicesHandler);
router.post("/", assignPartnerServiceHandler);
router.delete("/:id", deletePartnerServiceHandler);

export default router;
