let fighters = [];

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

//post fighters
const postFighter = (req, res) => {
  const { pokemonSelected, pokemonOpponent } = req.body;
  // testing to see if this fixes error of previously selected fighters
  // fighters = [];
  fighters.push({ pokemonSelected: pokemonSelected });
  fighters.push({ pokemonOpponent: pokemonOpponent });

  //change to length to see if this helps
  if (fighters.length === 2) {
    res.status(200).json(fighters);
  } else {
    res.status(404).json({ msg: "No fighters yet" });
  }
};

//get fighters
const getFighters = (req, res) => {
  const result = playGame(fighters);
  console.log(result);
  if (result) {
    res.status(200).json(result);
  } else {
    res.status(400).json({ msg: "No fighters yet" });
  }
};

module.exports = { postFighter, getFighters };
