const timerId = 0;

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

// Function returns jQuery object containing a question element
function createQuestion(question) {
  // create a new div
  let $div = $('<div>');
  let $form = $('<form>');
  let answers = [question.correct_answer, ...question.incorrect_answers];
  
  // append the question text to the div
  $(`<h2>${question.question}</h2>`).appendTo($div);
  
  // create array of answer elements
  answers.forEach((answer) => {
    $form.append(`<div class="radio"><label><input type="radio" name="answer">${answer}</label></div>`);
  });
  $div.append($form);
  $form
    .append('<button type="submit" class="btn btn-lg">Next</button>')
    .on('submit', (event) => {
      event.preventDefault();
      console.log(event);
    });
  return $div;
}

// start the game when the start button is clicked
$(document).ready(() => {
  $('#start').on('click', () => {
    // hide the initial view and show the first question
    // show the first question
    let $question = createQuestion(questions[0]);
    $('#question-view').append($question);
    $(() => {
      $('#start-view').addClass('hidden');
      $('#question-view').removeClass('hidden');
    });
    // start the timer for the first question
  });
});
