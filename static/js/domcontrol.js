class DOMControl {
  // Classe responsável por adicionar event listeners e processar inputs
  constructor () {
    // Objeto que armazena as funções de cada botão
    this.listeners = {
      'add_card': {
        'event': 'click',
        'method': this.register
      }
    }
  }

  // Função que realiza o bind de cada botão com sua função
  updateListeners () {
    // Referência da própria classe
    var this_class = this
    // Lista de elementos
    var ids = Object.keys(this.listeners)

    // Iterando pela lista de elementos e fazendo adicionando o event listener da sua respectiva função
    ids.forEach(function (key) {
      let event = this_class.listeners[key].event;
      let method = this_class.listeners[key].method;

      document.getElementById(key).addEventListener(event, method)
    })
  }

  register () {
  }

  delete () {

  }

  edit () {
      
  }
}