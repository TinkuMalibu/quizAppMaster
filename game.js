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

let questions = [
  {
      question: 'Inside which HTML element do we put the JavaScript??',
      choice1: '<script>',
      choice2: '<javascript>',
      choice3: '<js>',
      choice4: '<scripting>',
      answer: 1,
  },
  {
      question: "What is the correct syntax for referring to an external script called 'xxx.js'?",
      choice1: "<script href='xxx.js'>",
      choice2: "<script name='xxx.js'>",
      choice3: "<script src='xxx.js'>",
      choice4: "<script file='xxx.js'>",
      answer: 3,
  },
  {
      question: "How do you write 'Hello World' in an alert box?",
      choice1: "msgBox('Hello World');",
      choice2: "alertBox('Hello World');",
      choice3: "msg('Hello World');",
      choice4: "alert('Hello World');",
      answer: 4,
  },
];

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

startGame();
