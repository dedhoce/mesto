import {Card} from './Card.js';
import PopupWithImage from './PopupWithImage.js';
import { captionPopupZoomImage } from '../utils/constants.js';
import { imagePopupZoomImage } from '../utils/constants.js';

const popupWithImage = new PopupWithImage({
    popupSelector: ".popup_zoom_image", 
    imagePopupZoomImage, 
    captionPopupZoomImage   
})

export default class Section {
    constructor({items, renderer, containerSelector}) {
        this._items = items;
        this._renderer = renderer;
        this._container = document.querySelector(containerSelector);        
    }
    
    render() {
        console.log('renderSection')
        this._container.prepend(this.createCard(this._renderer()))
    }

    createCard(itemsForCard) {               
        itemsForCard.templateSelector = "#elements-item-template";
        const url = itemsForCard.url
        const text = itemsForCard.text
        const card = new Card(itemsForCard, () =>{                         
            popupWithImage.open(url, text)
            popupWithImage.setEventListener()                        
        })
        const cardElement = card.generateCard();
        
        return cardElement
    }

    addItem() {
        const itemsForCard = {};
        this._items.forEach((item) => {
        itemsForCard.text = item.name;
        itemsForCard.url = item.link;  
  
        this._container.append(this.createCard(itemsForCard));
        });
    }
}