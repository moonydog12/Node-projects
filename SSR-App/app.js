const express = require('express');

// 新增express實例
const app = express();

// 監聽 requests
app.listen(5000);

app.get('/', (req, res) => {
  res.sendFile('./views/index.html', {
    root: __dirname,
  });
});

app.get('/about', (req, res) => {
  res.sendFile('./views/about.html', {
    root: __dirname,
  });
});

// 重新導向
app.get('/about-us', (req, res) => {
  res.redirect('/about');
});

// 404 pages(若上面的 handler 都不符合，執行這一段)
app.use((req, res) => {
  res.status(404).sendFile('./views/error.html', {
    root: __dirname,
  });
});
