import Flight from "../models/Flight.js";
import Wallet from "../models/Wallet.js";
import Booking from "../models/Booking.js";
import { v4 as uuid } from "uuid";
import { applySurgePricing } from "../utils/surgePricing.js";
import BookingAttempt from "../models/BookingAttempt.js";

export const createBooking = async (req, res) => {
  try {
    const { passenger_name, flight_id } = req.body;
    const userIdentifier = req.ip; // user identity

    if (!passenger_name || !flight_id) {
      return res.status(400).json({ message: "Missing booking details" });
    }

    const flight = await Flight.findOne({ flight_id });
    if (!flight) {
      return res.status(404).json({ message: "Flight not found" });
    }

    // ⏱ Time windows
    const fiveMinutesAgo = new Date(Date.now() - 5 * 60 * 1000);

    // Count attempts in last 5 minutes
    const attemptCount = await BookingAttempt.countDocuments({
      flight_id,
      user_identifier: userIdentifier,
      attempted_at: { $gte: fiveMinutesAgo }
    });

    // Apply surge pricing
    applySurgePricing(flight, attemptCount + 1);
    await flight.save();

    // Wallet
    let wallet = await Wallet.findOne();
    if (!wallet) wallet = await Wallet.create({});

    if (wallet.balance < flight.current_price) {
      return res.status(400).json({ message: "Insufficient wallet balance" });
    }

    // Deduct balance
    wallet.balance -= flight.current_price;
    await wallet.save();

    // Save booking attempt
    await BookingAttempt.create({
      flight_id,
      user_identifier: userIdentifier
    });

    // Save booking
    const booking = await Booking.create({
      passenger_name,
      flight_id,
      airline: flight.airline,
      route: `${flight.departure_city} → ${flight.arrival_city}`,
      price_paid: flight.current_price,
      booking_time: new Date(),
      pnr: uuid().slice(0, 8).toUpperCase()
    });

    res.status(201).json({
      message: "Booking successful",
      surgeApplied: attemptCount + 1 >= 3,
      booking
    });

  } catch (error) {
    res.status(500).json({ message: "Booking failed" });
  }
};

export const getBookingHistory = async (req, res) => {
  try {
    const bookings = await Booking.find().sort({ booking_time: -1 });
    res.json(bookings);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch bookings" });
  }
};
