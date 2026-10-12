function calcularResultado(quiz) {

    let contagem = { A: 0, B: 0, C: 0, D: 0};

    // pega valores do JSON
    let respostas = Object.values(quiz);

    respostas.forEach(resposta => {
        contagem[resposta]++;
    });

    // primeira resposta (desempate)
    let primeiraResposta = respostas[0];

    let maior = "A";

    if (contagem.B > contagem[maior]) maior = "B";
    if (contagem.C > contagem[maior]) maior = "C";
    if (contagem.D > contagem[maior]) maior = "D";

    // desempate
    if (contagem[maior] === contagem[primeiraResposta]) {
        maior = primeiraResposta;
    }

    return maior;
}