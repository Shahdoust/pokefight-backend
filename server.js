const express = require("express");
const app = express();
const cors = require("cors");
require("colors");
require("dotenv").config();
const pokemon = require("./routes/pokemon");
const username = require("./routes/username");

const connectDB = require("./dbinit");
connectDB();
app.use(express.json());
app.use(cors());

app.use(express.urlencoded({ extended: true }));

const PORT = process.env.PORT;

app.get("/", (req, res) => {
  res.send("Welcome to the pokemon");
});

app.use("/api/pokemon", pokemon);
// app.use("/fight");
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`.rainbow);
});
