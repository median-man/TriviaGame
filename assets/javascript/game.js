let currentQuestionIndex = -1;
let correct = 0;
let incorrect = 0;
let unanswered = 0;
let timerId = 0;
let timeRemaining = 0;
const questionTime = 10; // seconds
const answerTime = 3; // seconds

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
  // stop the timer
  clearInterval(timerId);

  // get the user's answer
  const userAnswer = $('input[name="answer"]:checked').val();
  let msg = '';

  // set message for correct/incorect and update score
  if (userAnswer === questions[currentQuestionIndex].correct_answer) {
    msg = 'Correct!';
    correct += 1;
  } else if (!userAnswer) {
    msg = 'Time\'s up!';
    unanswered += 1;
  } else {
    msg = 'Wrong answer.';
    incorrect += 1;
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
  setTimeout(showNextQuestion, answerTime * 1000);
}

// Updates display of the remaining time and stops timer when time runs down
function tick() {
  // if time remaining is 0, show the answer
  if (timeRemaining === 0) {
    showAnswer();

  // otherwise decrement the time
  } else {
    timeRemaining -= 1;
    // update display of time remaining
    renderTimer(timeRemaining);
  }
}

// Set initial values for game
function initGame() {
  correct = 0;
  incorrect = 0;
  unanswered = 0;
  currentQuestionIndex = -1;

  // shuffle order of questions
  questions.sort(() => 0.5 - Math.random());
}

// Function displays the final score view
function showFinalScore() {
  $('#correct').text(correct);
  $('#incorrect').text(incorrect);
  $('#unanswered').text(unanswered);

  // update the display
  $(() => {
    $('#answer-view').addClass('hidden');
    $('#score-view').removeClass('hidden');
  });
}

// Function returns jQuery object containing a question element
function createQuestion(question) {
  // create a new div
  const $div = $('<div>');
  const $form = $('<form>');
  const answers = [question.correct_answer, ...question.incorrect_answers];

  // append the question text to the div
  $(`<h2>${question.question}</h2>`).appendTo($div);

  // create array of answer elements with answers in randomized order
  answers.sort(() => 0.5 - Math.random());
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

  // if last question has been displayed, show final score view and stop the game
  if (currentQuestionIndex === questions.length) {
    return showFinalScore();
  }

  // set the html for the question
  $('#question').remove();
  $('#question-view').append(createQuestion(questions[currentQuestionIndex]).attr('id', 'question'));
  renderTimer(timeRemaining);

  // display the question view
  $(() => {
    $('#score-view').addClass('hidden');
    $('#start-view').addClass('hidden');
    $('#answer-view').addClass('hidden');
    $('#question-view').removeClass('hidden');
  });

  // start the timer for the question
  timerId = setInterval(tick, 1000);
}

$(document).ready(() => {
  // start the game when the start button is clicked
  $('.start').on('click', () => {
    initGame();
    showNextQuestion();
  });
});
