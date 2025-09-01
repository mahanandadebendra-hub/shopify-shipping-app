09.01 09:14
import PDFDocument from "pdfkit";

export async function generateFallbackLabel(data: {
  orderId: string;
  from: string;
  to: string;
  carrier: string;
}) {
  const doc = new PDFDocument();
  const chunks: Buffer[] = [];

  return new Promise<Buffer>((resolve, reject) => {
    doc.on("data", (chunk) => chunks.push(chunk));
    doc.on("end", () => resolve(Buffer.concat(chunks)));
    doc.on("error", (err) => reject(err));

    doc.fontSize(20).text("Shipping Label", { align: "center" });
    doc.moveDown();
    doc.fontSize(14).text(`Order: ${data.orderId}`);
    doc.text(`Carrier: ${data.carrier}`);
    doc.moveDown();
    doc.text("From:");
    doc.text(data.from);
    doc.moveDown();
    doc.text("To:");
    doc.text(data.to);

    doc.end();
  });
}
