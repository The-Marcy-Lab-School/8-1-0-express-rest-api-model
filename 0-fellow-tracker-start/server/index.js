////////////////////////
// Imports
////////////////////////

const express = require('express');
const path = require('path');
const getId = require('./utils/getId');

////////////////////////
// Constants
////////////////////////

const app = express();
const pathToFrontendDist = path.join(__dirname, '../frontend/dist');

// Mock Database
const fellows = [
  { name: 'Carmen', id: getId() },
  { name: 'Reuben', id: getId() },
  { name: 'Maya', id: getId() },
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
app.use(express.json());

////////////////////////
// Endpoints
////////////////////////

// Get All (Read)
const serveFellows = (req, res) => {
  res.send(fellows);
}

const createFellow = (req, res) => {
  // make sure this object matches the options.body on the frontend
  const { fellowName } = req.body;

  if (!fellowName) {
    return res.status(400).send({ message: "Invalid Name" });
  }

  const newFellow = {
    name: fellowName,
    id: getId()
  }
  fellows.push(newFellow)

  res.send(newFellow);
}



app.post('/api/fellows', createFellow);
app.get('/api/fellows', serveFellows);

const port = 8080;
app.listen(port, () => console.log(`listening at http://localhost:${port}`));