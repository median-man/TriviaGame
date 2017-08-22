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
			}
		],
		// template html element
		$qTemplate: $("#q-template"),



		// ----- methods ----- //

		addQuestions: function() {
		// adds questions from questions property using template and 
		// inserts them above the template
			var $newQ;
			var id;
			var qObj;
			var strHtml;

			// add each questions in this.questions to the page
			for ( var i = 0; i < this.questions.length; i++ ) {
				qObj = this.questions[i];
				id = "q" + i;

				// create a copy of the template giving it a unique 
				// id based on index in the questions array
				$newQ = this.$qTemplate.clone()
					.attr("id", id);
					

				// populate the question
				$newQ.find(".prompt").text(qObj.q);

				// hide/show previous/next/done accordingly
				if ( i === 0 ) {
					// first question. hide previous
					$newQ.find(".previous").addClass("hidden");

				} else if ( i === this.questions.length - 1 ) {
					// last question. show done instead of next
					$newQ.find(".next").addClass("hidden");
					$newQ.find(".done").removeClass("hidden");
				}

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
			this.addQuestions();

			// TODO:
			// set a timeout to ask user if still there

			// set event listeners
			$(".start-game").on("click", this.startGame);

		},

		startGame: function() {

		}

	};

	game.run();

	/***** test code *****/
	myDevTools.unhide("sections");
});