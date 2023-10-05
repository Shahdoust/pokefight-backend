const express = require("express");

const {
  getAllPokemon,
  getOnePokemon,
  getPokemonInfo,
} = require("../controllers/pokemon");

const api = express.Router();

api.route("/").get(getAllPokemon);
api.route("/:id").get(getOnePokemon);
api.route("/:id/:info").get(getPokemonInfo);

module.exports = api;
