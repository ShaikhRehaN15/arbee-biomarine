# Next.js SSR Deployment Guide

## Why server.js is Necessary

### 1. **Hosting Panel Compatibility**
Most Node.js hosting panels (cPanel, Plesk, Heroku, Railway, Render, etc.) expect a `server.js` file as the entry point. They need a clear starting point that:
- Starts an HTTP server
- Listens on a specific port
- Can be controlled by the hosting panel's process manager

### 2. **Dynamic Port Configuration**
Hosting panels assign ports dynamically via the `PORT` environment variable. Your server.js must:
- Read `process.env.PORT` 
- Bind to that port (not a hardcoded port)
- Fallback to a default (3000) if PORT is not set

**Without server.js:** `next start` uses a default port that may conflict with the panel's configuration.

### 3. **Network Binding (0.0.0.0)**
Hosting panels require your server to bind to `0.0.0.0` (all network interfaces), not just `localhost`:
- `localhost` (127.0.0.1) only accepts connections from the same machine
- `0.0.0.0` accepts connections from any IP address (required for external access)

**Without server.js:** Next.js may bind to localhost only, preventing external access.

### 4. **Process Management**
Hosting panels use process managers (PM2, systemd, forever, etc.) that:
- Start your application
- Monitor it for crashes
- Restart it automatically
- Handle graceful shutdowns

**Without server.js:** The panel may not know how to manage your Next.js process properly.

### 5. **Custom Configuration**
server.js allows you to:
- Add custom middleware
- Integrate with Express.js
- Add health check endpoints
- Configure logging
- Set up custom error handling

---

## How It Works

### The Flow:

1. **Development (`npm run dev`):**
   - Next.js dev server handles everything
   - Hot reloading, fast refresh, etc.
   - No server.js needed

2. **Build (`npm run build`):**
   - Next.js compiles your app into optimized code
   - Creates `.next` folder with server-side code
   - Optimizes pages, API routes, static files

3. **Production (`npm start`):**
   - server.js starts an HTTP server
   - Next.js request handler processes all requests
   - Handles SSR, API routes, static files, dynamic routes

### What server.js Does:

```javascript
// 1. Creates Next.js app instance
const app = next({ dev: false });

// 2. Gets request handler (handles all routes)
const handle = app.getRequestHandler();

// 3. Creates HTTP server
const server = createServer(async (req, res) => {
  await handle(req, res, parsedUrl); // All requests go through Next.js
});

// 4. Listens on PORT from environment variable
server.listen(process.env.PORT || 3000, '0.0.0.0');
```

---

## Deployment Steps

### 1. Build Your Application
```bash
npm run build
```
This creates the `.next` folder with optimized production code.

### 2. Start the Server
```bash
npm start
```
This runs `server.js` which starts the HTTP server.

### 3. Environment Variables
Make sure your hosting panel sets:
- `PORT` - Port number (usually set automatically)
- `NODE_ENV=production` - Production mode
- Any other environment variables your app needs

### 4. Hosting Panel Configuration
- **Entry Point:** `server.js`
- **Start Command:** `npm start`
- **Build Command:** `npm run build`
- **Node Version:** Check your package.json or use Node.js 18+

---

## Differences: server.js vs Direct Next.js

### Without server.js (Direct Next.js):
```bash
# package.json
"start": "next start"
```

**Limitations:**
- Uses default port (3000) - may conflict with hosting panel
- May bind to localhost only - no external access
- Limited customization options
- May not work with all hosting panels

### With server.js (Custom Server):
```bash
# package.json
"start": "node server.js"
```

**Advantages:**
- Reads PORT from environment variable
- Binds to 0.0.0.0 for external access
- Full control over server configuration
- Works with all hosting panels
- Can add custom middleware, logging, etc.

---

## Testing Locally

### 1. Build the application:
```bash
npm run build
```

### 2. Start the server:
```bash
npm start
```

### 3. Test with different ports:
```bash
PORT=3001 npm start  # Server runs on port 3001
PORT=8080 npm start  # Server runs on port 8080
```

### 4. Test external access:
```bash
# Server should be accessible from any IP address
curl http://localhost:3000
curl http://127.0.0.1:3000
curl http://0.0.0.0:3000
```

---

## Common Issues

### Issue 1: "Cannot find module 'next'"
**Solution:** Make sure you've installed dependencies:
```bash
npm install
```

### Issue 2: "Port already in use"
**Solution:** The PORT environment variable may conflict. Check what port is set:
```bash
echo $PORT
```

### Issue 3: "Cannot access from external IP"
**Solution:** Make sure server.js binds to `0.0.0.0`, not `localhost`:
```javascript
const hostname = process.env.HOSTNAME || '0.0.0.0';
```

### Issue 4: "Server crashes on startup"
**Solution:** Check that you've built the application first:
```bash
npm run build
```

---

## Production Checklist

- [ ] Build the application: `npm run build`
- [ ] Test server.js locally: `npm start`
- [ ] Set NODE_ENV=production
- [ ] Configure PORT environment variable
- [ ] Set up environment variables (API keys, database URLs, etc.)
- [ ] Test external access
- [ ] Set up process manager (PM2, systemd, etc.)
- [ ] Configure logging
- [ ] Set up monitoring
- [ ] Test graceful shutdown

---

## Example Hosting Panel Configurations

### cPanel/WHM:
- **Application Root:** `/home/username/public_html`
- **Start Command:** `npm start`
- **Node Version:** 18.x or 20.x

### Heroku:
- **Procfile:** `web: npm start`
- **Buildpack:** `heroku/nodejs`
- **PORT:** Set automatically

### Railway:
- **Start Command:** `npm start`
- **Build Command:** `npm run build`
- **PORT:** Set automatically

### Render:
- **Start Command:** `npm start`
- **Build Command:** `npm run build`
- **PORT:** Set automatically

### DigitalOcean App Platform:
- **Run Command:** `npm start`
- **Build Command:** `npm run build`
- **PORT:** Set automatically

---

## Summary

**server.js is necessary because:**
1. Hosting panels need a clear entry point
2. Dynamic port configuration is required
3. External access requires binding to 0.0.0.0
4. Process management needs a controlled server
5. Custom configuration may be needed

**Without server.js:**
- May not work with hosting panels
- Port conflicts
- No external access
- Limited customization

**With server.js:**
- Works with all hosting panels
- Dynamic port configuration
- External access enabled
- Full customization options
- Production-ready deployment

