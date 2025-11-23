import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import app from './app.js';
import connectDB from './config/db.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config({ path: path.resolve(__dirname, '../.env.local') });

console.log('Server - MONGODB_URI:', process.env.MONGODB_URI ? 'Loaded' : 'Undefined');
console.log('Server - GOOGLE_CREDENTIALS:', process.env.GOOGLE_CREDENTIALS ? 'Loaded' : 'Undefined');

connectDB();

const PORT = process.env.PORT || 5001;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});


