$(document).ready(function() {

	var identifier = 1;
	var questions = [];

	function Question(text, choices, correctAnswer, currentChoice) {
		var t = this;
		t.text = text;
		t.choices = choices;
		t.correctAnswer = correctAnswer;
		t.currentChoice = currentChoice;
		t.identifier = identifier++;

		t.getChoices = function() {
			var html = '<div id="qContainer">';

			for (var choiceId in t.choices) {

				html += '<input type="radio" value=' + choiceId +
					' class="option" name="choice" />';

				html += '<label class="optionLabel" for="' + t.choices[choiceId] + '">' +
					t.choices[choiceId] + '</label> <br />';

			}

			if (t.identifier < questions.length) {
				html +=
					'<button class="btn btn-primary btn-lg pull-right button-scroll" type="button" value="' +
					(t.identifier + 1) + '">Next</button>';
			}

			if ((t.identifier - 1) > 0) {
				html +=
					'<button class="btn btn-warning btn-lg pull-left button-scroll" type="button" value="' +
					(t.identifier - 1) + '">Back</button>';
			}
			html += '</div>';
			$('.questions-container').append(html);
		};

		t.isCorrect = function() {
			return (t.currentChoice === correctAnswer) ? true : false;
		};

		t.renderTitle = function() {
			var html = '<h3 class="text-primary" id="question"><em>' + t.text +
				'</em></h3> <br />';
			$('#qContainer').prepend(html);
			$('#qContainer').prepend('<h2>Question ' + t.identifier + '</h2>');
		};

		questions.push(t);
	};

	Question.prototype = {
		constructor: Question
	};

	function main() {

		var currentQuestion = 0;
		var question1 = new Question(
			'Who am I?', ['Vyzaldy', 'Andres', 'Prueba'],
			0
		);
		var question2 = new Question(
			'Another question?', ['Una', 'DOs', 'Tres'],
			1
		);
		var question3 = new Question(
			'The next question', ['a', 'b', 'c'],
			2
		);

		var question4 = new Question(
			'What time is it?', ['10:00 pm', '7:22 pm', '04:37 am'],
			1
		);

		console.log(questions);
		questions[0].getChoices();
		questions[0].renderTitle();

		$('.questions-container').on('click', '.button-scroll', function() {
			var value = $(this).val();

			$('#qContainer').remove();

			currentQuestion = value - 1;
			questions[value - 1].getChoices();
			questions[value - 1].renderTitle();

			if (questions[value - 1].currentChoice >= 0) {
				$('.option[value="' + questions[value - 1].currentChoice + '"]').prop(
					'checked', true);
			}
			console.log(questions[value - 1].currentChoice);

		});

		$('.questions-container').on('change', '.option', function() {

			questions[currentQuestion].currentChoice = $(this).val();

		});
	}

	main();
});
