import mongoose from 'mongoose';
import User from '../models/user.model.js';
import dotenv from 'dotenv';
import connectDB from '../config/db.js';

dotenv.config({ path: './.env.local' }); // Load environment variables

async function seed() {
  await connectDB();

  const email = process.env.SEED_ADMIN_EMAIL || 'admin@local';
  const pwd = process.env.SEED_ADMIN_PASSWORD || 'aquaman123';

  let admin = await User.findOne({ email });

  if (admin) {
    console.log('⚠️ Admin already exists. Updating password and role...');
    admin.password = pwd; // will be hashed by pre-save hook
    admin.role = 'admin';
    await admin.save();
    console.log(`✅ Admin updated: ${email}`);
  } else {
    admin = new User({ email, password: pwd, role: 'admin' });
    await admin.save();
    console.log(`✅ Admin created: ${email}`);
  }

  process.exit(0);
}

seed().catch(err => {
  console.error('❌ Error seeding admin:', err);
  process.exit(1);
});

