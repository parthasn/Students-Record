const Student = require('../models/Student')

// const getStudents = (req, res) => {
//     Student.find()
//     .then((students) => res.json(students))
//     .catch((err) => res.status(400).json("Error: " + err))
// }

const getStudent = (req, res) => {
  Student.findById(req.params.id)
  .then((student) => res.json(student))
  .catch((err) => res.status(400).json("Error: " + err))
}

const addStudent = (req, res) => {
    const { name, bloodGroup, email, city, imageLink, gender } = req.body;
    const newStudent = new Student({ name, bloodGroup, email, city, imageLink, gender });

    newStudent
        .save()
        .then(() => res.json("Student Added Successfully"))
        .catch((err) => res.status(400).json("Error: " + err));
}

const deleteStudent = (req, res) => {
    Student.findByIdAndDelete(req.params.id)
      .then(() => res.json("Student Deleted Successfully"))
      .catch((err) => res.status(400).json("Error: " + err));
}

const editStudent = (req, res) => {
    Student.findById(req.params.id)
      .then((student) => {
        student.email = req.body.email;
        student.name = req.body.name;
        student.bloodGroup = req.body.bloodGroup;
        student.city = req.body.city;
        student.imageLink = req.body.imageLink;
        student.gender = req.body.gender;
  
        student
          .save()
          .then(() => res.json("Student updated Successfully"))
          .catch((err) => res.status(400).json("Error: " + err));
      })
      .catch((err) => res.status(400).json("Error: " + err));
}

module.exports = { getStudent, addStudent, deleteStudent, editStudent }