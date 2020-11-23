class Requests {
  constructor () {
    this.endpoints = {
      read: '/read'
    }

  }

  getCards () {
    let body = {
      "userID": "1"
    }

    let endpoint = this.endpoints.read;

    let success_func = function (response) {
      console.log(response)
      cardList = new CardList;
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

}