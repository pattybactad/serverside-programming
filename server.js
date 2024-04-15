const express = require('express');
const app = express();
const path = require('path');
const bodyParser = require('body-parser');

const port = 3000;

// EJS as the view engine
app.set('view engine', 'ejs');

// Middleware to parse incoming request bodies
app.use(bodyParser.urlencoded({ extended: true }));

// Define routes
app.get('/', (req, res) => {
  res.render('home');
});

app.get('/about', (req, res) => {
  res.render('about');
});

app.get('/contact', (req, res) => {
  res.render('contact');
});

// Handle form submission
app.post('/contact', (req, res) => {
  const { name, message } = req.body;
  res.render('submission', { name, message });
});

// Serve static files
app.use(express.static(path.join(__dirname, 'public')));

// Introduce a deliberate bug
app.get('/bug', (req, res, next) => {
  // This will throw an error
  next(new Error('Intentional Bug'));
});

// Error handling middleware
app.use((req, res, next) => {
  const err = new Error('Page Not Found');
  err.status = 404;
  next(err);
});

app.use((err, req, res, next) => {
  res.status(err.status || 500);
  res.render('error', { error: err.message });
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});

// Catch undefined routes
app.get('*', (req, res) => {
  const error = '404 - Not Found';
  res.status(404).render('error', { error });
});
