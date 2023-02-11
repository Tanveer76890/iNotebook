const connectToMongo = require("./db");
const express = require("express");
const cors = require("cors");

connectToMongo();

const app = express();
const port = 5000;

// middleware 
app.use(cors());
app.use(express.json());



// avaiable routes
app.use("/api/auth", require("./routes/auth"));
app.use("/api/notes", require("./routes/notes"));

// app.get("/", (req, res) => {
//   res.send("Hello World! all developers and my first project of express.js ");
// });

  // deploy app for vercel website code here
  if (process.env.NODE_ENV == "production") {
    const path = require('path');
    app.get('/', (req,res) =>{
      app.use(express.static(path.resolve(__dirname, 'inotebook', 'build' )));
      res.sendFile(path.resolve(__dirname, 'inotebook', 'build', 'index.html'));
    });
  }


app.listen(port, () => {
  console.log(`iNotebook app listening on port ${port}`);
});
