import serverless from "serverless-http";
import express from "express";

// Import the existing route registration helper
import { registerRoutes } from "../../server/routes";

// Create a standard Express app instance
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Register all API routes (no need to wait for the returned HTTP server)
registerRoutes(app);

// Export the Netlify-compatible handler
export const handler = serverless(app); 