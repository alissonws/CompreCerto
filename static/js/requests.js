class Requests {
  constructor () {
    this.endpoints = {
      read: '/read',
      signup: '/api/signup',
      login: '/api/login',
      addCard: '/api/addCard',
      getCards: '/api/getCards',
      deleteCard: '/api/deleteCard'
    }
  }

  addCard (user_id, name, flag, bank, bill) {
    let body = {
      'user_id': user_id,
      'card_name': name,
      'card_flag': flag,
      'card_bank': bank,
      'card_bill': bill
    }

    let endpoint = window.location.origin+this.endpoints.addCard;

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

  getCards (user_id) {
    let body = {
      'user_id': user_id.toString()
    }

    let endpoint = window.location.origin+this.endpoints.getCards;

    let onSuccess = function (response) {
      let controlDOM = new DOMControl();
      controlDOM.updateCards(response.cards)
    }

    let onError = function (response){
      alert(response.message)
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

  deleteCard (user_id, card_id) {
    let body = {
      'user_id': user_id.toString(),
      'card_id': card_id.toString()
    }

    let endpoint = window.location.origin+this.endpoints.deleteCard;

    let onSuccess = function (response) {
      let controlDOM = new DOMControl();
      controlDOM.getCards()
    }

    let onError = function (response){
      alert(response.message)
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
      alert(response.message)
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