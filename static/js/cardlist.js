class CardList {
  constructor (list) {
    const list_container = 'card-list';
    this.list = list;
    this.listContainer = list_container;
  }

  updateList () {
    var this_class = this;
    var list_container = document.getElementById(this.listContainer);
    var new_list = '';
    var final_table = ''

    if (!list_container) {
      return;
    }

    list_container.innerHTML = '';
    
    this_class.list.forEach(function (data) {
      new_list += this_class.newElement(data)
    });

    final_table = `
      <table>
          <thead class="col col-12">
              <th scope="col"><button type='button' id="add_card" ><i class="fas fa-plus"></i></button></th>
              <th scope="col"><p>Nome</p></th>
              <th scope="col"><p>Bandeira</p></th>
              <th scope="col"><p>Banco</p></th>
              <th scope="col"><p>Vencimento</p></th>
          </thead>
          <tbody class='col col-12' id='card-list'>
            ${new_list}
          </tbody>
      </table>
    `

    list_container.innerHTML = new_list;

    return list_container;
  }

  bestCardToBuy () {
    let today_date = new Date();
    let day = parseInt(String(today_date.getDate()).padStart(2, '0'), 10);


    var best_to_buy = this.list[0];

    this.list.forEach(function (card) {
      
      var best_day = card[4] - 7 + day;

      if (best_day >= day) {
          best_to_buy = card
      }
    })

    return best_to_buy
  }

  newElement (data) {
    var card_id = data[0];
    var card_name = data[1];
    var card_flag = data[2];
    var card_bank = data[3];
    var card_bill = data[4];

    return (
      `
      <tr class='card-item'>
        <th scope="row">
            <button type='button' value='${card_id}' data-name='${card_name}' data-brand='${card_flag}' data-bank='${card_bank}' data-bill='${card_bill}' class='edit-card-btn'><i class="fas fa-edit"></i></button>
            <button type='button' value='${data[0]}' class='delete-card-btn'><i class="fas fa-trash"></i></button>
        </th>
        <td><p>${data[1]}</p></td>
        <td><p>${data[2]}</p></td>
        <td><p>${data[3]}</p></td>
        <td><p>${data[4]}</p></td>
      </tr>
      `
    )
  }
}