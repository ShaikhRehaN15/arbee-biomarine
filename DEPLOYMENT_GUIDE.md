# Next.js SSR Deployment Guide with Custom server.js

## Overview

This guide explains how to deploy your Next.js SSR application using a custom `server.js` file on Node.js hosting panels.

## Why Custom server.js?

### Standard Next.js Deployment
- Uses `next start` command
- Runs on port 3000 by default
- Works well on Vercel, Netlify, and modern platforms

### Custom server.js Benefits
- ✅ Dynamic port configuration (reads from `process.env.PORT`)
- ✅ Works with hosting panels expecting `node server.js`
- ✅ Better error handling and logging
- ✅ Graceful shutdown handling
- ✅ Production-optimized settings

## Prerequisites

1. **Node.js**: Version 18.x or higher
2. **Next.js**: Version 13.x or higher (you're using 15.4.5 ✅)
3. **Build**: Your app must be built before starting the server

## Deployment Steps

### 1. Build Your Application

```bash
npm run build
```

This creates the `.next` directory with optimized production files.

### 2. Start the Server

#### Development
```bash
npm run dev
```

#### Production
```bash
npm start
# or
node server.js
```

### 3. Environment Variables

Create a `.env.production` file or set environment variables on your hosting panel:

```env
NODE_ENV=production
PORT=3000
HOSTNAME=localhost
```

**Important**: Most hosting panels set the `PORT` environment variable automatically. The server.js will use this value.

## Hosting Panel Configuration

### Common Hosting Panels

#### cPanel Node.js
1. Upload your project files
2. Set Node.js version (18.x or higher)
3. Set entry point: `server.js`
4. Set start command: `node server.js`
5. Deploy

#### Plesk Node.js
1. Create Node.js application
2. Set application root: `/path/to/your/app`
3. Set application startup file: `server.js`
4. Set Node.js version: 18.x or higher
5. Deploy

#### Railway / Render / Heroku
1. Connect your Git repository
2. Set build command: `npm run build`
3. Set start command: `node server.js`
4. Set Node.js version: 18.x or higher
5. Deploy

#### VPS / Custom Server
1. SSH into your server
2. Install Node.js 18.x or higher
3. Clone your repository
4. Run `npm install`
5. Run `npm run build`
6. Run `npm start` or use PM2:
   ```bash
   pm2 start server.js --name nextjs-app
   ```

## File Structure

```
your-project/
├── server.js              # Custom server entry point
├── package.json           # Updated with start script
├── next.config.mjs        # Next.js configuration
├── .next/                 # Build output (generated)
├── public/                # Static files
└── src/
    └── app/               # Next.js App Router
        ├── layout.js
        ├── page.js
        └── ...
```

## How It Works

### 1. Server Initialization
```javascript
const app = next({ dev: false });
```
- Creates Next.js app instance
- Loads production build from `.next` directory
- Configures server settings

### 2. Request Handling
```javascript
await handle(req, res, parsedUrl);
```
- Handles all requests through Next.js
- Routes to pages, API routes, and static files
- Performs SSR for server components

### 3. Port Configuration
```javascript
const PORT = parseInt(process.env.PORT || '3000', 10);
```
- Reads port from environment variable
- Falls back to port 3000 if not set
- Works with hosting panels that set PORT

## Troubleshooting

### Port Already in Use
```bash
Error: listen EADDRINUSE: address already in use :::3000
```
**Solution**: Set a different port via `PORT` environment variable or kill the process using port 3000.

### Build Not Found
```bash
Error: Could not find a production build
```
**Solution**: Run `npm run build` before starting the server.

### Module Not Found
```bash
Error: Cannot find module 'next'
```
**Solution**: Run `npm install` to install dependencies.

### Server Not Starting
```bash
Error starting server: ...
```
**Solution**: 
1. Check Node.js version: `node --version` (should be 18.x or higher)
2. Check if `.next` directory exists
3. Check server logs for detailed error messages

## Production Best Practices

### 1. Use Process Manager
Use PM2 or similar process manager for production:
```bash
pm2 start server.js --name nextjs-app
pm2 save
pm2 startup
```

### 2. Set Environment Variables
Set production environment variables:
```env
NODE_ENV=production
PORT=3000
```

### 3. Enable Logging
Monitor server logs for errors and performance issues.

### 4. Use Reverse Proxy
Use Nginx or Apache as reverse proxy:
```nginx
server {
    listen 80;
    server_name yourdomain.com;
    
    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }
}
```

### 5. Enable HTTPS
Use SSL/TLS certificates for secure connections (Let's Encrypt, Cloudflare, etc.).

## Testing Locally

### 1. Build the Application
```bash
npm run build
```

### 2. Start the Server
```bash
npm start
# or
node server.js
```

### 3. Test the Application
Open http://localhost:3000 in your browser.

### 4. Test API Routes
Test your API routes if you have any:
```bash
curl http://localhost:3000/api/your-endpoint
```

## Comparison: Custom Server vs Standard Next.js

| Feature | Custom server.js | Standard next start |
|---------|------------------|---------------------|
| Port Configuration | ✅ Dynamic (env) | ⚠️ Fixed or -p flag |
| Hosting Panel Support | ✅ Works everywhere | ⚠️ Limited support |
| Error Handling | ✅ Customizable | ✅ Default handling |
| Middleware | ✅ Can add custom | ⚠️ Limited |
| Logging | ✅ Customizable | ✅ Default logging |
| Production Ready | ✅ Yes | ✅ Yes |

## Additional Resources

- [Next.js Deployment Documentation](https://nextjs.org/docs/deployment)
- [Next.js Custom Server](https://nextjs.org/docs/pages/building-your-application/configuring/custom-server)
- [Node.js Best Practices](https://github.com/goldbergyoni/nodebestpractices)

## Support

If you encounter issues:
1. Check server logs
2. Verify Node.js version
3. Verify build output exists
4. Check environment variables
5. Test locally first

