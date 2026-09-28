let btn = document.querySelector('.next');

btn.addEventListener('click', salvarQuiz);

async function salvarQuiz() {

    let quiz = JSON.parse(sessionStorage.getItem('quiz')) || {};

    let q9 = document.querySelector('input[name="q9"]:checked');
    let q10 = document.querySelector('input[name="q10"]:checked');

    if (!q9 || !q10) {
        alert("Responda todas as questões!");
        return;
    }

    quiz.q9 = q9.value;
    quiz.q10 = q10.value;

    sessionStorage.setItem('quiz', JSON.stringify(quiz));

    // calcula o resultado
    let resultado = calcularResultado(quiz);

    // pega os dados da pessoa
    let pessoa = JSON.parse(sessionStorage.getItem('pessoa'));

    // cria o objeto do resultado
    let resultadoFinal = {
        elemento: ""
    };

    // define o resultado
    if (resultado === "A") {
        resultadoFinal.elemento = "Terra";
    }

    else if (resultado === "B") {
        resultadoFinal.elemento = "Água";
    }

    else if (resultado === "C") {
        resultadoFinal.elemento = "Ar";
    }

    else {
        resultadoFinal.elemento = "Fogo";
    }

    // enviardados para aAPI
    try {

        await fetch('http://localhost:3000/resultado', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },

            body: JSON.stringify({
                nome: pessoa.nome,
                email: pessoa.email,
                data_nascimento: pessoa.date,
                sexo: pessoa.sexo,
                resultado: resultadoFinal.elemento
            })
        });

    } catch (erro) {

        console.log("Erro ao enviar resultado:", erro);

    }
    // salva o resultado 
    sessionStorage.setItem(
        "resultado",
        JSON.stringify(resultadoFinal)
    );
    // vai para a página
    if (resultado === "A") {
        location.href = "./finalQuiz3.html";
    }

    else if (resultado === "B") {
        location.href = "./finalQuiz1.html";
    }

    else if (resultado === "C") {
        location.href = "./finalQuiz4.html";
    }

    else {
        location.href = "./finalQuiz2.html";
    }
}

