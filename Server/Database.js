const mongoose = require("mongoose");

const db = mongoose.connect("mongodb://localhost:27017/todoapp")
.then(() => {
  console.log("Database connected");
})
.catch((e)=>{
    console.log(e);
});

module.exports = db;

