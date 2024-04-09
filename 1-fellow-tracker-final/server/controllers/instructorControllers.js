const Instructor = require('../model/Instructor');

/* 
These controllers take incoming requests and utilize the
methods provided by the Instructor "model" before sending a
response back to the client (or an error message).
*/

// Get All (Read)
const serveInstructors = (req, res) => {
  const instructorsList = Instructor.list();
  res.send(instructorsList);
}

// Get One (Read)
const serveInstructor = (req, res) => {
  const { id } = req.params;
  const instructor = Instructor.find(Number(id));

  if (!instructor) return res.status(404).send(`No instructor with the id ${id}`);
  res.send(instructor);
};

// Create
const createInstructor = (req, res) => {
  const { instructorName } = req.body; // The POST request body will be an object: `{ instructorName: 'name' }`
  const newInstructor = new Instructor(instructorName);
  res.send(newInstructor);
};

// Update
const updateInstructor = (req, res) => {
  const { instructorName } = req.body;
  const { id } = req.params;
  const updatedInstructor = Instructor.editName(Number(id), instructorName);
  // sendStatus sends just the status with no message body
  if (!updatedInstructor) return res.sendStatus(404);
  res.send(updatedInstructor);
}

// Delete
const deleteInstructor = (req, res) => {
  const { id } = req.params;
  const didDelete = Instructor.delete(Number(id));
  const statusCode = didDelete ? 204 : 404;
  res.sendStatus(statusCode);
}

module.exports = {
  serveInstructors,
  serveInstructor,
  createInstructor,
  updateInstructor,
  deleteInstructor
};