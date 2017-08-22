$(document).ready(function() {

	var game = {

		// array of objects consisting of questions, choices, and 
		// answers
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
		// template html element
		$qTemplate: $("q-template"),



		// ----- methods ----- //

		run: function() {
			// add questions (still hidden) to the document
			// set a timeout to ask user if still there
			// set event listeners and handle events




		}

	};




	game.run();
});

/**** development tools *****/
var myDevTools = {
	// unhide/re-hide elements based on options
	unhide: function(options) {
		var selector;
		var changed;
		if ( options == "a" || !options ) {
			selector = ".hidden";
		} else if ( options == "sections" ) {
			selector = "sections .hidden";
		} else if ( options == "undo" || options == "unhide" ) {
			$("unhidden").toggleClass("unhidden hidden");
		} else {
			console.log("myDevTools.unhide: invalid parameter passed");
		}
		if ( selector ) {
			changed = $(selector);
			changed.removeClass("hidden").addClass("unhidden");
			console.log("successfully unhid", changed );
		}
	}
};