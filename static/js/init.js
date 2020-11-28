

const card_list = [
    ['nome', 'marca', 'banco', 'vencimento']
]

document.addEventListener('DOMContentLoaded', function () {
    // Fazendo bind dos botões
    let controlDOM = new DOMControl();
    controlDOM.updateListeners()

    let cardList = new CardList(card_list);
    cardList.updateList()
})