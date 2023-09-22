export default class Section {
    constructor({renderer, containerSelector}) {        
        this._renderer = renderer;
        this._container = document.querySelector(containerSelector);                
    }    

    appendItem(data) {
        this._container.append(this._renderer(data));
    }
    
    prependItem(data) {
        this._container.prepend(this._renderer(data));
    } 
}
