const Fellow = require('../model/Fellow');

/* 
These controllers take incoming requests and utilize the
methods provided by the Fellow "model" before sending a
response back to the client (or an error message).
*/

// Get All (Read)
const serveFellows = (req, res) => {
  const fellowsList = Fellow.list();
  res.send(fellowsList);
}

// Get One (Read)
const serveFellow = (req, res) => {
  const { id } = req.params;
  const fellow = Fellow.find(Number(id));

  if (!fellow) return res.status(404).send({ message: `No fellow with the id ${id}` });
  res.send(fellow);
};

// Create
const createFellow = (req, res) => {
  const { fellowName } = req.body; // The POST request body will be an object: `{ fellowName: 'name' }`
  if (!fellowName) {
    // 400 means "invalid request"
    return res.status(400).send({ message: "Invalid Name" });
  }

  const newFellow = Fellow.create(fellowName);
  res.send(newFellow);
};

// Update
const updateFellow = (req, res) => {
  const { fellowName } = req.body;

  if (!fellowName) {
    // 400 means "invalid request"
    return res.status(400).send({ message: "Invalid Name" });
  }

  const { id } = req.params;
  const updatedFellow = Fellow.editName(Number(id), fellowName);
  // sendStatus sends just the status with no message body
  if (!updatedFellow) return res.status(404).send({ message: `No fellow with the id ${id}` });
  res.send(updatedFellow);
}

// Delete
const deleteFellow = (req, res) => {
  const { id } = req.params;
  const didDelete = Fellow.delete(Number(id));

  if (!didDelete) {
    return res.status(404).send({ message: `No fellow with the id ${id}` });
  }
  // 204 means "no content" - the request was successful but there's no content to send back
  res.sendStatus(204);
}

module.exports = {
  serveFellows,
  serveFellow,
  createFellow,
  updateFellow,
  deleteFellow
};