export function calcularIMC(altura,peso){
    let imc = peso/(altura*altura)
    return imc
}

export function definirClassificacao(imc, tdClass){

    if(imc < 18.5){
        tdClass.textContent = "Abaixo do peso"
    } else if(imc < 25){
        tdClass.textContent = "Peso normal"
    } else if(imc < 30){
        tdClass.textContent = "Sobrepeso"
    } else if(imc < 35){
        tdClass.textContent = "Obesidade Grau I"
    } else if(imc < 40){
        tdClass.textContent = "Obesidade Grau II"
    } else{
        tdClass.textContent = "Obesidade Grau III (Mórbida)"
    }
}