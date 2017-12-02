let currentQuestionIndex = -1;
let score = 0;
let timerId = 0;
let timeRemaining = 0;
const questionTime = 5; // seconds
const answerTime = 4; // seconds

// collection of questions for game
const questions = [
  {
    category: 'Entertainment: Board Games',
    type: 'multiple',
    difficulty: 'hard',
    question: "The board game 'Monopoly' is a variation of what board game?",
    correct_answer: "The Landlord's Game",
    incorrect_answers: [
      'Territorial Dispute',
      'Property Feud',
      "The Monopolist's Game",
    ],
  }, {
    category: 'Entertainment: Board Games',
    type: 'multiple',
    difficulty: 'easy',
    question: 'How many pieces are there on the board at the start of a game of chess?',
    correct_answer: '32',
    incorrect_answers: [
      '16',
      '20',
      '36',
    ],
  }, {
    category: 'Entertainment: Board Games',
    type: 'multiple',
    difficulty: 'easy',
    question: 'Which of these games includes the phrase "Do not pass Go, do not collect $200"?',
    correct_answer: 'Monopoly',
    incorrect_answers: [
      'Pay Day',
      'Cluedo',
      'Coppit',
    ],
  }, {
    category: 'Entertainment: Board Games',
    type: 'multiple',
    difficulty: 'medium',
    question: 'In Chess, the Queen has the combined movement of which two pieces?',
    correct_answer: 'Bishop and Rook',
    incorrect_answers: [
      'Rook and King',
      'Knight and Bishop',
      'King and Knight',
    ],
  },
];

// displays time remaining
function renderTimer(seconds) {
  $('#timer').text(seconds);
}

function showAnswer() {
  // get the user's answer
  const userAnswer = $('input[name="answer"]:checked').val();
  let msg = '';

  // set message for correct incorect
  if (userAnswer === questions[currentQuestionIndex].correct_answer) {
    msg = 'Correct!';
  } else {
    msg = 'Wrong answer.';
  }
  $('#answer-msg').text(msg);

  // set html for user's answer
  $('#user-answer').text(userAnswer);

  // set html for correct answer
  $('#correct-answer').text(questions[currentQuestionIndex].correct_answer);

  // hide the question view and review the answer view
  $(() => {
    $('#question-view').addClass('hidden');
    $('#answer-view').removeClass('hidden');
  });

  // set timeout to show next question
}

// Updates display of the remaining time and stops timer when time runs down
function tick() {
  // if time remaining is 0, show the answer and stop the timer
  if (timeRemaining === 0) {
    clearInterval(timerId);
    showAnswer();

  // otherwise decrement the time
  } else {
    timeRemaining -= 1;
    // update display of time remaining
    renderTimer(timeRemaining);
  }
}

// Function returns jQuery object containing a question element
function createQuestion(question) {
  // create a new div
  const $div = $('<div>');
  const $form = $('<form>');
  const answers = [question.correct_answer, ...question.incorrect_answers];

  // append the question text to the div
  $(`<h2>${question.question}</h2>`).appendTo($div);

  // create array of answer elements
  answers.forEach((answer) => {
    $form.append(`<div class="radio"><label><input type="radio" name="answer" value="${answer}">${answer}</label></div>`);
  });
  $div.append($form);
  $form
    .append('<button type="submit" class="btn btn-lg">Next</button>')
    .on('submit', (event) => {
      event.preventDefault();
      showAnswer();
    });
  return $div;
}

// Function display the next question and sets question timer
function showNextQuestion() {
  // increment the index of the current question and reset question timer
  currentQuestionIndex += 1;
  timeRemaining = questionTime;

  // hide the initial view and show the first question
  // show the first question
  const $question = createQuestion(questions[0]);
  $('#question-view').append($question);
  renderTimer(timeRemaining);
  $(() => {
    $('#start-view').addClass('hidden');
    $('#question-view').removeClass('hidden');
  });

  // start the timer for the first question
  timerId = setInterval(tick, 1000);
}

$(document).ready(() => {
  // start the game when the start button is clicked
  $('#start').on('click', showNextQuestion);
});
