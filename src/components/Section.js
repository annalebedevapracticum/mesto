export default class Section {
    constructor({ renderer }, containerSelector) {
      this._renderer = renderer;
      this._container = document.querySelector(containerSelector);
    }
  
    setItem(element) {
      this._container.append(element);
    }
    
    addToStart(element) {
      this._container.prepend(element);
    }
  
    clear() {
      this._container.innerHTML = '';
    }
  
    renderItems(itemsForRender) {
      this.clear();
  
      itemsForRender.forEach(item => {
        this._renderer(item);
      });
    }
  }
  