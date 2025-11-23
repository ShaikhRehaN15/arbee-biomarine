import express from 'express';
import { listReports, uploadReport, deleteReport } from '../controllers/reports.controller.js';
import { requireAuth, requireAdmin } from '../middleware/auth.middleware.js';

const router = express.Router();

router.get('/', listReports);
router.post('/', requireAuth, requireAdmin, uploadReport);
router.delete('/:id', requireAuth, requireAdmin, deleteReport);

export default router;
