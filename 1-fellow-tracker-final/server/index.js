const express = require('express');
const path = require('path');

// Instead of defining all of the controllers in this file, we've moved them to their own folder
const {
  serveFellows,
  serveFellow,
  createFellow,
  updateFellow,
  deleteFellow
} = require('./controllers/fellowControllers');

const {
  serveInstructors,
  serveInstructor,
  createInstructor,
  updateInstructor,
  deleteInstructor
} = require('./controllers/instructorControllers');

const app = express();
const pathToFrontendDist = path.join(__dirname, '../frontend/dist');

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

// A new middleware has appeared! 
// This parses incoming requests with JSON data in the body
// Access the data using `req.body`
const parseJSON = express.json();

app.use(logRoutes);   // Print out every incoming request
app.use(serveStatic); // Serve static public/ content
app.use(parseJSON);   // Parses request body JSON

////////////////////////
// Endpoints
////////////////////////

app.get('/api/fellows', serveFellows);
app.get('/api/fellows/:id', serveFellow);
app.post('/api/fellows', createFellow);
app.patch('/api/fellows/:id', updateFellow);
app.delete('/api/fellows/:id', deleteFellow);

app.get('/api/instructors', serveInstructors);
app.get('/api/instructors/:id', serveInstructor);
app.post('/api/instructors', createInstructor);
app.patch('/api/instructors/:id', updateInstructor);
app.delete('/api/instructors/:id', deleteInstructor);

app.get('*', (req, res, next) => {
  if (req.originalUrl.startsWith('/api')) return next();
  res.sendFile(pathToFrontendDist);
});


const port = 8080;
app.listen(port, () => console.log(`listening at http://localhost:${port}`));