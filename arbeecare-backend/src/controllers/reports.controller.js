import Report from '../models/report.model.js';
import parseMultipartForm from '../utils/formidable.js';
import path from 'path';
import fs from 'fs';

export async function listReports(req, res) {
  try {
    const reports = await Report.find({}).sort({ createdAt: -1 });
    res.status(200).json(reports);
  } catch (error) {
    console.error('Error fetching reports:', error);
    res.status(500).json({ message: 'Server error' });
  }
}

export async function uploadReport(req, res) {
  try {
    const { fields, files } = await parseMultipartForm(req);

    const file = files.file; // ✅ matches frontend FormData.append("file", ...)

    if (!file) {
      return res.status(400).json({ message: "No report file uploaded" });
    }

    const newReport = await Report.create({
      title: fields.title || file.originalFilename,
      filePath: path.join('/uploads/reports', file.newFilename),
      uploadedBy: req.user._id,
    });

    res.status(201).json(newReport);
  } catch (error) {
    console.error('Error uploading report:', error);
    res.status(500).json({ message: 'Error uploading file' });
  }
}


export async function deleteReport(req, res) {
  const { id } = req.params;

  try {
    const report = await Report.findById(id);
    if (!report) {
      return res.status(404).json({ message: 'Report not found' });
    }

    // Delete file from disk
    const filePath = path.join(process.cwd(), 'public', report.filePath);
    fs.unlink(filePath, (err) => {
      if (err) console.error('Error deleting file from disk:', err);
    });

    await report.deleteOne();

    res.status(200).json({ message: 'Report deleted successfully' });
  } catch (error) {
    console.error('Error deleting report:', error);
    res.status(500).json({ message: 'Server error' });
  }
}

// ✅ Add this export to fix the import erro };

