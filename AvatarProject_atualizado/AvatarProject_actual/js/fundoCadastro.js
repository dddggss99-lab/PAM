let fundo = document.querySelector(".fundo");

let pos = 0;

function animar(){

    pos -= 1;

    fundo.style.backgroundPositionX = pos + "px";

    requestAnimationFrame(animar);

}

animar();