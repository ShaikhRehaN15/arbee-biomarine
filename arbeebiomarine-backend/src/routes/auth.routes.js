import express from 'express';
import { body } from 'express-validator';
import { register, login, getMe } from '../controllers/auth.controller.js';
import { requireAuth } from '../middleware/auth.middleware.js';

const router = express.Router();

// Email validation that allows local addresses like "admin@local"
const emailValidator = body('email').isEmail({
  allow_underscores: true,
  allow_ip_domain: true,
  domain_specific_validation: false,
  require_tld: false
});

// Register route (optional — remove if you don’t want open registration)
router.post(
  '/register',
  [emailValidator, body('password').isLength({ min: 6 })],
  register
);

// Login route
router.post(
  '/login',
  [emailValidator, body('password').notEmpty()],
  login
);

// Get logged-in user
router.get('/me', requireAuth, getMe);

export default router;


