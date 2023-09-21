export default class Section {
    constructor({renderer, containerSelector}) {        
        this._renderer = renderer;
        this._container = document.querySelector(containerSelector);
        this._object = true        
    }     

    addItem(flag, data) {                                                      
        if(flag) {                                              
            this._container.append(this._renderer(data))
        } else if(!flag) {
            this._container.prepend(this._renderer(data))
        }
    }
}
