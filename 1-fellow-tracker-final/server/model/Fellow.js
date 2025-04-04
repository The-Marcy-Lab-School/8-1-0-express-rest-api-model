const getId = require('../utils/getId');

const fellows = []; // Mock Database

/* 
This class provides an interface for managing interactions with a database of fellows.
It includes methods for creating, reading, updating, and deleting fellows.
The fellows are stored in an array, which acts as a mock database.
*/

class Fellow {
  // the constructor is used for structuring data, and assigning any default values like id
  constructor(name) { // Create
    this.id = getId();
    this.name = name;
  }

  // Create and add the new fellow to the "database" (the fellows array)
  static create(name) {
    const newFellow = new Fellow(name);
    fellows.push(newFellow);
    return newFellow;
  }

  // Get all values from the "database"
  static list() {
    return [...fellows];
  }

  // Get one value from the "database"
  static find(id) {
    return fellows.find((fellow) => fellow.id === id);
  }

  // Update one value from the "database"
  static editName(id, newName) {
    const fellow = Fellow.find(id);
    if (!fellow) return null;
    fellow.name = newName;
    return fellow;
  }

  // Delete one value from the "database"
  static delete(id) {
    const fellowIndex = fellows.findIndex((fellow) => fellow.id === id);
    if (fellowIndex < 0) return false;

    fellows.splice(fellowIndex, 1);
    return true;
  }

  // Delete all values from the "database"
  static deleteAll() {
    if (!fellows.length) return null;

    fellows.length = 0;
    return [];
  }
}

/* 
Take a moment and play with these class methods. Try the following and
run this file with `node Fellow.js`:
*/

// Add 4 fellows to the "database"
// Fellow.create('ben');
// Fellow.create('zo');
// Fellow.create('carmen');
// Fellow.create('gonzalo');

// console.log(Fellow.list()) // Read
// console.log(Fellow.find(3)) // Read
// console.log(Fellow.editName(3, 'CARMEN!!!!')) // Update
// console.log(Fellow.delete(4)) // Delete
// console.log(Fellow.list()) // Read

module.exports = Fellow;