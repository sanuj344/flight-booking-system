import mongoose from "mongoose";

const bookingSchema = new mongoose.Schema({
  passenger_name: String,
  flight_id: String,
  airline: String,
  route: String,
  price_paid: Number,
  booking_time: Date,
  pnr: String
});

export default mongoose.model("Booking", bookingSchema);
