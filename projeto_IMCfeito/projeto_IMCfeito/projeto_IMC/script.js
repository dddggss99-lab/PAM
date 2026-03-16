import { calcularIMC, definirClassificacao } from './opc.js'

let trs = document.querySelectorAll('tbody tr')

for (let i = 0; i < trs.length; i++) {
    let td = trs[i].children

    let altura = parseFloat(td[2].textContent)
    let peso = parseFloat(td[3].textContent)

    let tdImc = td[4]
    let imc = calcularIMC(altura,peso)
    tdImc.textContent = imc.toFixed(2)

     
    let tdClass = td[5]
    let classe = definirClassificacao(imc,tdClass)

}