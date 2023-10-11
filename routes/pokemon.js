const express = require("express");

const {
  getAllPokemon,
  getPokemonBySearch,
  getOnePokemon,
  getPokemonInfo,
} = require("../controllers/pokemon");
const { usernamePost, allUsername } = require("../controllers/postusername");

// const { postFighter, getFighters } = require("../controllers/fight");

const {
  postOneUser,
  getOneResult,
  postFighter,
  getAllResults,
} = require("../controllers/result");

const api = express.Router();
api.route("/game/save/username").post(postOneUser);
api.route("/game/result").get(getOneResult);
api.route("/game/save").post(postFighter).get(getAllResults);

api.route("/").get(getAllPokemon);
api.route("/search").get(getPokemonBySearch);
api.route("/:id").get(getOnePokemon);
api.route("/:id/:info").get(getPokemonInfo);

module.exports = api;
