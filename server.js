const express = require("express");

const app = express();

const PORT = 3000;


app.use(express.json());



app.get("/", (req, res) => {

    res.sendFile(__dirname + "/index.html");

});


let students = [

    {
        id: 1,
        name: "Anil",
        age: 20,
        course: "CSE"
    },

    {
        id: 2,
        name: "Rahul",
        age: 21,
        course: "AIML"
    }

];


app.get("/api/students", (req, res) => {

    res.status(200).json({

        success: true,

        students: students

    });

});


app.get("/api/students/:id", (req, res) => {

    const id = parseInt(req.params.id);

    const student = students.find(student => student.id === id);



    if (!student) {

        return res.status(404).json({

            success: false,

            message: "Student not found"

        });

    }


    res.status(200).json({

        success: true,

        student: student

    });

});



app.post("/api/students", (req, res) => {

    
    const { name, age, course } = req.body;


   
    if (!name || !age || !course) {

        return res.status(400).json({

            success: false,

            message: "Name, age and course are required"

        });

    }


    if (isNaN(age) || Number(age) <= 0) {

        return res.status(400).json({

            success: false,

            message: "Age must be a valid number"

        });

    }

    const newStudent = {

        id: students.length + 1,

        name: name,

        age: Number(age),

        course: course

    };


    students.push(newStudent);


    res.status(201).json({

        success: true,

        message: "Student added successfully",

        student: newStudent

    });

});



app.listen(PORT, () => {

    console.log(`Server running at http://localhost:${PORT}`);

});