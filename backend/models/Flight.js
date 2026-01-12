import mongoose from "mongoose";

const flightSchema = new mongoose.Schema({
  flight_id: { type: String, required: true },
  airline: String,
  departure_city: String,
  arrival_city: String,
  base_price: Number,
  current_price: Number,
  last_price_reset: Date
});

export default mongoose.model("Flight", flightSchema);
