import './index.css'; 

import { Section } from '../components/Section';
import { Api } from '../components/api'; 
import { UserInfo } from '../components/UserInfo';
import { Card } from '../components/Сard';
import { PopupWithImage } from '../components/PopupWithImage';
import { PopupWithForm } from '../components/PopupWithForm';
import { FormValidator } from '../components/FormValidator';
import { changeLoading } from '../utils/utils';
import { popupImage, popupProfile, saveButton, editButton, nameInput, jobInput, popupAvatar, profileAvatarOverlay, popupNewImage,
    addButton, formEdit, formImage, formAvatar, buttonAddSave, buttonAvatarSave, 
    cardContainer, validationConfig, config } from '../utils/constants';

export const api = new Api(config);

const popupBigImage = new PopupWithImage(popupImage);
popupBigImage.setEventListeners(); 

function createCard(data) {
    const card = new Card(data, userId, '#card-template', 
    {handleCardClick: () => {
        popupBigImage.open(data); 
    }},
    {
        handleToggleLike: function (action, data) {
          if (action === 'PUT') {
            return api.setLike(data._id);
          } else {
            return api.remLike(data._id);
          }
        },
    },
    {removeCard: function (cardElement, cardData) {
        api.removeCard(cardData._id)
        .then(() => cardElement.remove())
        .catch((err) => console.log(err));
    }}
    );
    return card;
}


const cardList = new Section({
    renderer: (item) => {
        const cardElement = createCard(item).generateCardElement();
        cardList.addItem(cardElement)
    }
}, cardContainer);

const profileInfo = new UserInfo({
    profileName: document.querySelector('.profile__title'),
    profileDescription: document.querySelector('.profile__subtitle'),
    profileAvatar: document.querySelector('.profile__avatar'),
});

let userId = null 
api.getAllUnfo()
.then(([items, user]) => {
    items = items.reverse(); 
    profileInfo.setUserInfo(user);
    userId = user._id;
    cardList.renderItems(items);
}) 
.catch((err)=> console.log(err));

const profileFormPopup = new PopupWithForm(popupProfile, { 
    handleSubmitForm: (user) => {
        changeLoading(true, saveButton); 
        api.editInfoUser(user.username, user.profession)
        .then((res) => {
            profileInfo.setUserInfo(res)
            profileFormPopup.close()
        })
        .catch((err)=> console.log(err))
        .finally(()=>changeLoading(false, saveButton)); 
    } 
});


const openProfileFormPopup = () => {
    const userInfoEdit = profileInfo.getInfoUser();
    nameInput.value = userInfoEdit.name; 
    jobInput.value = userInfoEdit.about;
    validProfile.clearError(formEdit); 
    profileFormPopup.open();
}

editButton.addEventListener('click', () => openProfileFormPopup());


const openAvatarChange = new PopupWithForm(popupAvatar, {
    handleSubmitForm: (user) => {
        changeLoading(true, buttonAvatarSave); 
        api.patchAvatar(user.linkAvatar)
        .then((res) => {
            profileInfo.setUserInfo(res)  
            openAvatarChange.close();
        })
       .catch((err)=> console.log(err))
       .finally(()=>changeLoading(false, buttonAvatarSave));
    }
})


const openUserAvatar = () => {
    validNewAvatar.clearError(); 
    openAvatarChange.open();
}

profileAvatarOverlay.addEventListener('click', () => openUserAvatar())

const openFormPicture = new PopupWithForm(popupNewImage, {
    handleSubmitForm: (user) => {
        changeLoading(true, buttonAddSave); 
        api.addNewCard(user.imgname, user.link)
        .then((res) => {
            const cardElement = createCard(res).generateCardElement(); 
            cardList.addItem(cardElement); 
            openFormPicture.close();
        })
        .catch((err)=> console.log(err))
        .finally(()=>changeLoading(false, buttonAddSave));
        
    }
});

const openFormCard = () => {
    
    validNewImage.clearError(); 
    openFormPicture.open();
}

addButton.addEventListener('click', () => openFormCard());

const validProfile = new FormValidator(validationConfig, formEdit);
validProfile.enableValidation();

const validNewImage = new FormValidator(validationConfig, formImage);
validNewImage.enableValidation();

const validNewAvatar = new FormValidator(validationConfig, formAvatar);
validNewAvatar.enableValidation();

openAvatarChange.setEventListeners(); 
profileFormPopup.setEventListeners();
openFormPicture.setEventListeners();
