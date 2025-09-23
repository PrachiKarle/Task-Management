express = require("express");
const app = express();
var exe = require("./db");

app.use(express.json());

app.get("/", (req, res) => {
  res.send("Task Managemnt!!");
});

//add users
app.post("/users", async (req, res) => {
  try {
    const { name, email } = req.body;
    if (!name || !email) {
      return res.status(400).json({ error: "Name and email are required" });
    }
    const sql = `INSERT INTO users(name,email) values(?,?)`;
    await exe(sql, [name, email]);
    res.status(201).json({ message: "User added successfully!" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

//Tasks

// PUT /tasks/:id → Update a task (details or status)
app.put("/tasks/:id", async (req, res) => {
  try {
    var i = req.params.id;
    const { title, des, status, deadline, user_id } = req.body;
    var sql = `update tasks set title=?,des=?,status=?,deadline=?,user_id=? where id=?`;
    await exe(sql, [title, des, status, deadline, user_id,i]);
    return res.status(400).json({ message: "Task updated!" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// DELETE /tasks/:id → Delete a task
app.delete("/tasks/:id", async (req, res) => {
  try {
    var i = req.params.id;
    var sql = `delete from tasks where id=?`;
    await exe(sql, [i]);
    return res.status(400).json({ message: "Task Deleted!" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// GET /tasks → List all tasks with assigned user details
app.get("/tasks", async (req, res) => {
  try {
    var sql = "select* from tasks";
    var d = await exe(sql);
    return res.status(201).json(d);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// POST /tasks → Create a tasks
app.post("/tasks", async (req, res) => {
  try {
    const { title, des, status, deadline, user_id } = req.body;
    const sql = `INSERT INTO tasks(title,des,status,deadline,user_id) values(?,?,?,?,?)`;
    await exe(sql, [title, des, status, deadline, user_id]);
    return res.status(400).json({ message: "Task added!" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

const PORT = 3000 || process.env.PORT;
app.listen(PORT, () => {
  console.log(`Server is running on ${PORT}`);
});
