export class FormValidator {
    constructor(passedConfig, formElement) {
        this._passedConfig = passedConfig;
        this._formElement = formElement;
        this._inputList = Array.from(this._formElement.querySelectorAll(passedConfig.inputSelector));
        this._buttonElement = this._formElement.querySelector(passedConfig.submitButtonSelector);
    }
    toggleButtonState = () => {
        if (this._hasInvalidInput(this._inputList)) {
            this._buttonElement.classList.add(this._passedConfig.inactiveButtonClass);
            this._buttonElement.disabled = true;
        } else {
            this._buttonElement.classList.remove(this._passedConfig.inactiveButtonClass);
            this._buttonElement.disabled = false;
        }
    }
    _showInputError = (inputElement, errorMessage) => {
        const errorElement = this._formElement.querySelector(`.${inputElement.id}-error`);
        inputElement.classList.add(this._passedConfig.inputErrorClass);
        errorElement.textContent = errorMessage;
    };
    _hideInputError = (inputElement) => {
        const errorElement = this._formElement.querySelector(`.${inputElement.id}-error`);
        inputElement.classList.remove(this._passedConfig.inputErrorClass);
        errorElement.textContent = '';
    };
    _checkInputValidity = (inputElement) => {
        if (!inputElement.validity.valid) {
            this._showInputError(inputElement, inputElement.validationMessage);
        } else {
            this._hideInputError(inputElement);
        }
    };
    _hasInvalidInput = () => {
        return this._inputList.some((inputElement) => {
            return !inputElement.validity.valid;
        })
    };
    _setEventListeners = () => {
        this.toggleButtonState();

        this._inputList.forEach((inputElement) => {
            inputElement.addEventListener('input', () => {
                this._checkInputValidity(inputElement)
                this.toggleButtonState();
            });
        });

        this._formElement.addEventListener('reset', () => {
            this._inputList.forEach((inputElement) => {
                this._hideInputError(inputElement);
            })
        });

    };
    resetValidation() {
        this.toggleButtonState();

        this._inputList.forEach((inputElement) => {
            this._hideInputError(inputElement);
        });

    }
    enableValidation = () => {
        this._formElement.addEventListener('submit', (evt) => {
            evt.preventDefault();
        });
        this._setEventListeners();
    }
}