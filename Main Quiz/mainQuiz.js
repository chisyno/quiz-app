document.addEventListener("DOMContentLoaded", () => {
    const userName = localStorage.getItem('userName') || 'Guest';
    const welcomeElement = document.querySelector('.welcomeinfo h1');
    welcomeElement.textContent = `Welcome, ${userName}`;

    const questions = [
        {
            question: "1: What is the purpose of HTML?",
            answers: [
                "To style web pages",
                "To add interactivity to web pages",
                "To structure content on web pages",
                "To animate elements on web pages"
            ],
            correctAnswer: "To structure content on web pages"
        },
        {
            question: "2: Which attribute is used to define the source of an image in HTML?",
            answers: ["href", "src", "alt", "title"],
            correctAnswer: "src"
        },
        {
            question: "3: What does CSS stand for?",
            answers: [
                "Cascading System Sheets",
                "Creative Style Sheets",
                "Cascading Style Sheets",
                "Creative System Sheets"
            ],
            correctAnswer: "Cascading Style Sheets"
        },
        {
            question: "4: Which of the following is NOT a valid CSS selector?",
            answers: ["#example", ".example", "`example", "p.example"],
            correctAnswer: "`example"
        },
        {
            question: "5: Which property is used to change the background color of an element in CSS?",
            answers: ["color", "font-size", "background-color", "border-color"],
            correctAnswer: "background-color"
        },
        {
            question: "6: What is the purpose of the script tag in HTML?",
            answers: [
                "To create links to external stylesheets",
                "To add JavaScript code to a web page",
                "To create tables on a web page",
                "To add images to a web page"
            ],
            correctAnswer: "To add JavaScript code to a web page"
        },
        {
            question: "7: What is the purpose of the console.log() method in JavaScript?",
            answers: [
                "To display a message on the web page",
                "To create a pop-up window",
                "To send data to the server",
                "To display a message in the browser console"
            ],
            correctAnswer: "To display a message in the browser console"
        }
    ];

    let currentQuestionIndex = 0;
    let selectedAnswers = [];
    let countdown;
    const totalTime = 120;
    let timeLeft = totalTime;

    const questionElement = document.querySelector(".question");
    const answersElement = document.querySelector(".answers");
    const prevButton = document.getElementById("prev");
    const nextButton = document.getElementById("next");
    const submitButton = document.getElementById("submit");
    const logoutButton = document.getElementById("logout");
    const resultElement = document.querySelector(".result");
    const timerElement = document.querySelector(".timer");
    const finishMessage = document.querySelector(".finish");

    // Arrays to store correctly and incorrectly answered questions
    let correctAnswers = [];
    let incorrectAnswers = [];

    function loadQuestion() {
        const question = questions[currentQuestionIndex];
        questionElement.textContent = question.question;
        answersElement.innerHTML = question.answers
            .map(answer => `<h1><input type="radio" name="answer" value="${answer}" aria-label="${answer}"> ${answer}</h1>`)
            .join("");
    }

    function handleAnswerSelection() {
        const selectedRadio = document.querySelector('input[name="answer"]:checked');
        if (selectedRadio) {
            selectedAnswers[currentQuestionIndex] = selectedRadio.value;
        }
    }

    function handlePrevQuestion() {
        handleAnswerSelection();
        if (currentQuestionIndex > 0) {
            currentQuestionIndex--;
            loadQuestion();
        }
    }

    function handleNextQuestion() {
        handleAnswerSelection();
        if (currentQuestionIndex < questions.length - 1) {
            currentQuestionIndex++;
            loadQuestion();
        }
    }

    function handleSubmit(isTimeUp = false) {
        handleAnswerSelection();

        // Reset arrays for each submission
        correctAnswers = [];
        incorrectAnswers = [];

        // Populate the arrays based on the selected answers
        selectedAnswers.forEach((answer, index) => {
            if (answer === questions[index].correctAnswer) {
                correctAnswers.push(questions[index]);
            } else {
                incorrectAnswers.push(questions[index]);
            }
        });

        // Existing code for handling time up and submission
        if (isTimeUp) {
            const allAnswered = selectedAnswers.length === questions.length;
            if (allAnswered) {
                finishMessage.innerHTML = `<div class="finalresults"><h1>Time is up! You have answered all questions. Click Submit to see your results.</h1></div>`;
            } else {
                finishMessage.innerHTML = `<div class="finalresults"><h1>Time Up! You didn't finish the questions. Click Submit.</h1></div>`;
            }
            resultElement.style.display = "none"; 
            document.querySelector('.submit-container').style.display = "block"; 
        } else {
            finishMessage.innerHTML = `<div class="finalresult"><h1>YOU HAVE SUCCESSFULLY SUBMITTED!!</h1></div>`;
            resultElement.style.display = "block"; 
            document.querySelector('.submit-container').style.display = "none"; 

            // Show the Show Result button
            document.getElementById("show-result").style.display = "block";
        }
        finishMessage.style.display = "block";

        timerElement.innerHTML = isTimeUp 
            ? '<span class="time-up-message">Your time is up!</span>' 
            : '<span class="Submitted">Submitted</span>';

        clearInterval(countdown);

        let score = selectedAnswers.reduce((acc, answer, index) => {
            return acc + (answer === questions[index].correctAnswer ? 1 : 0);
        }, 0);

        questionElement.style.display = "none";
        answersElement.style.display = "none";
        prevButton.style.display = "none";
        nextButton.style.display = "none";
        document.querySelector('.submit-container').style.display = "none"; 

        if (!isTimeUp) {
            resultElement.style.display = "block"; 
            const stat = document.querySelector(".stat");
            stat.innerHTML = `
                <h1 id="fail">Failed: ${questions.length - score}</h1>
                <h1 id="pass">Passed: ${score}</h1>
                <h1 id="total">Total: ${score} / ${questions.length}</h1>
            `;
        }
    }

    function handleLogout() {
        localStorage.removeItem('userName');
        window.location.href = '/index.html';
    }

    function startCountdown() {
        countdown = setInterval(() => {
            timeLeft--;
            timerElement.textContent = `${timeLeft}`;
            if (timeLeft <= 0) {
                clearInterval(countdown);
                document.querySelectorAll('input[name="answer"]').forEach(input => {
                    input.disabled = true; 
                });
                handleSubmit(true); 
                document.querySelector('.submit-container').style.display = "block"; 
            }
        }, 1000);
    }

    prevButton.addEventListener("click", handlePrevQuestion);
    nextButton.addEventListener("click", handleNextQuestion);
    submitButton.addEventListener("click", () => handleSubmit(false)); 
    logoutButton.addEventListener("click", handleLogout);

    // Show Result button click event
    document.getElementById("show-result").addEventListener("click", () => {
        resultElement.innerHTML = `
            <h2>Correctly Answered Questions:</h2>
            <ul>
                ${correctAnswers.map(q => `<li>${q.question} - Correct Answer: ${q.correctAnswer}</li>`).join('')}
            </ul>
            <h2>Incorrectly Answered Questions:</h2>
            <ul>
                ${incorrectAnswers.map(q => `<li>${q.question} - Your Answer: ${selectedAnswers[questions.indexOf(q)] || 'No answer'} - Correct Answer: ${q.correctAnswer}</li>`).join('')}
            </ul>
        `;
        
        resultElement.style.display = "block"; 
    });

    loadQuestion();
    startCountdown();
});
