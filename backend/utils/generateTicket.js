import PDFDocument from "pdfkit";
import fs from "fs";

export const generateTicket = (booking) => {
  const doc = new PDFDocument();
  const fileName = `ticket-${booking.pnr}.pdf`;

  doc.pipe(fs.createWriteStream(fileName));
  doc.fontSize(16).text("Flight Ticket");
  doc.text(`PNR: ${booking.pnr}`);
  doc.text(`Passenger: ${booking.passenger_name}`);
  doc.text(`Flight: ${booking.airline} - ${booking.flight_id}`);
  doc.text(`Route: ${booking.route}`);
  doc.text(`Price Paid: ₹${booking.price_paid}`);
  doc.text(`Booking Time: ${booking.booking_time}`);
  doc.end();

  return fileName;
};
