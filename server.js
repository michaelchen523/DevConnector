const express = require('express');
const { connectDB, closeDB } = require('./config/db');

const app = express();

//Connect Databases
connectDB();

// Init Middleware
app.use(express.json({ extended: false }));

app.get('/', (req, res) => res.send('API Running'));

// Define routes
app.use('/api/users', require('./routes/api/users'));
app.use('/api/auth', require('./routes/api/auth'));
app.use('/api/profile', require('./routes/api/profile'));
app.use('/api/posts', require('./routes/api/posts'));

const PORT = process.env.PORT || 5000;
const server = app.listen(PORT, () =>
  console.log(`Server started on port ${PORT}`)
);

process.on('SIGTERM', () => {
  console.info('SIGTERM signal received');
  console.log('Closing http server.');
  server.close(() => {
    console.log('HTTP Server closed.');
    closeDB();
  });
});

module.exports = app;
