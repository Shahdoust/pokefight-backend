const Result = require("../schemas/Username");
let dataStore = {};
let fighters = [];
let singleUsername = [];
//get username
const postOneUser = async (req, res) => {
  try {
    const { username } = req.body;

    if (username) {
      dataStore.username = username;
      singleUsername = username;
      res.status(200).json(username);
    } else {
      // console.log(findUser);
      return res.status(500).json({ msg: "No data " });
    }
  } catch (error) {
    res.status(500).json(error);
  }
};

const getOneUser = async (req, res) => {
  const username = singleUsername;

  if (username) {
    res.status(200).json({ username });
  } else {
    res.status(200).json({ msg: "Data is not correct" });
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
    const wins = dataStore.result.winner;
    const loses = dataStore.result.loser;
    const points = dataStore.result.points;
    const findUser = await Result.findOne({ username: username });

    if (!findUser) {
      const result = await Result.create({ username, wins, loses, points });
      if (result) {
        res.status(200).json(result);
      } else {
        res.status(404).json({ msg: "Can not create data in DB" });
      }
    } else if (findUser) {
      const objResult = await Result.findOne({ username: username });
      const id = objResult["_id"];
      const wins = objResult["wins"] + dataStore.result.winner;
      const loses = objResult["loses"] + dataStore.result.loser;
      const points = objResult["points"] + dataStore.result.points;
      const result = await Result.findOneAndUpdate(
        { _id: id },
        { $set: { wins: wins, loses: loses, points: points } },
        { new: true }
      );
      res.status(200).json(result);
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

//get fighters
const oneFighter = (req, res) => {
  if (fighters) {
    res.status(200).json(fighters);
  } else {
    res.status(400).json({ msg: "No fighters yet" });
  }
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
  let selectedWinner =
    totalStats1 > totalStats2
      ? "pokemonSelected" //pokemon[0].pokemonSelected
      : "pokemonOpponent"; //pokemon[1].pokemonOpponent;

  // Declare the vars
  let winner = 0;
  let loser = 0;
  let points = 0;

  // The loser is the Pokemon that isn't the winner

  let selectedLoser =
    selectedWinner === "pokemonSelected"
      ? "pokemonOpponent" //pokemon[1].pokemonOpponent
      : "pokemonSelected"; //pokemon[0].pokemonSelected;
  if (selectedWinner === "pokemonSelected") {
    winner = 1;
  } else {
    loser = 1;
  }

  // if (selectedLoser === "pokemonOpponent") {
  //   winner = 1;
  // } else {
  //   loser = 1;
  // }

  // The points are the difference in total stats
  if (selectedWinner === "pokemonSelected")
    points = Math.abs(totalStats1 - totalStats2);
  // Return the result
  return {
    winner: winner,
    loser: loser,
    points: points,
  };
}

module.exports = {
  postOneUser,
  getOneUser,
  getOneResult,
  postFighter,
  getAllResults,
  oneFighter,
};
