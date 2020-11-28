document.addEventListener('DOMContentLoaded', function () {
    // Fazendo bind dos botões
    let controlDOM = new DOMControl();
    controlDOM.updateListeners()

    controlDOM.getCards()
})