let jsonData = require("../pokedex.json");
let fighters = [];

const test=async(req,res)=>{
   // const {name}=req.params
   if (resulttotalpowep1 > resulttotalpowep2) {
    let winner = "Player 1 Wins";
    res.status(200).json(winner);
} else {
    let winner = "Player 2 Wins";
    res.status(200).json(winner);
}
}

const pk=(req, res) => {
    // Handle the POST request here
    const requestData = req.body;
    const{p1,p2}=req.body
    const pokimonP1Id=Number(p1)
    const pokimonP2Id=Number(p2);
      // p1Hp;
    let p1attack
   // let p1Defence
    let p1SpAttack
    let p1SpDefence

    //res.json({ message: 'Post request successful', data: requestData });
   // res.json({ message: 'Post request successful', result: result });

   const pokemonp2 = jsonData.find((y) => {
    if (pokimonP2Id === Number(y.id)) {
      const p2Hp=y.base.HP
      return p2Hp;
      
  
 }
  });
  const p2hp= Number(pokemonp2.base.HP)
  const p2Defence=Number(pokemonp2.base.Defense)
  const p2superDefense = Number(pokemonp2.base['Sp. Defense']);
  const p2SuperAttack=Number(pokemonp2.base['Sp. Attack']);
  const p2speed=Number(pokemonp2.base.Speed)
  const resulttotalpowep2=p2hp+p2Defence+p2superDefense+p2SuperAttack+p2speed









/////

   const pokemonp1 = jsonData.find((x) => {
    if (pokimonP1Id === Number(x.id)) {
      const p1Hp=x.base.HP
      return p1Hp;
      
  
 }
  });
  const p1hp= Number(pokemonp1.base.HP)
  const p1Defence=Number(pokemonp1.base.Defense)
  const p1superDefense = Number(pokemonp1.base['Sp. Defense']);
  const p1SuperAttack=Number(pokemonp1.base['Sp. Attack']);
  const p1speed=Number(pokemonp1.base.Speed)
   resulttotalpowep1=p1hp+p1Defence+p1superDefense+p1SuperAttack+p1speed

  if (resulttotalpowep1 > resulttotalpowep2) {
    let winner = "Player 1 Wins";
    res.status(200).json(winner);
} else {
    let winner = "Player 2 Wins";
    res.status(200).json(winner);
}




}










   
////



module.exports = {test,pk};
