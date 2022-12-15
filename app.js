require("dotenv").config()

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

//routers here
const authRouter = require("./routes/auth.routes");
// const { isAuthenticated } = require("./middleware/jwt.middleware");

const app = express();

const port = process.env.PORT;

app.use(
  cors({
    origin: "*",
  })
);

app.use(express.json());


//app.use("/api", isAuthenticated, projectRouter); //
//app.use("/api", isAuthenticated, taskRouter); //
app.use("/auth", authRouter);


mongoose
  .connect(process.env.MONGODB_URI)
  .then((x) => {
    console.log("connected to db: ", x.connections[0].name);
    app.listen(port, () => console.log("server started on port: " + port));
  })
  .catch((err) => console.log("error starting server: ", err));
