let btn = document.querySelector('.next');

btn.addEventListener('click', salvarQuiz);

function salvarQuiz() {

    let q7 = document.querySelector('input[name="q7"]:checked');
    let q8 = document.querySelector('input[name="q8"]:checked');

    if (!q7 || !q8) {
        alert("Responda todas as questões!");
        return;
    }

    let quiz = JSON.parse(sessionStorage.getItem('quiz')) || {};

    quiz.q7 = q7.value;
    quiz.q8 = q8.value;

    sessionStorage.setItem('quiz', JSON.stringify(quiz));
    window.location.href = './pagQuiz5.html';
}