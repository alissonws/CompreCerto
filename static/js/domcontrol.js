class DOMControl {
  // Classe responsável por adicionar event listeners e processar inputs
  constructor () {
    var this_class = this;

    const listeners = {
      'add_card': {
          'event': 'click',
          'method': this.register
      },
      'login-btn': {
        'event': 'click',
        'method': this.login
      },
      'signup-btn': {
        'event': 'click',
        'method': this.signup
      },
      'signup-redirect-btn': {
        'event': 'click',
        'method': function () {return this_class.redirectTo('/signup')}
      },
      'login-redirect-btn': {
        'event': 'click',
        'method': function () {return this_class.redirectTo('/login')}
      }
    };
  
    // Objeto que armazena as funções de cada botão
    this.listeners = listeners;
  }

  // Função que realiza o bind de cada botão com sua função
  updateListeners () {
    // Referência da própria classe
    var this_class = this
    // Lista de elementos
    var ids = Object.keys(this.listeners)

    // Iterando pela lista de elementos e fazendo adicionando o event listener da sua respectiva função
    ids.forEach(function (key) {
      var element = document.getElementById(key);

      if (element) {
        let event = this_class.listeners[key].event;
        let method = this_class.listeners[key].method;
  
        element.addEventListener(event, method)
      }

    })
  }

  redirectTo (url) {
    window.location.href = url
  }

  login () {
    var email, password

    email = document.getElementById('login-field').value;

    password = document.getElementById('password-field').value;


    if (email.length == 0 || password.length == 0) {
      return alert('Preencha todos os dados');
    }

    // Validando a senha
    if (password < 6) {
      // Alertar o usuário
      return alert('A senha informata tem menos que 6 caracteres');
    }

    // Se o código chegou até aqui, a senha é uma senha válida (ou as regras de senhas estão erradas)
    // Validando e-mail
    const re = /\S+@\S+\.\S+/; // Usando uma expressão regular pra validar o e-mail de forma simples
    if (!re.test(email)) {
      return alert('O e-mail informado é inválido');
    }

    // Tudo certo até aqui, prosseguindo com o registro

    let new_request = new Requests();
    new_request.login(email, password);

  }

  signup () {
    var name, email, password1, password2;

    name = document.getElementById('name-field').value;

    email = document.getElementById('email-field').value;

    password1 = document.getElementById('password1-field').value;

    password2 = document.getElementById('password2-field').value;

    if (name.length == 0 || email.length == 0 || password1 == 0 || password2 == 0) {
      return alert('Preencha todos os dados');
    }

    // Validando a senha
    // Se: senha1 diferente de senha2
    if (password1 != password2) {
      // Alertar o usuário
      return alert('As duas senhas informadas não são iguais');
    // Caso forem iguais, se: senha 1 for menor que 6
    } else if (password1 < 6) {
      // Alertar o usuário
      return alert('A senha informata tem menos que 6 caracteres');
    }

    // Se o código chegou até aqui, a senha é uma senha válida (ou as regras de senhas estão erradas)
    // Validando e-mail
    const re = /\S+@\S+\.\S+/; // Usando uma expressão regular pra validar o e-mail de forma simples
    if (!re.test(email)) {
      return alert('O e-mail informado é inválido');
    }

    // Tudo certo até aqui, prosseguindo com o registro

    let new_request = new Requests();
    new_request.signup(email, name, password1);
  }

  register () {
    $('#new-card').modal();
  }

  delete () {

  }

  edit () {
    $('#new-card').on('show.bs.modal', function (event) {
      var button = $(event.relatedTarget) // Button that triggered the modal
      var recipient = button.data('whatever') // Extract info from data-* attributes
      // If necessary, you could initiate an AJAX request here (and then do the updating in a callback).
      // Update the modal's content. We'll use jQuery here, but you could use a data binding library or other methods instead.
      var modal = $(this)

      modal.find('.modal-body input').val(recipient)
    })
  }
}