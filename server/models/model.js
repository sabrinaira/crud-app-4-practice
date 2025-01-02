/**
 * This is where you define your schema model for your MongoDB database
 */
import mongoose from 'mongoose'; // Import the mongoose library to interact with MongoDB
const Schema = mongoose.Schema; // Create a shorthand reference to the Schema constructor

/**
 * Define the structure (schema) for the collection in the database
 */
const schema = new Schema({
  // Define the "firstName" field as a required string
  firstName: { type: String, required: true },
  // Define the "lastName" field as a required string
  lastName: { type: String, required: true },
  // Define the "age" field as an optional number
  age: { type: Number, required: false },
  // Define the "color" field as an optional string
  color: { type: String, required: false },
});

/**
 * Create a model based on the schema
 * This model will interact with the 'New Database' collection in MongoDB
 * NOTE: When the MongoDB connection is successful, Mongoose automatically
 * applies a naming convention to determine the collection name.
 * By default, Mongoose:
 * - Converts the model name to lowercase.
 * - Pluralizes the model name (adds an 's' or another appropriate suffix).
 *
 * Unless you already explicitly named your model in plural form and in lowercase, your model name inside mongoose.model() will look slightly different when you see it on your MongoDB Atlas collection.
 */
const model = mongoose.model('New Database', schema);

export default model; // Export the model for use in other parts of the application
