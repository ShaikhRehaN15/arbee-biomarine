import express from 'express';
import authRoutes from './auth.routes.js';
import reportsRoutes from './reports.routes.js';
import enquiryRoutes from './enquiry.routes.js'; // Import new enquiry routes

const router = express.Router();

router.use('/auth', authRoutes);
router.use('/reports', reportsRoutes);
router.use('/enquiry', enquiryRoutes); // Use new enquiry routes

export default router;
