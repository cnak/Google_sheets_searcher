const express = require('express');

const gsheets = require('./gsheets.js');

const app = express();

app.get('/projects/:query', async (req, res) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With',
    'Content-Type, Accept'
  );

  const { query } = req.params;

  const data = await gsheets.getProjects(query);

  res.status(200).send({
    success: 'true',
    message: 'projects retrieved successfully',
    projects: data,
  });
});

const PORT = 3001;

app.listen(PORT, () => {
  console.log(`server running on port ${PORT}`);
});
