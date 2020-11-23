class CardList {
  constructor (list=[{name:'nome',brand:'brand',bank:'bank',bill:15}], element_target='card-list') {
      this.list = list;
      this.container = element_target;
  }

  updateList () {
      var list_container = document.getElementById(this.container)

      list_container.innerHTML = ''
      
      this.list.forEach(function () {

      })
  }

  newElement (card) {
    return 
      `
        <div>
        </div>
      `
  }
}