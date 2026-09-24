import dotenv from 'dotenv';
import type { Server } from "node:http";
import { connectDatabase, disconnectDatabase } from './config/database.js';
import app from "./app.js";

dotenv.config();

const port = process.env.PORT;
let server: Server;

async function initServer() {
  try {
    await connectDatabase();
    console.log('MongoDB connection established successfully.');

    server = app.listen(port, () => {
      console.log(`Server running on port ${port}`);
    });

    // Attach signal listeners for a clean exit
    process.on('SIGTERM', () => handleShutdown('SIGTERM'));
    process.on('SIGINT', () => handleShutdown('SIGINT'));

  } catch (error) {
    console.error('Critical error during server initialization:', error);
    process.exit(1);
  }
}

async function handleShutdown(signal: string) {
  console.log(`\nReceived ${signal}. Starting graceful shutdown process...`);

  if (!server) {
    await disconnectDatabase();
    process.exit(0);
  }

  // Stop the HTTP server from accepting any new connections
  server.close(async (err) => {
    if (err) {
      console.error('Error during HTTP server close:', err);
      process.exit(1);
    }
    console.log('HTTP server stopped accepting new requests.');

    try {
      await disconnectDatabase();
      console.log('Graceful shutdown complete. Exiting process.');
      process.exit(0);
    } catch (dbError) {
      console.error('Error while disconnecting database during shutdown:', dbError);
      process.exit(1);
    }
  });

  // Force exit safety valve
  setTimeout(() => {
    console.error('Could not close connections in time, forcefully shutting down');
    process.exit(1);
  }, 10000);
}

initServer();