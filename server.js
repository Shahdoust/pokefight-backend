const express = require("express");
const app = express();
const cors = require("cors");
require("colors");
require("dotenv").config();
const pokemon = require("./routes/pokemon");

app.use(express.json());
app.use(cors());

app.use(express.urlencoded({ extended: true }));

const PORT = 8080;

app.get("/", (req, res) => {
  res.send("Welcome to the pokemon");
});

app.use("/api/pokemon", pokemon);

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`.rainbow);
});
