const programmingQuestions = [
    {
        question: "What does HTML stand for?",
        options: [
            "Hyper Text Markup Language",
            "High Tech Modern Language",
            "Hyper Transfer Markup Language",
            "Home Tool Markup Language"
        ],
        correct: 0
    },
    {
        question: "Which of these is not a JavaScript data type?",
        options: [
            "String",
            "Boolean",
            "Integer",
            "Undefined"
        ],
        correct: 2
    },
    {
        question: "What is the correct way to declare a variable in JavaScript?",
        options: [
            "var name;",
            "variable name;",
            "v name;",
            "var = name;"
        ],
        correct: 0
    },
    {
        question: "Which company developed JavaScript?",
        options: [
            "Microsoft",
            "Netscape",
            "Google",
            "Apple"
        ],
        correct: 1
    },
    {
        question: "Which symbol is used for comments in JavaScript?",
        options: [
            "#",
            "/* */",
            "//",
            "<!-- -->"
        ],
        correct: 2
    },
    {
        question: "Which method is used to parse a JSON string in JavaScript?",
        options: [
            "JSON.parse()",
            "JSON.stringify()",
            "JSON.convert()",
            "JSON.toString()"
        ],
        correct: 0
    },
    {
        question: "Which of the following is a JavaScript framework?",
        options: [
            "Rails",
            "Laravel",
            "Django",
            "React"
        ],
        correct: 3
    },
    {
        question: "Which of the following is used to define a function in JavaScript?",
        options: [
            "function",
            "def",
            "func",
            "define"
        ],
        correct: 0
    },
    {
        question: "Which of the following is not a looping structure in JavaScript?",
        options: [
            "for",
            "while",
            "do-while",
            "foreach"
        ],
        correct: 3
    },
    {
        question: "Which of the following is used to handle exceptions in JavaScript?",
        options: [
            "try-catch",
            "catch-try",
            "error-handling",
            "exception"
        ],
        correct: 0
    }
];

let currentQuestion = 0;
let score = 0;
let timeLeft = 300;
let timer;
let participantData = {};

// Event Listeners
document.getElementById('regForm').addEventListener('submit', function(e) {
    e.preventDefault();
    startQuiz();
});

function startQuiz() {
    // Save participant data
    participantData = {
        name: document.getElementById('fullName').value,
        email: document.getElementById('email').value,
        level: document.getElementById('level').value
    };

    // Update display
    document.getElementById('displayName').textContent = participantData.name;
    document.getElementById('displayLevel').textContent = participantData.level;

    // Switch screens
    document.getElementById('registration').classList.remove('active');
    document.getElementById('quiz').classList.add('active');

    // Start timer and show first question
    startTimer();
    showQuestion();
}

function showQuestion() {
    if (currentQuestion >= programmingQuestions.length) {
        endQuiz();
        return;
    }

    const question = programmingQuestions[currentQuestion];
    document.getElementById('questionText').textContent = question.question;

    const optionsContainer = document.getElementById('options');
    optionsContainer.innerHTML = '';

    question.options.forEach((option, index) => {
        const button = document.createElement('div');
        button.className = 'option';
        button.textContent = option;
        button.onclick = () => checkAnswer(index);
        optionsContainer.appendChild(button);
    });

    updateProgress();
}

function checkAnswer(selectedIndex) {
    const question = programmingQuestions[currentQuestion];
    const options = document.querySelectorAll('.option');

    options.forEach(option => option.style.pointerEvents = 'none');

    if (selectedIndex === question.correct) {
        options[selectedIndex].classList.add('correct');
        score += 10;
        document.querySelector('#score span').textContent = score;
    } else {
        options[selectedIndex].classList.add('wrong');
        options[question.correct].classList.add('correct');
    }

    setTimeout(() => {
        currentQuestion++;
        showQuestion();
    }, 1500);
}

function startTimer() {
    timer = setInterval(() => {
        timeLeft--;
        document.querySelector('#timer span').textContent = timeLeft;
        if (timeLeft <= 0) endQuiz();
    }, 1000);
}

function updateProgress() {
    const progress = (currentQuestion / programmingQuestions.length) * 100;
    document.getElementById('progress').style.width = `${progress}%`;
}

function endQuiz() {
    clearInterval(timer);
    document.getElementById('quiz').classList.remove('active');
    document.getElementById('results').classList.add('active');

    const finalScore = document.getElementById('finalScore');
    finalScore.innerHTML = `
        <h3>Final Score: ${score}</h3>
        <p>Time Taken: ${300 - timeLeft} seconds</p>
    `;

    const breakdown = document.getElementById('scoreBreakdown');
    breakdown.innerHTML = `
        <h3>Quiz Summary</h3>
        <p>Participant: ${participantData.name}</p>
        <p>Level: ${participantData.level}</p>
        <p>Questions Attempted: ${currentQuestion}/${programmingQuestions.length}</p>
        <p>Accuracy: ${((score / (currentQuestion * 10)) * 100).toFixed(2)}%</p>
    `;
}

function restartQuiz() {
    currentQuestion = 0;
    score = 0;
    timeLeft = 300;
    location.reload();
}
