const Result = require("../schemas/Username");
let dataStore = {};
let fighters = [];

//get username
const postOneUser = async (req, res) => {
  try {
    const { username } = req.body;
    dataStore.username = username;
    res.status(201).json(username);
  } catch (error) {
    res.status(500).json(error);
  }
};

//post fighters
const postFighter = async (req, res) => {
  const { pokemonSelected, pokemonOpponent } = req.body;
  try {
    fighters = [];
    fighters.push({ pokemonSelected: pokemonSelected });
    fighters.push({ pokemonOpponent: pokemonOpponent });
    const resultGame = playGame(fighters);
    dataStore.result = resultGame;

    const username = dataStore.username;
    const wins = dataStore.result.winner.english;
    const loses = dataStore.result.loser.english;
    const points = dataStore.result.points;
    const result = await Result.create({ username, wins, loses, points });
    if (result) {
      res.status(200).json(result);
    } else {
      res.status(404).json({ msg: "Can not create data in DB" });
    }
  } catch (error) {}
};

//get result of the game
const getOneResult = (req, res) => {
  if (!dataStore) {
    res.status(200).json({ msg: "No result in the DB" });
  } else {
    res.status(200).json({ dataStore });
  }
};

//get all result
const getAllResults = async (req, res) => {
  try {
    const results = await Result.find();
    if (!results.length) {
      res.status(200).json({ msg: "No result in the DB" });
    } else {
      res.status(200).json({ results });
    }
  } catch (error) {
    res.status(500).json(error);
  }
};

// Function to calculate the total stats of a Pokemon
function calculateTotalStats(pokemon) {
  return (
    pokemon.base.HP +
    pokemon.base.Attack +
    pokemon.base.Defense +
    pokemon.base["Sp. Attack"] +
    pokemon.base["Sp. Defense"] +
    pokemon.base.Speed
  );
}

// Function to play the game
function playGame(pokemon) {
  // Calculate the total stats for each Pokemon
  let totalStats1 = calculateTotalStats(pokemon[0].pokemonSelected);
  let totalStats2 = calculateTotalStats(pokemon[1].pokemonOpponent);

  // The Pokemon with the higher total stats is the winner
  let winner =
    totalStats1 > totalStats2
      ? pokemon[0].pokemonSelected
      : pokemon[1].pokemonOpponent;

  // The loser is the Pokemon that isn't the winner
  let loser =
    winner === pokemon[0].pokemonSelected
      ? pokemon[1].pokemonOpponent
      : pokemon[0].pokemonSelected;

  // The points are the difference in total stats
  let points = Math.abs(totalStats1 - totalStats2);

  // Return the result
  return {
    winner: winner.name,
    loser: loser.name,
    points: points,
  };
}

module.exports = {
  postOneUser,
  getOneResult,
  postFighter,
  getAllResults,
};
