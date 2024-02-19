const express = require("express");
const server = express();
const cors = require("cors");
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const registerschema = require("./models/registerschema");

mongoose
  .connect(
    `mongodb+srv://amaljithmk123:8086171296@react-test.3y2u0u6.mongodb.net/React-Test`,
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }
  )
  .then(() => {
    console.log("Database connected");
  })
  .catch((err) => {
    console.log(err);
  });

server.use(cors());
server.use(express.json());
server.use(express.urlencoded({ extended: true }));

//Register

server.post("/", async (req, res) => {
  console.log(req.body);

  const hashedpassword = await bcrypt.hash(req.body.password, 12);
  const Data = new registerschema({
    name: req.body.name,
    phone: req.body.phone,
    email: req.body.email,
    password: hashedpassword,
  });
  Data.save()
    .then((data) => {
      res.status(200).json({
        success: true,
        error: false,
        message: "Register successful",
        data: data,
      });
    })
    .catch((err) => {
      res.status(400).json({
        success: false,
        error: true,
        message: "Failed",
      });
    });
});

//Login

server.post("/login", async (req, res) => {
  console.log(req.body);
  const old_user = await registerschema.findOne({
    email: req.body.email,
  });

  if (!old_user) {
    return res.status(400).json({
      success: false,
      error: true,
      errorMessage: "email doesn't exist ",
    });
  }

  const passwordmatch = await bcrypt.compare(
    req.body.password,
    old_user.password
  );

  console.log(passwordmatch);

  if (!passwordmatch) {
    return res.status(400).json({
      success: false,
      error: true,
      errorMessage: "Password does't match",
    });
  }

  return res.status(200).json({
    success: true,
    error: false,
    message: "login successful",
  });
});

const port = 3333;
server.listen(port, () => {
  console.log(`server started on port ${port}`);
});
