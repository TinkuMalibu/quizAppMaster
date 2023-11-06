const highScoresList = document.getElementById("highScoresList");
const highScores = JSON.parse(localStorage.getItem('highScores')) || [];

highScoresList.innerHTML = highScores.map(score => {
  return `<li class="high-score">${score.name}  - ${score.score}</li>`
}).join("");

// this will display the high scores on the scree
