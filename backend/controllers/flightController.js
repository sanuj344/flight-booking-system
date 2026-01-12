import Flight from "../models/Flight.js";

export const searchFlights = async (req, res) => {
  try {
    const { from, to } = req.query;

    if (!from || !to) {
      return res.status(400).json({ message: "From and To cities required" });
    }

    const flights = await Flight.find({
      departure_city: from,
      arrival_city: to
    }).limit(10);

    res.json(flights);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};
