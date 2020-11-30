const express = require('express')
const router = express.Router()
const Student = require('../models/Student')

const { getStudent, addStudent, deleteStudent, editStudent } = require('../controllers/student-controllers')

// router.get('/students', paginatedResults(Student), getStudents)
router.get('/student/:id', getStudent)
router.post('/addstudent', addStudent)
router.delete('/student/:id', deleteStudent)
router.post('/student/update/:id', editStudent)

// function paginatedResults(model) {
//     return async (req, res, next) => {
//       const page = parseInt(req.query.page);
//       const limit = parseInt(req.query.limit);
  
//       const startIndex = (page - 1) * limit;
//       const endIndex = page * limit;
  
//       const results = {};
  
//       if (endIndex < (await model.countDocuments().exec())) {
//         results.next = {
//           page: page + 1,
//           limit: limit,
//         };
//       }
  
//       if (startIndex > 0) {
//         results.prev = {
//           page: page - 1,
//           limit: limit,
//         };
//       }
  
//       try {
//         results.current = await model.find().limit(limit).skip(startIndex).exec();
//         res.pagination = results;
//         next();
//       } catch (err) {
//         res.status(500).json({ message: err.message });
//       }
//     };
//   }



module.exports = router