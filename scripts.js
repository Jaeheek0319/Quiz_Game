var start = document.querySelector("#start")
var questionElements = document.querySelector(".question-elements")
var startElement = document.querySelector(".start-element")
var endElement = document.querySelector(".end-elements")
var username;
var questions = [
    {
        title: "What is my favorite color?",
        choices: ["Red", "Orange", "Yellow", "Green"],
        answer: "Red"
    }, {
        title: "What phone do I own?",
        choices: ["Iphone", "LG", "Samsung", "Pixel"],
        answer: "LG"
    }, {
        title: "What is my hardest class currently?",
        choices: ["Engineering", "Stats", "Humanities", "Calculus"],
        answer: "Calculus"
    }, {
        title: "What is my favorite sport?",
        choices: ["Football", "Soccer", "Basketball", "Waterpolo"],
        answer: "Basketball"
    }, {
        title: "What is my favorite food?",
        choices: ["Ice Cream", "Burritos", "Ramen", "Pizza"],
        answer: "Burritos"
    }
]

var timer;
var time;
var qIndex;
var score;

start.addEventListener("click", () => {
    qIndex = 0;
    time = 75;
    score = 0
    document.querySelector("#score").textContent = score
    questionElements.classList.remove("hide");
    startElement.classList.add("hide");
    showQuestion();
    timer = setInterval(function () {
        time--;
        document.querySelector("#time").textContent = time;
        if (time <= 0) {
            endQuiz();
        }
    }, 1000);
    username = document.querySelector("#username").value;
    endElement.classList.add("hide");
});



var showQuestion = function () {
    //get target question
    var cq = questions[qIndex];
    //create tempalte literal
    var template = `
        <div class="question-container">
            <h3>${cq.title}</h3>
            <button class="answer">${cq.choices[0]}</button>
            <button class="answer">${cq.choices[1]}</button>
            <button class="answer">${cq.choices[2]}</button>
            <button class="answer">${cq.choices[3]}</button>
        </div>
    `;
    //add the template to the page
    questionElements.innerHTML = template;


    var allAnswers = document.querySelectorAll(".answer");
    allAnswers.forEach(function (answer) {
        answer.addEventListener("click", (event) => {
            //is it correct
            if (event.target.textContent === questions[qIndex].answer) {
                score++;
                document.querySelector("#score").textContent = score;
            } else {
                time -= 5;
            }
            //show next question
            qIndex++;
            if (qIndex === questions.length) {
                endQuiz();
            } else {
                showQuestion();
            }

        });
    });
}

var endQuiz = function() {
    questionElements.classList.add("hide");
    endElement.classList.remove("hide");

    clearInterval(timer);
}

var handleSaveBtnClick = function (event) {
    var highscore = JSON.parse(localStorage.getItem("highscore")) || [];
    
    var scoreSheet = {
        score: score,
        username: username
    };

    
    highscore.push(scoreSheet)
    
    highscore.sort((a, b) => b.score - a.score);
    
    highscore.splice(5);
    
    localStorage.setItem("highscore", JSON.stringify(highscore));


    var template = '';
    highscore.forEach((hscore) => {
        template += `<li>name: ${hscore.username} score: ${hscore.score}</li>` 
    });
    
    document.querySelector(".end-elements").innerHTML = `<ul>${template}</ul>`;
    
    startElement.classList.remove("hide");
}

document.querySelector("#saveScore").addEventListener("click", handleSaveBtnClick);