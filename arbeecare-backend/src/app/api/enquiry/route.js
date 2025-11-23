import express from 'express';
import bodyParser from 'body-parser';
import { appendRow } from "../../lib/googlesheets.js";

const router = express.Router();

// JSON body parsing
router.use(bodyParser.json());

// POST /api/enquiry
router.post('/', async (req, res) => {
  try {
    const data = req.body;
    console.log("Received form data:", data);

    const row = [
      data.name || "",
      data.age || "",
      data.sex || "",
      data.address || "",
      data.aadhaar || "",
      data.aid_nature || "",
      data.amount_figures || "",
      data.amount_words || "",
      data.aid_details || "",
      data.applied_other || "",
      data.organisation_url || "",
      data.email || "",
      data.topic_enquiry || "",
      data.comments || "",
      new Date().toISOString(),
    ];

    await appendRow(row);

    res.json({ success: true, message: 'Enquiry saved to Google Sheets' });
  } catch (error) {
    console.error('Error in enquiry route:', error);
    res.status(500).json({ success: false, error: error.message });
  }
});

export default router;

