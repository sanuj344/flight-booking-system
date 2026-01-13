import PDFDocument from "pdfkit";

export const generateTicketPdf = (booking, res) => {
  const doc = new PDFDocument({ size: "A4", margin: 50 });

  res.setHeader("Content-Type", "application/pdf");
  res.setHeader(
    "Content-Disposition",
    `attachment; filename=ticket-${booking.pnr}.pdf`
  );

  doc.pipe(res);

  doc.fontSize(18).text("Flight Ticket", { align: "center" });
  doc.moveDown();

  doc.fontSize(12);
  doc.text(`PNR: ${booking.pnr}`);
  doc.text(`Passenger Name: ${booking.passenger_name}`);
  doc.text(`Airline: ${booking.airline}`);
  doc.text(`Flight ID: ${booking.flight_id}`);
  doc.text(`Route: ${booking.route}`);
  doc.text(`Price Paid: ₹${booking.price_paid}`);
  doc.text(`Booking Date: ${new Date(booking.booking_time).toLocaleString()}`);

  doc.moveDown();
  doc.text("Thank you for booking with us ✈️");

  doc.end();
};
