
// basic game settings
var settings = {
	quizTime: 20 // quiz time in seconds
};

$(document).ready(function() {

	var game = {

		// array of objects consisting of questions, choices, and 
		// answers
		questions: [
			{
			    "category": "Entertainment: Board Games",
			    "type": "multiple",
			    "difficulty": "hard",
			    "question": "The board game 'Monopoly' is a variation of what board game?",
			    "correct_answer": "The Landlord's Game",
			    "incorrect_answers": [
			        "Territorial Dispute",
			        "Property Feud",
			        "The Monopolist's Game"
			    ]
			}, {
			    "category": "Entertainment: Board Games",
			    "type": "multiple",
			    "difficulty": "easy",
			    "question": "How many pieces are there on the board at the start of a game of chess?",
			    "correct_answer": "32",
			    "incorrect_answers": [
			        "16",
			        "20",
			        "36"
			    ]
			}, {
			    "category": "Entertainment: Board Games",
			    "type": "multiple",
			    "difficulty": "easy",
			    "question": 'Which of these games includes the phrase "Do not pass Go, do not collect $200"?',
			    "correct_answer": "Monopoly",
			    "incorrect_answers": [
			        "Pay Day",
			        "Cluedo",
			        "Coppit"
			    ]
			}, {
			    "category": "Entertainment: Board Games",
			    "type": "multiple",
			    "difficulty": "medium",
			    "question": "In Chess, the Queen has the combined movement of which two pieces?",
			    "correct_answer": "Bishop and Rook",
			    "incorrect_answers": [
			        "Rook and King",
			        "Knight and Bishop",
			        "King and Knight"
			    ]
			}
		],

		// ----- properties ----- //

		// template html element
		$qTemplate: $("#q-template"),

		// container for the results of the quiz
		quizResults: {},

		// holds the id returned for the quiz timer
		quizTimerId: false,

		// quiz timer (set to initial value in seconds)
		time: 30,


		// ----- methods ----- //

		addQuestions: function(arrQ) {
		// adds questions from questions property using template and 
		// inserts them above the template
		
			var $newQ;
			var arrChoices;
			var altStyle;
			var id;
			var qObj;

			// class for setting alternate styling on questions
			altStyle = "success";

			// add each question in arrQ to the page
			for ( var i = 0; i < arrQ.length; i++ ) {
				qObj = arrQ[i];
				id = "q" + i;

				// give the question an id property
				qObj.id = id;

				// create a copy of the template giving it a unique 
				// id based on index in the questions array
				$newQ = this.$qTemplate.clone()
					.attr("id", id).addClass("question");

				// odd indexed questions are given different style
				if ( i % 2 === 1 ) {
					$newQ.addClass(altStyle);
				}					

				// populate the question
				$newQ.find(".prompt").html(qObj.question);

				// get array of possible answers
				arrChoices = this.getChoices(qObj);

				// add a fieldset and bootstrap styling to the to 
				// put the answers in
				$newQ.find(".choices")
					.append(
						"<fieldset>"
						+ "<div class='form-group'>"
						+ "</div>"
						+ "</fieldset>"
				);

				// add each choice from q.choices
				for ( var n = 0; n < arrChoices.length; n++ ) {
					// add html for possible answer
					$newQ.find(".form-group")
						.append(
							"<div class='radio'>"
							+ "<label>"
							+ "<input type='radio'"
								+ "name='" + id + "-answer'"
								+ "value='" +  n + "'"
							+ ">" + arrChoices[n]
							+"</label>"
							+"</div>");
				}
				
				// insert the question in front of the template
				$newQ.insertBefore(this.$qTemplate);
			}
		},

		calculateResults: function() {
		// totals results and sets values for
		// game.quizResults

			// get the time elapsed
			game.quizResults.elapsedTime = settings.quizTime - game.time;
			
			// check each questions
			$(".question").each( function(i) {
				var correctAns;
				var userAns;

				// get the user and correct answers
				userAns = $(this).find("input:checked").parent().text();
				correctAns = game.questions[i].correct_answer;
				
				// if no answer
				if ( !userAns ) {
					// increment unanswered
					game.quizResults.unanswered++;
				}
				// if answer is correct
				else if ( userAns === correctAns) {
					// increment correct
					game.quizResults.correct++;
				}
				// else increment incorrect
				else {
					game.quizResults.incorrect++;
				}				
			});

			// return results object
			return game.quizResults;
		},

		getChoices: function(oQuestion) {
		// returns an array of possible answers (choices)
		// in randomized order
		// oQuestion is a question object

			// get array of correct and incorrect answers
			var arrChoices = oQuestion.incorrect_answers
				.concat(oQuestion.correct_answer);

			// shuffle the array
			var c;
			var randInt;

			for ( var i = arrChoices.length - 1; i > 0; i-- ) {
				// random index from array (0 to i)
				randInt = Math.floor( Math.random() * (i+1) );

				// swap with random element in array
				c = arrChoices[i];
				arrChoices[i] = arrChoices[randInt]
				arrChoices[randInt] = c;
			}
			return arrChoices;
		},

		resetQuestions: function() {
		// unlocks quesionts and clears answers
			$("fieldset")
				.prop("disabled", false)
				.find("input:checked")
				.prop("checked", false);
		},

		run: function() {
		// this method runs the game. should be called
		// only once after page loads.

			// add questions (still hidden) to the document
			this.addQuestions(this.questions);

			// start quiz if user clicks play button
			$(".start-game").on("click", this.startQuiz);

			// when user clicks done, stop the quiz
			$("#btnDone").on("click", this.stopQuiz);
		},
		
		quizTimer: function() {
		// function passed to setInterval. tracks time
		// and updates the displayed quiz time.

			game.setTime(game.time - 1);

			// if timer is 0 stop the quiz
			if ( game.time === 0 ) {
				game.stopQuiz();
			}
		},

		showResults: function(results) {
		// hides the questions and shows the results

			// update elements
			$("#score").html(
				"<p>Correct: " + results.correct + "</p>"
				+ "<p>Incorrect: " + results.incorrect + "</p>"
				+ "<p>Unanswered: " + results.unanswered + "</p>"
				+ "<p>Time: " + results.elapsedTime + " seconds</p>"
			);


			// show the results and hide the questions
			$( function() {
				$(".results").removeClass("hide");
				$(".question").addClass("hide");

			});
		},

		setTime: function(seconds) {
		// set the quiz time and update text of displayed time.
		// this does not show or hide the time display.
			this.time = seconds;
			$("#timer").text("Time: " + seconds);
		},

		startQuiz: function() {
		// starts the quiz and quiz timer

			// reset the timer
			game.setTime(settings.quizTime);

			// set/reset results
			game.quizResults = {
				correct: 0,
				incorrect: 0,
				unanswered: 0,
				elapsedTime: 0
			};

			// reset the questions
			game.resetQuestions();

			// hide results if they are displayed
			$(".results").addClass("hide");

			// dont render dom changes until they are all complete
			$( function() {
				// hide the large game brand and play button
				$(".navbar-brand").addClass("hide");
				$("header").addClass("hide");

				// add top padding to first section
				$("section").eq(0).css("padding-top", "100px");

				// show small game brand, timer, and questions
				$("#timer").removeClass("hide");
				$(".question").removeClass("hide");

				// move the done button to the last questions and 
				// display it
				$("fieldset").last().after($("#btnDone").removeClass("hide"))
			});

			// start the quiz timer for 1 second intervals
			game.quizTimerId = setInterval( game.quizTimer, 1000 );
		},

		stopQuiz: function() {
		// stops quiz and displays the results

			// lock the questions
			$("fieldset").prop("disabled", true);

			// stop the timer
			clearInterval(game.quizTimerId);			
			
			// render the quiz results and hide the questions
			game.calculateResults();
			game.showResults(game.quizResults);	
		}
	};

	game.run();	
});