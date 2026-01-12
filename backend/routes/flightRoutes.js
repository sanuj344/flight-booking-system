import express from "express";
import Flight from "../models/Flight.js";

const router = express.Router();

// Search flights
router.get("/search", async (req, res) => {
  const { from, to } = req.query;

  const flights = await Flight.find({
    departure_city: from,
    arrival_city: to
  }).limit(10);

  res.json(flights);
});

export default router;
