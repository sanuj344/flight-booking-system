import mongoose from "mongoose";

const bookingAttemptSchema = new mongoose.Schema({
  flight_id: { type: String, required: true },
  user_identifier: { type: String, required: true }, // IP or userId
  attempted_at: { type: Date, default: Date.now }
});

export default mongoose.model("BookingAttempt", bookingAttemptSchema);
