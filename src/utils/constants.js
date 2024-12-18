export const validationConfig = {
    formSelector: '.form__popup', 
    inputSelector: '.popup__input',
    submitButtonSelector: '.popup__button',
    inactiveButtonClass: 'button__popup_invalid',
    inputErrorClass: 'popup__input_state_invalid',
};

export const config = {
    baseUrl: "https://nomoreparties.co/v1/plus-cohort-15",
    headers: {
        "Content-type": 'application/json',
        authorization: '2b8d2e32-f428-4578-8dc4-d80d04887d6e'
    }
};

export const popupImage = document.querySelector('.popup__type-image');
export const popupProfile = document.querySelector('.popup-profile');
export const saveButton = document.querySelector('.button__edit-save');
export const editButton = document.querySelector('.button__edit');
export const nameInput = document.querySelector('.name__input');
export const jobInput = document.querySelector('.job__input');
export const popupAvatar = document.querySelector('.popup__avatar');
export const profileAvatarOverlay = document.querySelector('.profile__avatar-overlay');
export const popupNewImage = document.querySelector('.popup-image');
export const addButton = document.querySelector('.button__add');
export const formEdit = document.querySelector('.form__edit');
export const formImage = document.querySelector('.form__image');
export const formAvatar = document.querySelector('.form__avatar');
export const buttonAddSave = document.querySelector('.button__add-save');
export const buttonAvatarSave = document.querySelector('.button__avatar-save');
export const cardContainer = document.querySelector('.elements__list');
