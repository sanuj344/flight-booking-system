export const applySurgePricing = (flight, attemptCount) => {
  const now = Date.now();
  const lastReset = new Date(flight.last_price_reset).getTime();

  // Reset after 10 minutes
  if (now - lastReset > 10 * 60 * 1000) {
    flight.current_price = flight.base_price;
    flight.last_price_reset = new Date();
  }

  // Apply surge
  if (attemptCount >= 3) {
    flight.current_price = Math.round(flight.current_price * 1.1);
  }

  return flight;
};
