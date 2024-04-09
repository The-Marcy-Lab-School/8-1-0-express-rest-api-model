const getId = require('../utils/getId');

/* 
This class provides an interface for managing Instructor data. 
Instances of this class can't do much really. They just store data.

The class itself provides static methods for CRUD actions on 
the collection of Instructors.
*/
class Instructor {
  static #all = [];

  constructor(name) { // Create
    this.id = getId();
    this.name = name;

    Instructor.#all.push(this);
  }

  static list() { // Get all
    return [...Instructor.#all];
  }

  static find(id) { // Get one
    return Instructor.#all.find((Instructor) => Instructor.id === id);
  }

  static editName(id, newName) { // Update
    const Instructor = Instructor.find(id);
    if (!Instructor) return null;
    Instructor.name = newName;
    return Instructor;
  }

  static delete(id) { // Delete
    const InstructorIndex = Instructor.#all.findIndex((Instructor) => Instructor.id === id);
    if (InstructorIndex < 0) return null;

    Instructor.#all.splice(InstructorIndex, 1);
    return true;
  }

  static deleteAll() { // Delete All
    if (!Instructor.#all.length) return null;

    Instructor.#all.length = 0;
    return Instructor.#all;
  }
}

/* 
Take a moment and play with these class methods. Try the following and
run this file with `node Instructor.js`:

const ben = new Instructor('ben');
const zo = new Instructor('zo');
const carmen = new Instructor('carmen');
const gonzalo = new Instructor('gonzalo');

console.log(Instructor.list())
console.log(Instructor.find(1))
console.log(Instructor.editName(1, 'ZO!!'))
console.log(Instructor.delete(2))
console.log(Instructor.list())
*/

// Create

module.exports = Instructor;