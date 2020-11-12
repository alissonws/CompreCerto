class DOMControl {
  constructor () {
    this.listeners = {
      'add_card': {
        'event': 'click',
        'method': this.register
      }
    }
  }

  updateListeners () {
    var this_class = this
    var ids = Object.keys(this.listeners)

    ids.forEach(function (key) {
      document.getElementById(key).addEventListener(this_class.listeners[key].event, this_class.listeners[key].method)
    })
  }

  register () {
  }

  delete () {

  }

  edit () {
      
  }
}