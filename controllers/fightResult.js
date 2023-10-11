let jsonData = require("../pokedex.json");
let fighters = [];

const getResult=async(req,res)=>{
  

    res.status(200).json(fighters[0]);

}

const pk=(req, res) => {
   
    const requestData = req.body;
    const{p1,p2}=req.body
    const pokimonP1Id=Number(p1)
    const pokimonP2Id=Number(p2);
     
    let p1attack
   // let p1Defence
    let p1SpAttack
    let p1SpDefence

  

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
    fighters.pop()
    fighters.push(winner)
    res.status(200).json(winner);
} else {
    fighters.pop()
    let winner = "Player 2 Wins";
    fighters.push(winner)
    res.status(200).json(winner);
}




}

module.exports = {getResult,pk};
