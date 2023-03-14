const express = require('express');

// Instantiate express object
const app = express();

// register view engine
app.set('view engine', 'ejs');

// listen for requests
app.listen(5000);

app.use(express.static(`${__dirname}/public`));

app.get('/', (req, res) => {
  const blogs = [
    {
      title: 'Yoshi finds eggs',
      snippet: 'Lorem ipsum dolor sit amet consectetur',
    },
    {
      title: 'Mario finds stars',
      snippet: 'Lorem ipsum dolor sit amet consectetur',
    },
    {
      title: 'How to defeat bowser',
      snippet: 'Lorem ipsum dolor sit amet consectetur',
    },
  ];

  // provide parameters for index.ejs
  res.render('index', { title: 'Thunder body!', blogs });
});

app.get('/about', (req, res) => {
  res.render('about', { title: 'About' });
});

app.get('/blogs/create', (req, res) => {
  res.render('create', { title: 'Create a new blog' });
});

// 404 pages(A catch route)
app.use((req, res) => {
  res.status(404).render('error', { title: '404' });
});
