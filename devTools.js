/*
Contains tests for development. Remove this file from published 
versions. Don't forget to remove link from html.
*/

/**** development tools *****/
var myDevTools = {
    // unhide/re-hide elements based on options
    unhide: function(options) {
        var selector;
        var changed;
        if (options == "a" || !options) {
            selector = ".hidden";
        } else if (options == "sections") {
            selector = "sections .hidden";
        } else if (options == "undo" || options == "unhide") {
            $(".unhidden").toggleClass("unhidden hidden");
        } else {
            console.log("myDevTools.unhide: invalid parameter passed");
        }
        if (selector) {
            changed = $(selector);
            changed.removeClass("hidden").addClass("unhidden");
            console.log("successfully unhid", changed);
        }

    },

    // validates generated html
    // thanks to Rob W who posted this on stack overlow
    // https://stackoverflow.com/questions/7752058/validate-dynamic-html-generated-by-javascript#answer-7752345
    validateHtml: function() {
        var form = document.createElement("form");
	    form.method = "POST";
	    form.enctype = "multipart/form-data";
	    form.action = "http://validator.w3.org/check";
	    form.target = "_blank";

	    /* Get local HTML*/
	    var html = "<!DOCTYPE html><html>" + document.documentElement.innerHTML + "</html>";
	    var post_data = {
	        fragment: html,/*Settings for validator*/
	        prefill: "0",
	        doctype: "HTML5",
	        prefill_doctype: "html401",
	        group: "0",
	        ss: "1",
	        outline: "1"
	    };
	    for(var name in post_data){
	        (function(){
	            var t = document.createElement("textarea");
	            t.name = name;
	            t.value = post_data[name];
	            form.appendChild(t)
	        })()
	    }
	    document.body.appendChild(form);
	    form.submit(); /* Open validator, in new tab*/
	    document.body.removeChild(form);
    }
};