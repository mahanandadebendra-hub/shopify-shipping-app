09.01 09:24
import { Router } from "express";
import { Parser } from "json2csv";
import PDFDocument from "pdfkit";

export default function apiReports(prisma, logger) {
  const router = Router();

  router.get("/export.csv", async (req, res) => {
    try {
      const labels = await prisma.orderLabel.findMany();
      const parser = new Parser();
      const csv = parser.parse(labels);
      res.header("Content-Type", "text/csv");
      res.attachment("report.csv");
      res.send(csv);
    } catch (err) {
      logger.error(err);
      res.status(500).send("Failed to export CSV");
    }
  });

  router.get("/export.pdf", async (req, res) => {
    try {
      const labels = await prisma.orderLabel.findMany();
      const doc = new PDFDocument();
      res.setHeader("Content-Type", "application/pdf");
      res.setHeader("Content-Disposition", "attachment; filename=report.pdf");

      doc.pipe(res);
      doc.fontSize(18).text("Shipping Labels Report", { align: "center" });
      doc.moveDown();
      labels.forEach((l) => {
        doc.fontSize(12).text(`Order: ${l.orderId}, Carrier: ${l.carrier}, Status: ${l.status}`);
      });
      doc.end();
    } catch (err) {
      logger.error(err);
      res.status(500).send("Failed to export PDF");
    }
  });

  return router;
}
