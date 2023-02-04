// Initial Data
let currentQuestion = 0;
let correctAnswers = 0;

showQuestion();

// Events
document.querySelector('.scoreArea button').addEventListener('click', reset);

//Functions
function showQuestion() {
    if(questions[currentQuestion]) {
        let q = questions[currentQuestion];

        let pct = Math.floor((currentQuestion / questions.length) * 100);

        if(pct > 0) { 
            let saturn = document.querySelector('.astro');
            let speakBox = document.querySelector('.astro .bubble');

            speakBox.innerHTML = 'Boa sorte!'

            saturn.style.opacity = '0%';
            saturn.style.rotate = '10deg';
        }

        document.querySelector('.progress--bar').style.width = `${pct}%`

        document.querySelector('.scoreArea').style.display = 'none'
        document.querySelector('.questionArea').style.display = 'block'

        document.querySelector('.question').innerHTML = q.question;

        let optionsHtml = '';
        for(let i in q.options) {
            optionsHtml += `<div data-op="${i}" class="option"><span>${parseInt(i) + 1}</span> ${q.options[i]}</div>`;
        }

        document.querySelector('.options').innerHTML = optionsHtml;

        document.querySelectorAll('.options .option').forEach(item => {
            item.addEventListener('click', optionClickEvent);
        })
    }
    else {
        finishQuiz();
    }
}

function optionClickEvent(e) {
    let clickedOption = parseInt(e.target.getAttribute('data-op'));

    if(questions[currentQuestion].answer === clickedOption) {
        correctAnswers++;
    }

    currentQuestion++;
    showQuestion();
}

function finishQuiz() {
    let points = Math.floor((correctAnswers / questions.length) * 100);

    if(points < 30) {
        document.querySelector('.scoreText1').innerHTML = 'Não foi dessa vez!';
        document.querySelector('.scorePct').style.color = '#ff6150';
    }
    else if(points >= 30 && points < 70) {
        document.querySelector('.scoreText1').innerHTML = 'Está quase lá!';
        document.querySelector('.scorePct').style.color = '#f8aa4b';
    }
    else {
        document.querySelector('.scoreText1').innerHTML = 'Muito bem!';
        document.querySelector('.scorePct').style.color = '#54d2d2';
    }

    document.querySelector('.scorePct').innerHTML = `Acertou ${points}%`;
    document.querySelector('.scoreText2').innerHTML = `Você respondeu ${currentQuestion} questões e acertou ${correctAnswers}.`;

    document.querySelector('.scoreArea').style.display = 'block';
    document.querySelector('.questionArea').style.display = 'none';
    document.querySelector('.progress--bar').style.width = `100%`
}

function reset() {
    correctAnswers = 0;
    currentQuestion = 0;
    document.querySelector('.bubble').innerHTML = 'Olá, vamos tentar de novo?'
    document.querySelector('.astro').style.opacity = '100%'
    showQuestion();
}