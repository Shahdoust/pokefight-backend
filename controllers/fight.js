let fighters = [];
//post fighters
const selectedPokemon = (req, res) => {
  const { pokemonSelected, pokemonOpponent } = req.body;
  fighters = [];
  fighters.push({ pokemonSelected: pokemonSelected });
  fighters.push({ pokemonOpponent: pokemonOpponent });
  console.log(pokemonSelected, pokemonOpponent);

  if (fighters) {
    res.status(200).json(fighters);
  }
};

//get fighters
const getFighters = (req, res) => {
  res.status(200).json(fighters);
};

module.exports = { selectedPokemon, getFighters };
