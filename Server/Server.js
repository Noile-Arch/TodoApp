const express = require("express");
const cors = require("cors");
const db = require("./Database");
const app = express();
const todos = require("./Models/Todo");
app.use(express.json());
app.use(cors());

let PORT = 3000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

app.get("/todos",  async (req, res) => {
  const data = await todos.find()
    res.json(data);
    

});

app.post("/todo/new", async (req, res) => {
  const todo = new todos({
    text: req.body.text
  });
  todo.save();
  
  res.json(todo);
});

app.delete("/todo/delete/:id", async (req, res) => {
  const result = await todos.findByIdAndDelete(req.params.id);

  res.json(result);
});

app.get("/todo/completed/:id", async (req, res) => {
  const todo = await todos.findById(req.params.id);
  todo.completed = !todo.completed;
  todo.save();

  res.json(todo);
});
