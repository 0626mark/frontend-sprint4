export class Popup {
    constructor(popupElement) {
        this.popupElement = popupElement; 
        this._handleEscClose = this._handleEscClose.bind(this);
    }
    
    open(){
        this.popupElement.classList.add('popup_opened');
        document.addEventListener('keydown', this._handleEscClose);
    }

    close(){
        this.popupElement.classList.remove('popup_opened');
        document.removeEventListener('keydown', this._handleEscClose);
    }

    _handleEscClose(evt) {
        if(evt.key === 'Escape') {
            this.close();
        }
    }

    setEventListeners(){
        //закрытие крестиком и по оверлею
        this.popupElement.addEventListener('mousedown', evt => {
            if ((evt.target.classList.contains('popup_opened')) || (evt.target.classList.contains('button__close'))) {
                this.close();
        }})
    }
}
