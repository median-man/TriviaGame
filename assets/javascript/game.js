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

				// create a copy of the template and insert it above
				// the template giving it a unique id based on index
				// in the questions array
				$newQ = this.$qTemplate.clone()
					.attr("id", id)
					.insertBefore(this.$qTemplate);

				// populate the question
				$newQ.find(".prompt").text(qObj.q);

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
			}
		},

		run: function() {
			// add questions (still hidden) to the document
			this.addQuestions();
			// set a timeout to ask user if still there
			// set event listeners and handle events
		}

	};

	game.run();

	/***** test code *****/
	// myDevTools.unhide();
});