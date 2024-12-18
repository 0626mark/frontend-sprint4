import { Popup } from "./Popup";
 
export class PopupWithImage extends Popup {
    constructor(popupElement) {
        super(popupElement);
        this.imgElement = document.querySelector(".popup__big-image");
        this.imgCaption = document.querySelector(".popup__big-title");
        }

        open(data) { 
            this.imgElement.src = data.link;
            this.imgElement.alt = data.name;
            this.imgCaption.textContent = data.name;
            super.open();
        }
}
