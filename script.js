// Initial data
let currentQuestion = 0;
let correctAnswer = 0;

showQuestion();

// Events
document.querySelector('.scoreArea button').addEventListener('click', resetEvent);

// Functions
function showQuestion() {
    if (questions[currentQuestion]) {
        let q = questions[currentQuestion];

        let pct = Math.floor((currentQuestion / questions.length) * 100);
        document.querySelector('.progress--bar').style.width = `${pct}%`;

        document.querySelector('.scoreArea').style.display = 'none';
        document.querySelector('.questionArea').style.display = 'block';

        document.querySelector('.question').innerHTML = q.question;

        let optionsHtml = '';
        for (let i in q.options) {
            optionsHtml += `<div data-op="${i}" class="option"><span>${parseInt(i) + 1}</span> ${q.options[i]}</div>`;
        }
        document.querySelector('.options').innerHTML = optionsHtml;

        document.querySelectorAll('.options .option').forEach(item => {
            item.addEventListener('click', optionClickEvent);
        })
    } else {
        finishQuiz();
    }
};

function optionClickEvent(e) {
    let clickedOption = parseInt(e.target.getAttribute('data-op'));

    if (questions[currentQuestion].answer === clickedOption) {
        correctAnswer++;
    }

    currentQuestion++;
    showQuestion();
}

function finishQuiz() {
    let points = Math.floor((correctAnswer / questions.length) * 100);

    document.querySelector('.scoreArea').style.display = 'block';
    document.querySelector('.questionArea').style.display = 'none';
    document.querySelector('.progress--bar').style.width = '100%';

    if (points > 0 && points < 30) {
        document.querySelector('.scoreText1').innerHTML = 'Você não foi bem!';
        document.querySelector('.scorePct').style.color = '#FF0000';
    } else if (points >= 30 && points < 70) {
        document.querySelector('.scoreText1').innerHTML = 'Sei que você pode fazer melhor!';
        document.querySelector('.scorePct').style.color = '#FFFF00';
    } else if (points >= 70) {
        document.querySelector('.scoreText1').innerHTML = 'Parabéns!';
        document.querySelector('.scorePct').style.color = '#0d630d';
    } else {
        document.querySelector('.scoreText1').innerHTML = 'Horrível!';
        document.querySelector('.scorePct').style.color = '#000';
    }

    document.querySelector('.scorePct').innerHTML = `Acertou ${points}%`;
    document.querySelector('.scoreText2').innerHTML = `Você respondeu ${questions.length} questões e acertou ${correctAnswer}`;
}

function resetEvent() {
    correctAnswer = 0;
    currentQuestion = 0;
    showQuestion();
}