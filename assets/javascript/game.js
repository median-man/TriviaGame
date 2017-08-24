$(document).ready(function() {

	var game = {

		// array of objects consisting of questions, choices, and 
		// answers
		questions: [
			{
			    "category": "Entertainment: Board Games",
			    "type": "multiple",
			    "difficulty": "hard",
			    "question": "The board game &#039;Monopoly&#039; is a variation of what board game?",
			    "correct_answer": "The Landlord&#039;s Game",
			    "incorrect_answers": [
			        "Territorial Dispute",
			        "Property Feud",
			        "The Monopolist&#039;s Game"
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
			    "question": "Which of these games includes the phrase &quot;Do not pass Go, do not collect $200&quot;?",
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
		// template html element
		$qTemplate: $("#q-template"),



		// ----- methods ----- //

		addQuestions: function(arrQ) {
		// adds questions from questions property using template and 
		// inserts them above the template
		
			var $newQ;
			var arrChoices;
			var altStyle;
			var id;
			// var hrefNext;
			// var hrefPrev;
			var qObj;
			var strHtml;

			// class for setting alternate styling on questions
			altStyle = "success";

			// add each question in arrQ to the page
			for ( var i = 0; i < arrQ.length; i++ ) {
				qObj = arrQ[i];
				id = "q" + i;

				// set href values for links to prev and next
				// questions
				// hrefNext = "#q" + ( i + 1 );
				// hrefPrev = "#q" + ( i - 1);

				// create a copy of the template giving it a unique 
				// id based on index in the questions array
				$newQ = this.$qTemplate.clone()
					.attr("id", id);

				// odd indexed questions are given different style
				if ( i % 2 === 1 ) {
					$newQ.addClass(altStyle);
				}
					

				// populate the question
				$newQ.find(".prompt").html(qObj.question);

				// // hide/show previous/next/done accordingly
				// if ( i === 0 ) {
				// 	// first question. hide previous
				// 	$newQ.find(".previous").addClass("hide");

				// 	// set href for next question
				// 	$newQ.find(".next")
				// 		.attr("href", "#q" + ( i + 1 ));

				// // if the question is the final question
				// } else if ( i === arrQ.length - 1 ) {
				// 	// set href for previous to id of prev question
				// 	$newQ.find(".previous")
				// 		.attr("href", hrefPrev);

				// 	// last question. hide next and show done
				// 	$newQ.find(".next").addClass("hide");
				// 	$newQ.find(".done").removeClass("hide");

				// } else {
				// 	// set href for next and previous
				// 	$newQ.find(".previous")
				// 		.attr("href", hrefPrev);
				// 	$newQ.find(".next")
				// 		.attr("href", hrefNext);
				// }

				// get array of possible answers
				arrChoices = this.getChoices(qObj);

				// add each choice from q.choices
				for ( var n = 0; n < arrChoices.length; n++ ) {
					// add html for possible answer
					strHtml = "<div class='radio'>"
						+ "<label>"
						+ "<input type='radio'"
							+ "name='" + id + "-answer'"
							+ "value='" +  arrChoices[n] + "'"
						+ ">" + arrChoices[n]
						+"</label>"
						+ "</div>";
					$newQ.find(".choices").append(strHtml);
				}
				
				// insert the question in front of the template
				$newQ.insertBefore(this.$qTemplate);
			}

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

		run: function() {
		// this method runs the game. should be called
		// only once after page loads.

			// add questions (still hidden) to the document
			this.addQuestions(this.questions);

			// TODO:
			// set a timeout to ask user if still there

			// start quiz if user clicks play button
			$(".start-game").on("click", this.startQuiz);

			// when user clicks next, display next question
			// when user clicks previous, display prev queston
			// when user clicks done, stop the quiz

		},
		quizTimer: function() {
		// function passed to setInterval. tracks time
		// and updates the displayed quiz time.

			// decrement the timer
			// update the displayed quiz time
			// if timer is 0 stop the quiz
		},

		startQuiz: function() {
		// starts the quiz and quiz timer

			// set the remaining time to initial value
			// hide the large game brand
			// show timer
			// show small game brand
			// show the questions
			// start the quiz timer
		},

		stopQuiz: function() {
		// stops quiz and displays the results

			// lock the questions
			// stop the timer
			// calculate elapsed time
			// get number of questions correct
			// get number of questions incorrect
			// get number of questions unanswered
			// display quiz results
		}

	};

	game.run();

	/***** test code *****/
	// myDevTools.unhide("sections");
	$("section").toggleClass("hide");
});