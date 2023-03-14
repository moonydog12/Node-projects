const express = require('express');
const mongoose = require('mongoose');
const Blog = require('./models/blog');

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

app.get('/blogs/create', (req, res) => {
  res.render('create', { title: 'Create a new blog' });
});

app.get('/blogs', async (req, res) => {
  const blogs = await Blog.find({}).sort({ createdAt: -1 });
  res.render('index', { title: 'All Blogs', blogs });
});

app.post('/blogs', (req, res) => {
  const blog = new Blog(req.body);
  blog
    .save()
    .then(() => {
      res.redirect('/blogs');
    })
    .catch((err) => console.log(err));
});

app.get('/blogs/:id', (req, res) => {
  const { id } = req.params;
  Blog.findById(id)
    .then((result) => {
      res.render('details', { blog: result, title: 'Blog Details' });
    })
    .catch((err) => console.log(err));
});

app.delete('/blogs/:id', (req, res) => {
  const { id } = req.params;
  Blog.findByIdAndDelete(id)
    .then((result) => {
      // send the redirect location to front-end
      res.json({ redirect: '/blogs' });
    })
    .catch((err) => console.log(err));
});

// 404 pages(A catch route)
app.use((req, res) => {
  res.status(404).render('error', { title: '404' });
});
