$(document).ready(function() {

	var game = {

		// array of objects consisting of questions, choices, and 
		// answers
		questions: [
			{
				q: "What color is the sky?",
				choices: ["red", "yellow", "blue", "green"],
				a: "blue"
			},
			{
				q: "How many fingers are on a regular hand?",
				choices: ["1", "3", "5", "4"],
				a: "4"
			},
			{
				q: "The pope is from which of the follow religions?",
				choices: ["Mormon", "Roman Catholic", "Islam", "Hindu"],
				a: "Roman Catholic"
			}
		],
		// template html element
		$qTemplate: $("#q-template"),



		// ----- methods ----- //

		addQuestions: function(arrQ) {
		// adds questions from questions property using template and 
		// inserts them above the template
		
			var $newQ;
			var altStyle;
			var id;
			var hrefNext;
			var hrefPrev;
			var qObj;
			var strHtml;

			// class for setting alternate styling on questions
			altStyle = "success";

			// add each questions in this.questions to the page
			for ( var i = 0; i < arrQ.length; i++ ) {
				qObj = arrQ[i];
				id = "q" + i;

				// set href values for links to prev and next
				// questions
				hrefNext = "#q" + ( i + 1 );
				hrefPrev = "#q" + ( i - 1);

				// create a copy of the template giving it a unique 
				// id based on index in the questions array
				$newQ = this.$qTemplate.clone()
					.attr("id", id);

				// odd indexed questions are given different style
				if ( i % 2 === 1 ) {
					$newQ.addClass(altStyle);
				}
					

				// populate the question
				$newQ.find(".prompt").text(qObj.q);

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


				// add each choice from q.choices
				for ( var n = 0; n < qObj.choices.length; n++ ) {
					// build html string for radio button
					strHtml = "<label><input "
						+ "type='radio' "
						+ "name='" + id + "-answer' "
						+ "value='choice-" + qObj.choices[n]
						+ "'>" + qObj.choices[n]
						+ "</label>";

					// add the button to page
					$newQ.find(".choices").append(strHtml);
				}
				
				// insert the question in front of the template
				$newQ.insertBefore(this.$qTemplate);
			}

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
			// whenn user clicks done, stop the quiz

		},

		startQuiz: function() {
		// starts the quiz and quiz timer

			// hide the large game brand
			// show timer
			// show small game brand
			// show the questions
			// start the quiz timer
			// stop the quiz when time is up
		},

		stopQuiz: function() {
		// stops quiz and displays the results

			// get number of questions correct
			// get number of questions incorrect
			// get number of questions unanswered
			// display quiz results
		}

	};

	game.run();

	/***** test code *****/
	// myDevTools.unhide("sections");
});