
let btn = document.querySelector('#btnCadastrar')

btn.addEventListener('click', pegarDados)



function pegarDados(){
    let form = document.querySelector('form')

    let pessoa = {
        nome: form.nome.value,
        email: form.email.value,
        date: form.date.value,
        sexo: form.sexo.value,
    }

    if (!form.nome.value||!form.email.value||!form.date.value||!form.sexo.value) {
        alert("Responda todos os campos!");
        return;
    }
    
    sessionStorage.pessoa = JSON.stringify(pessoa)
    window.location.href = '../html/pagQuiz1.html';
}