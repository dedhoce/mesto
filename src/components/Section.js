export default class Section {
    constructor({items, renderer, containerSelector}) {
        this._items = items;
        this._renderer = renderer;
        this._container = document.querySelector(containerSelector);
        this._object = true        
    }
    
    render() { 
        const itemsForCard = {};
        itemsForCard.templateSelector = "#elements-item-template";
        this._items.forEach((item) => {
            itemsForCard.text = item.name;
            itemsForCard.url = item.link;
            const object = true                                   
            this.addItem(object, this._renderer(itemsForCard))           
        })                
    }    

    addItem(object, data) {                                                      
        if(object) {                                  
            this._container.append(data)
        } else if(!object) {
            this._container.prepend(this._renderer(data))
        }
    }
}
