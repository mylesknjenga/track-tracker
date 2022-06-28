const express = require("express");
const app = express();
const mysql = require("mysql2");
const cors = require("cors");

app.use(cors());
app.use(express.json());

const db = mysql.createConnection({
    user: 'admin',
    host: 'database-1.c8cuaj8wcr2j.us-east-1.rds.amazonaws.com',
    password: 'Trinity12',
    database: 'task_tracker'
})

app.post("/create", (req, res) => {
    const task = req.body.task; 

    db.query("INSERT INTO tasks (task) VALUES (?)", task, (err, result) => {
        if (err) {
            console.log("error", err)
        } else {
            res.send("Task created...")
        }
    });

})

app.get("/tasks", (req, res) => {
    db.query("SELECT * FROM tasks", (err,result) => {
        if(err) {
            console.log(err)
        } else {
            res.send(result)
        }
    })
})

app.delete("/delete/:id", (req, res) => {
    console.log(id)
    const id = req.params.id;
    db.query("DELETE FROM tasks WHERE id = ?", id, (err, result) => {
        if(err) {
            console.log(err)
        } else {
            console.log(result)
        }
    })
})

app.put("/edit", (req, res) => {
    const id = req.body.id
    const task = req.body.task

    db.query("UPDATE tasks SET task = ? WHERE id = ?", [task, id], (err, result) => {
        if(err) {
            console.log(err)
        } else {
            res.send(result)
        }
    })
})

app.listen(process.env.PORT || 3001, () => {
    console.log("Listening port 3001...")
})