class Requests {
  constructor () {
    this.endpoints = {
      read: '/read',
      signup: '/api/signup',
      login: '/api/login'
    }
  }

  getCards () {
    let body = {
      "user_id": "1"
    }

    let endpoint = this.endpoints.read;

    let success_func = function (response) {
      cardList = new DOMControl({cardList: response});
      cardList.updateList();
    }

    $.ajax({
      url: endpoint,
      contentType: "application/json",
      data: JSON.stringify(body),
      type: 'POST',
      success: success_func,
      error: function (){
          alert("Erro carregar cartões")},
  });
  }

  signup (email, name, password) {
    let body = {
      'email': email,
      'name': name,
      'password': password
    }

    let endpoint = window.location.origin+this.endpoints.signup;

    let onSuccess = function (response) {
      let user_id = response.user_id;

      window.location.href = `/dashboard/${user_id}`;
    }

    let onError = function (response){
      let data = response.responseJSON
      alert(data.message)
    }

    $.ajax({
      url: endpoint,
      contentType: "application/json",
      dataType: 'json',
      data: JSON.stringify(body),
      type: 'POST',
      success: onSuccess,
      error: onError
    });
  }

  login (email, password) {
    let body = {
      'email': email,
      'password': password
    }

    let endpoint = window.location.origin+this.endpoints.login;

    let onSuccess = function (response) {

      let user_id = response.user_id;

      window.location.href = `/dashboard/${user_id}`;
    }

    let onError = function (response){
      let data = response.responseJSON
      alert(data.message)
    }

    $.ajax({
      url: endpoint,
      contentType: "application/json",
      dataType: 'json',
      data: JSON.stringify(body),
      type: 'POST',
      success: onSuccess,
      error: onError
    });
  }
}