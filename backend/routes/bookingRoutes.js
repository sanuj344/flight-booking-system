import express from "express";
import Flight from "../models/Flight.js";
import Wallet from "../models/Wallet.js";
import Booking from "../models/Booking.js";
import { v4 as uuid } from "uuid";
import { applySurgePricing } from "../utils/surgePricing.js";

const router = express.Router();

router.post("/", async (req, res) => {
  const { passenger_name, flight_id } = req.body;

  const flight = await Flight.findOne({ flight_id });
  if (!flight) return res.status(404).json({ message: "Flight not found" });

  let wallet = await Wallet.findOne();
  if (!wallet) wallet = await Wallet.create({});

  flight.current_price = applySurgePricing(flight, 3).current_price;
  await flight.save();

  if (wallet.balance < flight.current_price) {
    return res.status(400).json({ message: "Insufficient wallet balance" });
  }

  wallet.balance -= flight.current_price;
  await wallet.save();

  const booking = await Booking.create({
    passenger_name,
    flight_id,
    airline: flight.airline,
    route: `${flight.departure_city} → ${flight.arrival_city}`,
    price_paid: flight.current_price,
    booking_time: new Date(),
    pnr: uuid().slice(0, 8).toUpperCase()
  });

  res.json(booking);
});

export default router;
