import formidable from 'formidable';
import path from 'path';
import fs from 'fs';

const uploadDir = path.join(process.cwd(), 'public/uploads/enquiry_files'); // Changed upload directory for enquiry forms

// Ensure upload directory exists
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

export default async function parseMultipartForm(req) {
  return new Promise((resolve, reject) => {
    const form = formidable({
      uploadDir,
      keepExtensions: true,
      allowEmptyFiles: true, // Allow forms with no files to pass without error
      multiples: true, // Allow multiple files to be uploaded with different names
      filename: (name, ext, part) => {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        const originalExtension = path.extname(part.originalFilename);
        return `${part.originalFilename.split('.')[0]}-${uniqueSuffix}${originalExtension}`;
      },
    });

    form.parse(req, (err, fields, files) => {
      if (err) return reject(err);

      const uploadedFiles = {};
      // formidable's files object contains arrays for each input name
      for (const key in files) {
        if (Array.isArray(files[key]) && files[key].length > 0) {
          uploadedFiles[key] = files[key][0]; // Take the first file if multiple for same input
        }
      }

      // Convert fields arrays to single values for convenience
      const singleFields = {};
      for (const key in fields) {
        singleFields[key] = fields[key][0];
      }

      resolve({ fields: singleFields, files: uploadedFiles }); // Resolve with all files
    });
  });
}
