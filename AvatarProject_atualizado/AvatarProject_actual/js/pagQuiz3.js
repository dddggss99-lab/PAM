let btn = document.querySelector('.next');

btn.addEventListener('click', salvarQuiz);

function salvarQuiz() {

    let q5 = document.querySelector('input[name="q5"]:checked');
    let q6 = document.querySelector('input[name="q6"]:checked');

    if (!q5 || !q6) {
        alert("Responda todas as questões!");
        return;
    }

    let quiz = JSON.parse(sessionStorage.getItem('quiz')) || {};

    quiz.q5 = q5.value;
    quiz.q6 = q6.value;

    sessionStorage.setItem('quiz', JSON.stringify(quiz));
    window.location.href = './pagQuiz4.html';
}