import express, { type Express } from "express";
import fs from "fs";
import path from "path";

export function setupStaticServing(app: Express) {
  // Try multiple possible locations for static files
  const possiblePaths = [
    path.resolve(import.meta.dirname, "public"), // Expected by serveStatic in vite.ts
    path.resolve(import.meta.dirname, "..", "dist", "public"), // Actual vite build output
    path.resolve(import.meta.dirname, "..", "server", "public"), // Alternative location
  ];

  let staticPath: string | null = null;

  // Find the first existing path
  for (const testPath of possiblePaths) {
    if (fs.existsSync(testPath)) {
      staticPath = testPath;
      console.log(`Found static files at: ${staticPath}`);
      break;
    }
  }

  if (!staticPath) {
    console.warn(`Warning: Could not find static files in any of: ${possiblePaths.join(", ")}`);
    console.warn("Static file serving will be disabled. Make sure to run 'npm run build' before production deployment.");
    
    // Fallback: serve a simple message for non-API routes
    app.use("*", (req, res) => {
      if (req.originalUrl.startsWith("/api")) {
        return res.status(404).json({ error: "API endpoint not found" });
      }
      
      res.status(503).send(`
        <html>
          <head><title>Build Required</title></head>
          <body>
            <h1>Application Build Required</h1>
            <p>The frontend build is missing. Please run <code>npm run build</code> to generate the production assets.</p>
            <p>For development, use <code>npm run dev</code> instead.</p>
          </body>
        </html>
      `);
    });
    return;
  }

  // Serve static files with proper caching headers for production
  app.use(express.static(staticPath, {
    maxAge: process.env.NODE_ENV === "production" ? "1y" : "0",
    etag: true,
    lastModified: true,
  }));

  // SPA fallback - serve index.html for any non-API routes
  app.use("*", (req, res) => {
    // Don't serve index.html for API routes
    if (req.originalUrl.startsWith("/api")) {
      return res.status(404).json({ error: "API endpoint not found" });
    }
    
    res.sendFile(path.resolve(staticPath!, "index.html"));
  });
}