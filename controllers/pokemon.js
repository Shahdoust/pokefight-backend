let jsonData = require("../pokedex.json");

//get all pokemons
const getAllPokemon = async (req, res) => {
  try {
    if (!jsonData.length) {
      res.status(200).json({ msg: "No pokemon available" });
    } else {
      res.status(200).json(jsonData);
    }
  } catch (error) {
    res.status(500).json(error);
  }
};

//get one pokemon
const getOnePokemon = async (req, res) => {
  const { id } = req.params;
  const name = req.params.id;

  const pokemon = jsonData.find((data) => {
    if (Number(id) === Number(data.id)) {
      return data;
    } else {
      const keys = Object.keys(data);
      for (let language in data.name) {
        if (data.name[language] === name) {
          return data;
        }
      }
    }
  });
  if (pokemon) {
    res.status(200).json(pokemon);
  } else {
    res.status(404).json({ msg: "No pokemon found" });
  }
};

//get pokemon info
const getPokemonInfo = async (req, res) => {
  const { info } = req.params;
  const id = req.params.id;
  let pokemonInfo = null;
  jsonData.find((data) => {
    if (Number(id) === Number(data.id)) {
      let keys = Object.keys(data);

      for (let k of keys) {
        if (info === k) {
          pokemonInfo = data[k];
          break;
        }
      }
    }
  });

  if (pokemonInfo) {
    res.status(200).json(pokemonInfo);
  } else {
    res.status(404).json({ msg: "No Pokemon found" });
  }
};

module.exports = {
  getAllPokemon,
  getOnePokemon,
  getPokemonInfo,
};
