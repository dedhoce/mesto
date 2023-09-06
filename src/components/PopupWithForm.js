import Popup from "../components/Popup.js"

export default class PopupWithForm extends Popup {
    constructor({popupSelector, submit}) {
        super({popupSelector});
        this._submit = submit;
        this._form = this._popup.querySelector('.popup__form-input');
        this._inputList = this._form.querySelectorAll('.popup__text')                        
    }

    _getInputValues() {
        this._inputList.forEach(input => {
        input.name = "";        
        this._form[input.name] = input.value;
        });
        return this._form;
    }

    setInputValues(data) {
        this._inputList[0].value = data.name;
        this._inputList[1].value = data.aboutMyself;
    } 

    setEventListener() {                
        this._form.addEventListener("submit", this._form.addEventListener('submit', (evt) => {
            evt.preventDefault();
            this._submit(this._getInputValues());
            this.close();
            }));        
        super.setEventListener();
        
    }

    close() {                
        this._form.reset()
        super.close();                
    }
}