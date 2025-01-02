/**
 * Backend server setup
 */
import express from 'express'; // Import the Express framework
import mongoose from 'mongoose'; // Import Mongoose for MongoDB connection and operations
import cors from 'cors'; // Import CORS for handling cross-origin requests
import path from 'path'; // Import Path for handling file paths
import dotenv from 'dotenv'; // Import dotenv to load environment variables
dotenv.config(); // Load environment variables from .env file

import routes from './routes/routes.js'; // Import your routes

/**
 * Initialize variables
 */
const __dirname = path.resolve(); // Resolve the directory path for file handling
const PORT = process.env.PORT; // Get the server's port from environment variables
const app = express(); // Initialize the Express app

/**
 * Middleware setup
 */
// Middleware for parsing incoming JSON request bodies
app.use(express.json());

// Enable CORS to allow cross-origin resource sharing
app.use(cors());

/**
 * MongoDB connection setup
 *
 * Connect to MongoDB using the connection string from environment variables
 *
 * The mongoose.connect() method returns a promise:
 * - The `.then()` method runs on a successful connection.
 * - The `.catch()` method handles errors if the connection fails.
 *
 */
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log('Successfully connected to MongoDB!')) // Log success message
  .catch((err) => {
    console.error(`Failed to connect to MongoDB: ${err.message}`); // Log error details
    process.exit(1); // Exit process if connection fails
  });

/**
 * Routes setup
 */
// Use imported routes for handling API endpoints
app.use('/users', routes);

// Serve static files (e.g., HTML, CSS, JS) from the "public" folder
// I had to place this under the routes setup so that I can see my get request via Postman, not the html file
app.use(express.static(path.join(__dirname, 'public')));

// Explicitly serving the 'index.html' at the root route
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

/**
 * 404 Handler
 * Catch all unmatched routes and return a 404 error
 */
app.use('*', (req, res) => {
  return res.status(404).send('404 - Request Not Found');
});

/**
 * Global Error Handler
 * Handles errors throughout the application
 */
app.use((err, req, res, next) => {
  // Default error object
  const defaultErr = {
    log: 'Global error encountered: unknown middleware error.',
    status: 500,
    message: { err: 'An error occurred.' },
  };

  // Merge the default error object with the provided error
  const errorObj = Object.assign({}, defaultErr, err);

  console.log(errorObj.log); // Log the error for developers
  return res.status(errorObj.status).json(errorObj.message); // Send error response to the client
});

/**
 * Start the server
 * Begin listening for incoming requests on the specified port
 */
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
