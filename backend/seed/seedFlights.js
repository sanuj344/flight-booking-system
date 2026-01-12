import mongoose from "mongoose";
import Flight from "../models/Flight.js";
import dotenv from "dotenv";

dotenv.config();

mongoose.connect(process.env.MONGO_URI);

const flights = [
  {
    flight_id: "FL101",
    airline: "IndiGo",
    departure_city: "Delhi",
    arrival_city: "Mumbai",
    base_price: 2500,
    current_price: 2500,
    last_price_reset: new Date()
  },
  {
    flight_id: "FL102",
    airline: "Vistara",
    departure_city: "Delhi",
    arrival_city: "Mumbai",
    base_price: 2700,
    current_price: 2700,
    last_price_reset: new Date()
  }
];

await Flight.insertMany(flights);
console.log("Flights seeded");
process.exit();
