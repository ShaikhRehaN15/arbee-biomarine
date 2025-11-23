import formidable from 'formidable';
import path from 'path';
import fs from 'fs';

export const config = {
  api: {
    bodyParser: false,
  },
};

const uploadDir = path.join(process.cwd(), 'public/uploads/reports');

if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

export default async function parseMultipartForm(req) {
  return new Promise((resolve, reject) => {
    const form = formidable({
      uploadDir,
      keepExtensions: true,
      allowEmptyFiles: false,
      multiples: false,
      filename: (name, ext, part) => {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        return `${part.originalFilename.split('.')[0]}-${uniqueSuffix}${ext}`;
      },
    });

    form.parse(req, (err, fields, files) => {
      if (err) return reject(err);

      const file = files.file ? files.file[0] : null; // Access the first file if multiple files are possible

      if (!file) {
        return reject(new Error('No file uploaded'));
      }
      resolve({ fields, file });
    });
  });
}
