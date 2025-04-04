////////////////////////
// Imports
////////////////////////

const express = require('express');
const path = require('path');

////////////////////////
// Constants
////////////////////////

const app = express();
const pathToFrontendDist = path.join(__dirname, '../frontend/dist');

// Mock Database
const fellows = [
  { name: 'Carmen', id: 1 },
  { name: 'Reuben', id: 2 },
  { name: 'Maya', id: 3 },
];

////////////////////////
// Middleware
////////////////////////

const logRoutes = (req, res, next) => {
  const time = (new Date()).toLocaleString();
  req.time = time;
  console.log(`${req.method}: ${req.originalUrl} - ${time}`);
  next();
};

const serveStatic = express.static(pathToFrontendDist);

app.use(logRoutes);   // Print out every incoming request
app.use(serveStatic); // Serve static public/ content

////////////////////////
// Endpoints
////////////////////////

// Get All (Read)
const serveFellows = (req, res) => {
  res.send(fellows);
}

app.get('/api/fellows', serveFellows);

app.get('*', (req, res, next) => {
  if (req.originalUrl.startsWith('/api')) return next();
  res.sendFile(pathToFrontendDist);
});


const port = 8080;
app.listen(port, () => console.log(`listening at http://localhost:${port}`));