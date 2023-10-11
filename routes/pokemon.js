const express = require("express");

const {
  getAllPokemon,
  getPokemonBySearch,
  getOnePokemon,
  getPokemonInfo,
} = require("../controllers/pokemon");
const { usernamePost, allUsername } = require("../controllers/postusername");

const { selectedPokemon, getFighters } = require("../controllers/fight");

const api = express.Router();
api.route("/username").post(usernamePost).get(allUsername);
api.route("/fight").post(selectedPokemon).get(getFighters);
api.route("/").get(getAllPokemon);
api.route("/search").get(getPokemonBySearch);
api.route("/:id").get(getOnePokemon);
api.route("/:id/:info").get(getPokemonInfo);

module.exports = api;
