//post username
let usernames = [];
const usernamePost = (req, res) => {
  const { username } = req.body;
  usernames = [...usernames, username];
  console.log(usernames);
  if (username) {
    res.status(200).json(username);
  }
};

//get all username
const allUsername = (req, res) => {
  console.log(usernames);
  res.status(200).json({ usernames: usernames });
};

module.exports = { usernamePost, allUsername };
