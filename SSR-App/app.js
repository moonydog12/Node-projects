const express = require('express');
const mongoose = require('mongoose');
const blogRoutes = require('./routes/blogRoutes');

require('dotenv').config();

const port = 5000;

// Instantiate express object
const app = express();

// Connect to db
mongoose
  .connect(process.env.dbURI)
  .then(() => {
    // listen for requests
    app.listen(port, () => {
      console.log('Server listening on port 5000');
    });
  })
  .catch((err) => console.log(err));

// register view engine
app.set('view engine', 'ejs');

// middleware & static files
app.use(express.static('public'));
app.use(
  express.urlencoded({
    extended: true,
  }),
);

// routes
app.get('/', (req, res) => {
  res.redirect('/blogs');
});

app.get('/about', (req, res) => {
  res.render('about', { title: 'About' });
});

// blog routes
app.use('/blogs', blogRoutes);

// 404 pages(A catch route)
app.use((req, res) => {
  res.status(404).render('error', { title: '404' });
});
