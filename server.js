const express = require('express');
const mongoose = require('mongoose');
const reservationRoutes = require('./routes/reservations'); // Import the reservation routes
const path = require('path'); // For serving static files

const app = express();
app.use(express.json()); // Parse incoming requests with JSON

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/restaurant', { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('Connected to MongoDB'))
    .catch(err => console.log('Error connecting to MongoDB:', err));

// Serve static files from the public directory
app.use(express.static(path.join(__dirname, 'public')));

// Use the reservation routes
app.use(reservationRoutes); // Mount the reservation routes

// Serve admin.html for viewing reservations
app.get('/admin', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'admin.html'));
});

// Serve other HTML files if needed
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html')); // Example for the main page
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
