import express from "express";
import {
  createBooking,
  getBookingHistory
} from "../controllers/bookingController.js";
import { downloadTicket } from "../controllers/bookingController.js";



const router = express.Router();
router.get("/:pnr/ticket", downloadTicket);
router.post("/", createBooking);
router.get("/", getBookingHistory);

export default router;
