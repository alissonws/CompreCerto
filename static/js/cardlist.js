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

  newElement (data) {
    return (
      `
      <tr class='card-item'>
        <th scope="row">
            <button type='button' class='edit-card-btn'><i class="fas fa-edit"></i></button>
            <button type='button' class='delete-card-btn'><i class="fas fa-trash"></i></button>
        </th>
        <td><p>${data[0]}</p></td>
        <td><p>${data[1]}</p></td>
        <td><p>${data[2]}</p></td>
        <td><p>${data[3]}</p></td>
      </tr>
      `
    )
  }
}