import express from "express";
import axios from "axios";
import cors from "cors";
import dotenv from "dotenv";
dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;
const INVOICE_API_URL = process.env.REACT_APP_INVOICE_API_URL;
const API_KEY = process.env.REACT_APP_INVOICE_MAKER_API_KEY;

app.use(cors());
app.use(express.json({ limit: "1mb" }));

const validateInvoiceData = (req, res, next) => {
  if (!req.body || !req.body.items || !req.body.to) {
    return res.status(400).json({ error: "Invalid invoice data" });
  }
  next();
};

app.post("/generate-invoice", validateInvoiceData, async (req, res) => {
  try {
    const response = await axios({
      method: "post",
      url: INVOICE_API_URL,
      data: req.body,
      headers: {
        Authorization: `Bearer ${API_KEY}`,
        "Content-Type": "application/json",
      },
      responseType: "arraybuffer",
    });

    res.setHeader("Content-Type", "application/pdf");
    res.setHeader("Content-Disposition", 'attachment; filename="invoice.pdf"');
    res.send(Buffer.from(response.data));
  } catch (error) {
    console.error("Error generating invoice:", {
      message: error.message,
      responseData: error.response?.data,
      responseStatus: error.response?.status,
    });

    res.status(500).json({
      message: "Failed to generate invoice",
      details: error.response?.data || error.message,
    });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
