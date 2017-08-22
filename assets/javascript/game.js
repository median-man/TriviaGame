$(document).ready(function() {

	var game = {

		// array of objects consisting of questions, choices, and answers
		questions: [
			{
				question: "What color is the sky?",
				choices: ["red", "yellow", "blue", "green"],
				answer: "blue"
			},
			{
				question: "How many fingers are on a regular hand?",
				choices: ["1", "3", "5", "4"],
				answer: "4"
			}
		],
		$qTemplate: $("q-template"),



		// ----- methods ----- //

		initGame: function() {
			// add questions to the document
			for ( var i = 0; i < questions.length; i++ ) {
				// copy question template and insert the copy after the template
				// set the id of the question section = to "q" + i
				// set the prompt text

				for ( var x = 0; x < questions.choices.length; x++ ) {
					// add list of answers to . choices
				}
			} 


			// listener for click events
			$(document).on("click", function() {

			});
		},

		run: function() {





		}

	};




	game.run();
});