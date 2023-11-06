const username = document.getElementById('username');
const saveScoreBtn = document.getElementById('saveScoreBtn');
const finalScore = document.getElementById('finalScore');
const mostRecentScore = localStorage.getItem('mostRecentScore');

const highScores = JSON.parse(localStorage.getItem('highScores')) || []; // if there are no high scores, then we will set it to an empty array
const MAX_HIGH_SCORES = 5; // this will limit the high scores to 5


finalScore.innerText = mostRecentScore;

username.addEventListener('keyup', () => {
  saveScoreBtn.disabled = !username.value;
})
saveHighScore = (e) => {
  console.log('clicked the save button!');
  e.preventDefault();

  const score = {
    score: mostRecentScore,
    name: username.value
  };
  highScores.push(score); // this will push the score into the high scores array

  highScores.sort((a,b) => b.score - a.score); // this will sort the high scores from highest to lowest

  highScores.splice(5); // this will remove the scores after the 5th score
  localStorage.setItem('highScores', JSON.stringify(highScores)); // this will save the high scores into the local storage
  window.location.assign('/'); // this will take us back to the home page
  };
