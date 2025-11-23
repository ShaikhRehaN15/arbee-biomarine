import parseMultipartForm from '../utils/formidable.js'; // Re-use formidable for enquiry file uploads
import { google } from 'googleapis';
import fs from 'fs';

const SPREADSHEET_ID = process.env.GOOGLE_SHEET_ID;
const DRIVE_FOLDER_ID = process.env.GOOGLE_DRIVE_FOLDER_ID;

export async function submitEnquiry(req, res) {
  try {
    if (!process.env.GOOGLE_CREDENTIALS) {
      throw new Error('GOOGLE_CREDENTIALS not found in environment');
    }

    // Parse credentials JSON
    const credentials = JSON.parse(process.env.GOOGLE_CREDENTIALS);

    // Replace escaped newlines with actual newlines
    credentials.private_key = credentials.private_key.replace(/\\n/g, '\n');

    const { fields, files } = await parseMultipartForm(req);

    console.log('Fields:', fields);
    console.log('Files:', files);

    // Authenticate with Google Sheets + Drive
    const auth = new google.auth.GoogleAuth({
      credentials,
      scopes: [
        'https://www.googleapis.com/auth/spreadsheets',
        'https://www.googleapis.com/auth/drive', // Better: full drive access
      ],
    });

    const sheets = google.sheets({ version: 'v4', auth });
    const drive = google.drive({ version: 'v3', auth });

    // Helper function: upload to Google Drive & return shareable link
    async function uploadToDrive(file, label) {
      if (!file) return 'N/A';
    
      const fileMetadata = {
        name: `${Date.now()}_${label}_${file.originalFilename}`,
        parents: [DRIVE_FOLDER_ID], // This should be a folder *inside* the Shared Drive
        // Or omit parents if uploading directly to Shared Drive root
      };
    
      const media = {
        mimeType: file.mimetype,
        body: fs.createReadStream(file.filepath),
      };
    
      try {
        const driveFile = await drive.files.create({
          requestBody: fileMetadata,
          media,
          fields: 'id',
          supportsAllDrives: true, // 👈 REQUIRED for Shared Drives
          // useDomainAdminAccess: true, // Optional: only if using domain-wide delegation
        });
    
        const fileId = driveFile.data.id;
    
        // Share publicly (optional – better to restrict access)
        await drive.permissions.create({
          fileId,
          requestBody: {
            role: 'reader',
            type: 'anyone',
          },
          supportsAllDrives: true, // 👈 Also needed here
        });
    
        return `https://drive.google.com/file/d/${fileId}/view?usp=sharing`;
      } catch (uploadError) {
        console.error('Error uploading to Drive:', uploadError);
        return 'Upload failed';
      }
    }

    // Upload files to Google Drive
    const addressProofLink = await uploadToDrive(files.address_proof, 'address_proof');
    const aadhaarProofLink = await uploadToDrive(files.aadhaar_proof, 'aadhaar_proof');

    const timestamp = new Date().toISOString();

    // Prepare row data for Google Sheets
    const rowData = [
      fields.name || '',
      fields.age || '',
      fields.sex || '',
      fields.address || '',
      addressProofLink,
      fields.aadhaar || '',
      aadhaarProofLink,
      fields.aid_nature || '',
      fields.amount_figures || '',
      fields.amount_words || '',
      fields.aid_details || '',
      fields.applied_other || '',
      fields.email || '',
      fields.topic_enquiry || '',
      fields.comments || '',
      timestamp,
    ];

    // Append row to Google Sheet
    await sheets.spreadsheets.values.append({
      spreadsheetId: SPREADSHEET_ID,
      range: 'Sheet1!A:A',
      valueInputOption: 'USER_ENTERED',
      resource: {
        values: [rowData],
      },
    });

    res.status(200).json({ success: true, message: 'Enquiry submitted successfully' });
  } catch (error) {
    console.error('Error submitting enquiry:', error);
    res.status(500).json({ success: false, error: error.message });
  }
}





