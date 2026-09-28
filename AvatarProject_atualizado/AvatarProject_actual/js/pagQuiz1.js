let btn = document.querySelector('.next');

btn.addEventListener('click', salvarQuiz);

function salvarQuiz() {

    let q1 = document.querySelector('input[name="q1"]:checked');
    let q2 = document.querySelector('input[name="q2"]:checked');

    if (!q1 || !q2) {
        alert("Responda todas as questões!");
        return;
    }

    let quiz = {
        q1: q1.value,
        q2: q2.value
    };

    sessionStorage.setItem('quiz', JSON.stringify(quiz));
    window.location.href = './pagQuiz2.html';
}