$(document).ready(function() {
  function Question(text, choices, correctAnswer, currentChoice)  {
    var t = this;
    t.text = text;
    t.choices = choices;
    t.correctAnswer = correctAnswer;
    t.currentChoice = currentChoice;
    
    t.getChoices = function() {
      var html = "";
      
      for(var choiceId in t.choices) {

        html += '<input type="radio" value=' + choiceId + '"/>';  
        html += '<label for="' + t.choices[choiceId] + '">' + t.choices[choiceId] + '</label> <br />';
        console.log(t.choices[choiceId]);
        console.log(choiceId);
      }
      $('.questions-container').prepend(html);
    };

    t.isCorrect = function() {
      return (t.currentChoice === correctAnswer) ? true : false;
    };

    t.renderTitle = function() {
      var html = '<h3 class="text-primary"><em>' + t.text+ '</em></h3> <br />';
      $('.questions-container').prepend(html);
    };

  };

  Question.prototype = {
    constructor: Question
  };

  var question1 = new Question(
                        'Who am I?', 
                        ['Vyzaldy', 'Andres', 'Prueba'],
                        0
                      );
  var question2 = new Question();
  var questions = [];
  questions.push(question1);
  question1.getChoices();
  question1.renderTitle();
  question1.currentChoice = 1;
  console.log(question1.isCorrect());

});
