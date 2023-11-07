const question = document.getElementById('question');
const choices = Array.from(document.getElementsByClassName('choice-text'));
const progressText= document.getElementById('progressText');
const scoreText = document.getElementById('score');
const progressBarFull = document.getElementById('progressBarFull');

let currentQuestion = {};
let acceptingAnswers = false;
let score = 0;
let questionCounter = 0;
let availableQuestions = [];

let questions = []; // this will be an empty array that will hold the questions

fetch("https://opentdb.com/api.php?amount=10&category=25&type=multiple")
.then(res => {
  return res.json(); // this will return the response in json format
})
.then(loadedQuestions => {
  console.log(loadedQuestions.results);
  loadedQuestions.results.map(loadedQuestion => {
    const formattedQuestions = {
      question: loadedQuestion.question
    }
    const answerChoices = [...loadedQuestion.incorrect_answers]; // this will spread the incorrect answers into the answer choices array
    formattedQuestions.answer = Math.floor(Math.random() * 3) + 1; // this will give us a random number between 1 and 3
    answerChoices.splice(formattedQuestions.answer - 1, 0, loadedQuestion.correct_answer); // this will insert the correct answer into the answer choices array
    answerChoices.forEach((choice, index) => {
      formattedQuestions['choice' + (index + 1)] = choice;
    })
    return formattedQuestions;
  });
  //questions = loadedQuestions;
  //startGame();
}) // this will fetch the questions from the json file
.catch(err =>{
  console.error(err);
})

//CONSTANTS

const CORRECT_BONUS = 10;
const MAX_QUESTIONS = 3;

startGame = () => {
  questionCounter = 0;
  score = 0;
  availableQuestions = [...questions]; // spread operator
  getNewQuestion();

};

getNewQuestion = () => {
  if (availableQuestions.length === 0 || questionCounter >= MAX_QUESTIONS) {
    // go to the end page
    localStorage.setItem('mostRecentScore', score);
    return window.location.assign('/end.html');
  }
  questionCounter++; // when the quiz starts, the question counter is 0, so we need to increment it by 1
  progressText.innerText = `Question ${questionCounter}/${MAX_QUESTIONS}`; // this will display the question counter on the screen
  // update the progress bar
  console.log((questionCounter / MAX_QUESTIONS) * 100);
  progressBarFull.style.width = `${(questionCounter / MAX_QUESTIONS) * 100}%`; // this will update the progress bar

  let questionIndex = Math.floor(Math.random() * availableQuestions.length);
  currentQuestion = availableQuestions[questionIndex]; // this will give us a random question from the available questions
  question.innerText = currentQuestion.question; // this will display the question on the screen

  choices.forEach(choice => {
    const number = choice.dataset['number']; // this will give us the number of the choice
    choice.innerText = currentQuestion['choice' + number]; // this will display the choices on the screen
  });

  availableQuestions.splice(questionIndex, 1); // this will remove the question from the available questions array
  acceptingAnswers = true;
};

choices.forEach(choice => {
  choice.addEventListener('click', e => {
    if (!acceptingAnswers) return; // if we are not accepting answers, then we return

    acceptingAnswers = false; // if we are accepting answers, then we set it to false
    selectedChoice = e.target; // this will give us the choice that the user selected
    selectedAnswer = selectedChoice.dataset['number']; // this will give us the number of the choice that the user selected

    const classToApply =
    selectedAnswer == currentQuestion.answer ? "correct" : "incorrect";

    if (classToApply === 'correct') {
      incrementScore(CORRECT_BONUS);
    }

    selectedChoice.parentElement.classList.add(classToApply);

    setTimeout(() => {
      selectedChoice.parentElement.classList.remove(classToApply);
      getNewQuestion();
    }, 1000);
  });
});

incrementScore = (num) => {
  score += num;
  scoreText.innerText = score;
}
