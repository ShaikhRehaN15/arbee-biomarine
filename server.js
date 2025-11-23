/**
 * Minimal Next.js Custom Server for SSR Deployment
 * 
 * WHY IS server.js NECESSARY?
 * ===========================
 * 
 * 1. Hosting Panel Compatibility:
 *    - Most Node.js hosting panels (cPanel, Plesk, etc.) expect a server.js entry point
 *    - They look for a file that starts the HTTP server and listens on a port
 *    - Directly using "next start" may not work if the panel needs to control the server lifecycle
 * 
 * 2. Port Configuration:
 *    - Hosting panels dynamically assign ports via PORT environment variable
 *    - server.js reads process.env.PORT and binds to that port
 *    - "next start" uses a default port that may conflict with panel configuration
 * 
 * 3. Network Binding:
 *    - Hosting panels require binding to 0.0.0.0 (all interfaces), not just localhost
 *    - server.js explicitly binds to 0.0.0.0 to accept external connections
 *    - This is crucial for deployment on shared hosting or VPS
 * 
 * 4. Process Management:
 *    - Hosting panels use process managers (PM2, systemd, etc.) that need a clear entry point
 *    - server.js provides a single entry point that panels can start/stop/monitor
 *    - Graceful shutdown handling ensures clean restarts during deployments
 * 
 * 5. Custom Configuration:
 *    - Allows custom middleware, logging, or server-level configurations
 *    - Can integrate with existing Express apps or add custom routing
 *    - Provides hooks for health checks, metrics, etc.
 * 
 * HOW IT WORKS:
 * =============
 * 
 * 1. page.js/app/ files define your routes and components
 * 2. Next.js compiles these into optimized server-side code during "next build"
 * 3. server.js starts an HTTP server that handles all incoming requests
 * 4. Next.js request handler processes routes, SSR, API routes, and static files
 * 5. The server listens on the PORT environment variable (or default 3000)
 * 
 * DEPLOYMENT FLOW:
 * ================
 * 
 * 1. Build: npm run build (creates .next folder with optimized code)
 * 2. Start: npm start (runs server.js)
 * 3. Hosting panel sets PORT environment variable
 * 4. server.js binds to 0.0.0.0:PORT
 * 5. All requests are handled by Next.js through the custom server
 * 
 * NOTE: This uses CommonJS (require) for maximum compatibility with hosting panels
 */

const { createServer } = require('http');
const { parse } = require('url');
const next = require('next');

// Configuration
const dev = process.env.NODE_ENV !== 'production';
const hostname = process.env.HOSTNAME || '0.0.0.0'; // Bind to all interfaces for hosting panels
const port = parseInt(process.env.PORT || '3000', 10);

// Create Next.js app instance
const app = next({ 
  dev,
  hostname: dev ? 'localhost' : hostname,
});

// Get Next.js request handler (handles all routes, SSR, API routes, static files)
const handle = app.getRequestHandler();

// Start server
app.prepare().then(() => {
  // Create HTTP server
  const server = createServer(async (req, res) => {
    try {
      const parsedUrl = parse(req.url, true);
      // Handle request through Next.js (routes, SSR, API, static files)
      await handle(req, res, parsedUrl);
    } catch (err) {
      console.error('Error handling request:', err);
      res.statusCode = 500;
      res.end('Internal Server Error');
    }
  });

  // Start listening
  server.listen(port, hostname, (err) => {
    if (err) {
      console.error('Failed to start server:', err);
      process.exit(1);
    }
    console.log(`> Ready on http://${hostname === '0.0.0.0' ? 'localhost' : hostname}:${port}`);
    console.log(`> Environment: ${dev ? 'development' : 'production'}`);
  });

  // Graceful shutdown
  const shutdown = (signal) => {
    console.log(`${signal} received: closing server`);
    server.close(() => {
      console.log('Server closed');
      process.exit(0);
    });
    // Force shutdown after 10 seconds
    setTimeout(() => {
      console.error('Forced shutdown after timeout');
      process.exit(1);
    }, 10000);
  };

  process.on('SIGTERM', () => shutdown('SIGTERM'));
  process.on('SIGINT', () => shutdown('SIGINT'));

}).catch((err) => {
  console.error('Error starting server:', err);
  process.exit(1);
});
