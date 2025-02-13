const express = require("express");
const app = express();

app.get("/top-scores", (req, res) => {
  res.json({ scores: [100, 95, 90, 85, 190, 120, 180, 200, 500, 60, 450, 350] });
});

app.listen(3000, () => console.log("Leaderboard service running on port 3000"));

module.exports = app;