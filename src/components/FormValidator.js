export class FormValidator {
    constructor(config, form) {
        this._inputSelector = config.inputSelector;
        this._submitButtonSelector = config.submitButtonSelector;
        this._inactiveButtonClass = config.inactiveButtonClass;
        this._inputErrorClass = config.inputErrorClass;
        this._form = form;
      }
 
    //показываем ошибку
    _showError(inputElement, errorMessage) {
        this._errorElement = document.querySelector(`#${inputElement.id}-error`);
        this._errorElement.textContent = errorMessage;
        this._errorElement.classList.add(this._inputErrorClass);     
    }

    //убираем ошибку
    _hideError(inputElement) {
        this._errorElement = document.querySelector(`#${inputElement.id}-error`);
        this._errorElement.textContent = '';
        this._errorElement.classList.remove(this._inputErrorClass);   
    }

    // Функция проверки валидности поля
    _isInputValid (inputElement) {
        if (!inputElement.validity.valid) {
        this._showError(inputElement, inputElement.validationMessage);
        } else {
        this._hideError(inputElement);
        }
    };

     //проверяем на валидность
     _checkInputValidity() {
        return this._inputList.every((inputElement) => {
            return inputElement.validity.valid;
        })  
    }

    //блокируем/разблокируем кнопку сохранить
    _toggleButtonState() {
        if(this._checkInputValidity()) {
            this._submitButton.classList.remove(this._inactiveButtonClass);
            this._submitButton.disabled = false;
        } else {
            this._submitButton.classList.add(this._inactiveButtonClass);
            this._submitButton.disabled = true;
        } 
    }

    //очищаем поля
    clearError() {
        this._toggleButtonState();
        this._inputList.forEach((inputElement) => {
            this._hideError(inputElement)
          });
    }

    _setEventListener() {
        this._inputList = Array.from(this._form.querySelectorAll(this._inputSelector));
        this._submitButton = this._form.querySelector(this._submitButtonSelector);
        this._toggleButtonState(); 

        this._inputList.forEach(input => {
            input.addEventListener('input', () => {
                this._isInputValid(input)
                this._toggleButtonState(this._inputList, this._submitButton);           
            });
        });
    }

    enableValidation() {
        this._setEventListener();
    }
}
