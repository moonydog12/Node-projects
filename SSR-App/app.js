const express = require('express');
const morgan = require('morgan');
const mongoose = require('mongoose');
const Blog = require('./models/blog');

require('dotenv').config();

const port = 5000;

// Instantiate express object
const app = express();

// Connect to db
mongoose
  .connect(process.env.dbURI)
  .then((result) => {
    // listen for requests
    app.listen(port, () => {
      console.log('Server listening on port 5000');
    });
  })
  .catch((err) => console.log(err));

// register view engine
app.set('view engine', 'ejs');

// register 3rd party middleware
app.use(morgan('dev'));

// middleware & static files
app.use(express.static('public'));

// routes
app.get('/', (req, res) => {
  res.redirect('/blogs');
});

app.get('/about', (req, res) => {
  res.render('about', { title: 'About' });
});

app.get('/blogs/create', (req, res) => {
  res.render('create', { title: 'Create a new blog' });
});

app.get('/blogs', async (req, res) => {
  const blogs = await Blog.find({}).sort({ createdAt: -1 });
  res.render('index', { title: 'All Blogs', blogs });
});

// 404 pages(A catch route)
app.use((req, res) => {
  res.status(404).render('error', { title: '404' });
});
