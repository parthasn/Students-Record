const express = require('express')
const students = require('./students')
const mongoose = require('mongoose')
const dotenv = require('dotenv')
const cors = require('cors')

dotenv.config()
const app = express()

const Student = require('./models/Student')
const studentRoute = require('./routes/Students')

const authRoute = require("./routes/auth")

app.use(express.json())
app.use(cors())

mongoose.connect(process.env.ATLAS_URI, {useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true}, (err) => {
    if(err){
        console.log("Connection to database failed")
    }
    
    if(Student.collection.countDocuments((err, count) => {
        if (!err && count === 0) {
            // It's empty
            Student.insertMany(students).then(()=>{ 
            console.log("Data inserted")  // Success 
        }).catch((error)=>{ 
            console.log(error)      // Failure 
        }); 
        }
    }));
})

app.use('/api', studentRoute)
app.use("/api/admin", authRoute)

app.get("/api/students", paginatedResults(Student), (req, res) => {
    res.json(res.pagination);
  });
  
  function paginatedResults(model) {
    return async (req, res, next) => {
      const page = Number.parseInt(req.query.page);
      const limit = Number.parseInt(req.query.limit);
  
      const startIndex = (page - 1) * limit;
      const endIndex = page * limit;
  
      const results = {};
  
      if (endIndex < (await model.countDocuments().exec())) {
        results.next = {
          page: page + 1,
          limit: limit,
        };
      }
  
      if (startIndex > 0) {
        results.prev = {
          page: page - 1,
          limit: limit,
        };
      }
  
      results.totalItem = await model.find().then((data) => data.length);
  
      try {
        results.current = await model.find().limit(limit).skip(startIndex).exec();
        res.pagination = results;
        next();
      } catch (e) {
        res.status(500).json({ message: e.message });
      }
    };
  }





// app.get('/api/students', (req, res) => {
//     Student.find()
//     .then((students) => res.json(students))
//     .catch((err) => res.status(400).json("Error: " + err))
// })

// app.post('/api/addstudent', (req, res) => {
//     const { name, bloodGroup, email, city, imageLink, gender } = req.body;
//     const newStudent = new Student({ name, bloodGroup, email, city, imageLink, gender });

//     newStudent
//         .save()
//         .then(() => res.json("Student Added Successfully"))
//         .catch((err) => res.status(400).json("Error: " + err));
// })

// app.post("/api/student/update/:id", (req, res) => {
//     Student.findById(req.params.id)
//       .then((student) => {
//         student.email = req.body.email;
//         student.name = req.body.name;
//         student.bloodGroup = req.body.bloodGroup;
//         student.city = req.body.city;
//         student.imageLink = req.body.imageLink;
//         student.gender = req.body.gender;
  
//         student
//           .save()
//           .then(() => res.json("Student updated Successfully"))
//           .catch((err) => res.status(400).json("Error: " + err));
//       })
//       .catch((err) => res.status(400).json("Error: " + err));
//   });

// app.delete("/api/student/:id", (req, res) => {
//     Student.findByIdAndDelete(req.params.id)
//       .then(() => res.json("Student Deleted Successfully"))
//       .catch((err) => res.status(400).json("Error: " + err));
//   });

app.listen(5000, () => {
    console.log("The server is up and running on port 5000")
})