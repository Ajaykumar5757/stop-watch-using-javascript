const correctAnswers = {
    'ques1': 'one-op2', 
    'ques2': 'two-op4',
    'ques3': 'three-op1', 
    'ques4': 'four-op4', 
    'ques5': 'five-op2', 
    'ques6': 'six-op1', 
    'ques7': 'seven-op3', 
    'ques8': 'eight-op1', 
    'ques9': 'nine-op3', 
    'ques10': 'ten-op2',
};

let timer;
let timeLeft = 60;
let quizSubmitted = false;  // Prevents auto-checking after timer ends

// Function to check answers
function checkQuiz() {
    if (quizSubmitted) return;
    quizSubmitted = true;

    let score = 0;
    let allAnswered = true;

    Object.keys(correctAnswers).forEach(ques => {
        const selected = document.querySelector(`input[name="${ques}"]:checked`);
        const correct = correctAnswers[ques];
        const resultElement = document.getElementById(`result-${ques}`);

        if (!selected) {
            allAnswered = false;
            resultElement.innerHTML = "⚠️ Please select an option!";
            resultElement.style.color = "orange";
            return;
        }

        if (selected.id === correct) {
            resultElement.innerHTML = "✅ Correct!";
            resultElement.style.color = "green";
            score++;
        } else {
            let correctText = "Unknown";
            const correctInput = document.getElementById(correct);
            if (correctInput) {
                const correctLabel = document.querySelector(`label[for="${correct}"]`);
                correctText = correctLabel ? correctLabel.textContent.trim() : "Unknown";
            }
            resultElement.innerHTML = `❌ Wrong! Correct: <strong>${correctText}</strong>`;
            resultElement.style.color = "red";
        }
    });

    document.getElementById("quiz-score").innerText = `${score}/10`;

    // Save high score in local storage
    let highScore = localStorage.getItem("highScore") || 0;
    if (score > highScore) {
        localStorage.setItem("highScore", score);
        document.getElementById("high-score").innerText = `High Score: ${score}/10 🎉`;
    }
}

// Function to reset the quiz
function resetQuiz() {
    quizSubmitted = false; // Allows re-submission
    document.querySelectorAll('input[type="radio"]').forEach(answer => answer.checked = false);
    document.querySelectorAll('.result').forEach(result => {
        result.innerHTML = '';
        result.style.color = "";
    });
    document.getElementById("quiz-score").innerText = "0";
    timeLeft = 60;
    document.getElementById("timer").innerText = timeLeft;

    clearInterval(timer);
    startTimer();
}

// Timer Function
function startTimer() {
    clearInterval(timer);
    timer = setInterval(() => {
        if (timeLeft > 0) {
            timeLeft--;
            document.getElementById("timer").innerText = timeLeft;
        } else {
            clearInterval(timer);
            alert("⏳ Time's up! Submitting your answers...");
            checkQuiz();  // Automatically submit when time runs out
        }
    }, 1000);
}

function toggleDarkMode() {
    document.body.classList.toggle("dark-mode");
    localStorage.setItem("darkMode", document.body.classList.contains("dark-mode"));
}

// Load Dark Mode preference on page load
if (localStorage.getItem("darkMode") === "true") {
    document.body.classList.add("dark-mode");
}

// Start the timer when the page loads
startTimer();
