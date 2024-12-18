export class Card {
    constructor(data, userId, cardTemplate, {handleCardClick}, {handleToggleLike}, {removeCard}) {
        this._handleCardClick = handleCardClick;
        this._cardTemplate = cardTemplate;
        this._removeCard = removeCard;
        this._userId = userId; 
        this._owner = data.owner._id;
        this._id = data; 
        this._image = data.link;
        this._name = data.name;
        this._toggleLike = handleToggleLike;    
    }


    _getTemplate() {
        return document.querySelector(this._cardTemplate).content.cloneNode(true);   
    }

 
    _cardOwner(_owner) {    
        if(this._owner !== this._userId) {
            const cardDelete = this._element.querySelector('.button__del');
            cardDelete.remove(); 
        } 
    }


    generateCardElement() {
        this._element = this._getTemplate();
        this._setEventListener();
        const cardImage = this._element.querySelector('.elements__img');
        const cardName = this._element.querySelector('.elements__title');
        cardImage.src = this._image;
        cardImage.alt = this._name;
        cardName.textContent = this._name;
        this._cardOwner(this._owner);
        this._likeCounter = this._element.querySelector('.photo__like-counter');
        this._setLikesCount(this._id.likes.length);
        this._checkMyLike(this._id.likes);  
        return this._element
    }
    

    _deleteCard() {
        this._removeCard(this._element, this._id);
    }
    
    _cardClickHandler(evt) {
        if(evt.target.classList.contains('button__del')) {
           this._deleteCard(); 
        }
    }

    _handleToggleLike() {
        if (!this._likeButton.classList.contains('button__like-active')) {
            this._toggleLike('PUT', this._id)
                .then((data) => {
                this._setLikesCount(data.likes.length);
                this._checkMyLike(data.likes);
                })
                .catch((err) => console.log(err));
            } else {
            this._toggleLike('DELETE', this._id)
                .then((data) => {
                this._setLikesCount(data.likes.length);
                this._checkMyLike(data.likes);
                })
                .catch((err) => console.log(err));
        }
    }

    _setLikesCount(length) {
        this._likeCounter.textContent = length;
    }  

    _checkMyLike(likes) {
        const myLike = (likeObj) => likeObj._id === this._userId;
        if(likes.find(myLike)) { 
            this._likeButton.classList.add('button__like-active');   
        } else {
            this._likeButton.classList.remove('button__like-active');
        }
    }


    _setEventListener() {
        this._cardHandler = this._cardClickHandler.bind(this);
        this._element.addEventListener('click', this._cardHandler);


       this._likeButton = this._element.querySelector('.button__like');
       this._likeButton.addEventListener('click', () => this._handleToggleLike());
       

        this._element.querySelector('.elements__img').addEventListener('click', () => {
            this._handleCardClick();
        });


        this._deleteButton = this._element.querySelector('.button__del');
        this._deleteButton.addEventListener('click', (evt) => {
            const cardElement = evt.target.closest('.elements__item')
            this._removeCard(cardElement, this._id)
        });
    }
}
