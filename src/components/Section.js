export default class Section {
    constructor({items, renderer, containerSelector}) {
        this._items = items;
        this._renderer = renderer;
        this._container = document.querySelector(containerSelector);        
    }
    
    render() { 
        const itemsForCard = {};
        itemsForCard.templateSelector = "#elements-item-template";
        this._items.forEach((item) => {
            itemsForCard.text = item.name;
            itemsForCard.url = item.link;
            console.log(this._renderer(itemsForCard))
        })        
    }    

    addItem() {
                         
        //this._container.prepend();
        this._container.append(this.render());
    }
}
