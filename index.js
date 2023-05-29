require("dotenv").config();
const express = require("express");
const { getCurrentWeather } = require("./apis/weatherApi");

const app = express();

app.use(express.json());

app.get("/", (req, res) => {
  res.send("Funciona!");
});

app.get("/:city", async (req, res) => {
  const { city } = req.params;
  const response = await getCurrentWeather(city);
  res.json(response);
});

const { PORT } = process.env;
app.listen(PORT, () => {
  console.log("Servidor escuchando en puerto", PORT);
});
