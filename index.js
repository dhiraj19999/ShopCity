

const express = require("express");
const { connect } = require("./config/db");


const { productRouter } = require("../server/Routes/products.route");

const app = express();
const cors = require("cors");


require("dotenv").config();

app.use(
  cors({
    origin: "*",
  })
);

// openpi specification
//swagger specs

app.get("/", (req, res) => {
  res.send("This is the Home Page ");
});
app.use(express.json());

app.use("/products", productRouter);


app.listen(process.env.port, async () => {
  try {
    await connect;
    console.log("connected to db");
  } catch (error) {
    console.log(error);
  }
  console.log("server running at",process.env.port);
});