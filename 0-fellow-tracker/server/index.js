const express = require('express');
const path = require('path');
const getId = require('./utils/getId')

const pathToFrontendDist = path.join(__dirname, '../frontend/dist');
const app = express();

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

app.use(logRoutes);
app.use(serveStatic); // Serve static public/ content
app.use(parseJSON);   // Parses request body JSON

////////////////////////
// Controllers
////////////////////////

// The "in-memory" array. It is created and stored in RAM when the
// server application starts/restarts. It does not "persist"
const fellowsList = [
  { name: 'ben', id: getId() },
  { name: 'gonzalo', id: getId() },
  { name: 'carmen', id: getId() },
  { name: 'zo', id: getId() },
];

// app.get('/api/fellows', serveFellows);
const serveFellows = (req, res, next) => {
  res.send(fellowsList);
}

// app.get('/api/fellows/:id', serveFellow);
// GET /api/fellows/3
const serveFellow = (req, res, next) => {
  const { id } = req.params;
  const fellow = fellowsList.find((fellow) => Number(id) === fellow.id);
  if (!fellow) return res.status(404).send(`No fellow with the id ${id}`);
  res.send(fellow);
};

// app.post('/api/fellows', createFellow);
const createFellow = (req, res, next) => {
  // get the fellowName from the body
  const { fellowName } = req.body; // The POST request body will be an object: `{ fellowName: 'name' }`
  // use it to make a new fellow object
  const newFellow = {
    name: fellowName,
    id: getId()
  };
  // add the fellow object to the list
  fellowsList.push(newFellow)
  // send back the new fellow
  res.send(newFellow);
};

// app.patch('/api/fellows/:id', updateFellow);
const updateFellow = (req, res, next) => {
  console.log(req.body, req.params)
  const fellowToUpdate = fellowsList.find((fellow) => fellow.id === Number(req.params.id))
  if (!fellowToUpdate) return res.status(404).send(`No fellow with the id ${id}`);

  fellowToUpdate.name = req.body.fellowName;
  res.send(fellowToUpdate)
}

// app.delete('/api/fellows/:id', deleteFellow);
const deleteFellow = (req, res, next) => {
  const fellowIndexToDelete = fellowsList.findIndex((fellow) => fellow.id === Number(req.params.id))
  fellowsList.splice(fellowIndexToDelete, 1);
  res.sendStatus(203);
}

////////////////////////
// Endpoints
////////////////////////

app.get('/api/fellows', serveFellows); // get all
app.get('/api/fellows/:id', serveFellow); // get one
app.post('/api/fellows', createFellow); // create
app.patch('/api/fellows/:id', updateFellow); // update
app.delete('/api/fellows/:id', deleteFellow); // delete

app.get('/api/ben', (req, res) => {
  res.send('ben')
})
app.get('/api/benSays/hello', (req, res) => {
  res.send('ben says hi')
})

// REST - representational state transfer
// defines a pattern for naming API endpoints
// The pattern is: /api/resource/:resourceId/subResource/:subResourceId

// app.get('/api/fellows/:id/posts', serveFellowPosts); // get one
// app.patch('/api/fellows/:id/posts/:postId', serveFellowPosts); // get one
// PATCH /api/fellows/1/posts/4

app.get('*', (req, res, next) => {
  if (req.originalUrl.startsWith('/api')) return next();
  res.sendFile(pathToFrontendDist);
});



const port = 8080;
app.listen(port, () => console.log(`listening at http://localhost:${port}`));