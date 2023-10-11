const User = require("../schemas/Username");
//post username
let usernames = [];
const usernamePost = async (req, res) => {
  console.log("usernamePost");
  const { username } = req.body;
  try {
    usernames = [...usernames, username];
    console.log(usernames);
    if (username) {
      res.status(200).json({ username });
    } else {
      res.status(404).json({ msg: "User name not valid" });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

//get all username
const allUsername = (req, res) => {
  console.log("allUsername");
  if (usernames.length > 0) {
    res.status(200).json({ usernames: usernames });
  } else {
    res.status(404).json({ msg: "No user name available" });
  }
};

module.exports = { usernamePost, allUsername };
