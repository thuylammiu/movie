const express = require("express");

require("./data/dbconnection");  

const movieRouter = require("./routes/movie");
const userRouter = require("./routes/user");

const app = express();
app.listen(5000, () => {
    console.log("the port is listening on port 5000");
  });

  var cors = require('cors');
  app.use(cors())
// setup body parser
app.use(express.json());
app.use(express.urlencoded({extended: true})); 



app.use("/", movieRouter);
app.use("/user", userRouter);




