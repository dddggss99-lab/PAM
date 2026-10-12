let btn = document.querySelector('.next');

btn.addEventListener('click', salvarQuiz);

function salvarQuiz() {

    let q3 = document.querySelector('input[name="q3"]:checked');
    let q4 = document.querySelector('input[name="q4"]:checked');

    if (!q3 || !q4) {
        alert("Responda todas as questões!");
        return;
    }

    let quiz = JSON.parse(sessionStorage.getItem('quiz')) || {};

    quiz.q3 = q3.value;
    quiz.q4 = q4.value;

    sessionStorage.setItem('quiz', JSON.stringify(quiz));
    window.location.href = './pagQuiz3.html';
}
