const showInputError = (formElement, inputElement, errorMessage, passedConfig) => {
    const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.add(passedConfig.inputErrorClass);
    errorElement.textContent = errorMessage;
};

const hideInputError = (formElement, inputElement, passedConfig) => {
    const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.remove(passedConfig.inputErrorClass);
    errorElement.textContent = '';
};

const checkInputValidity = (formElement, inputElement, passedConfig) => {
    if (!inputElement.validity.valid) {
        showInputError(formElement, inputElement, inputElement.validationMessage, passedConfig);
    } else {
        hideInputError(formElement, inputElement, passedConfig);
    }
};

const setEventListeners = (formElement, passedConfig) => {
    const inputList = Array.from(formElement.querySelectorAll(passedConfig.inputSelector));
    const buttonElement = formElement.querySelector(passedConfig.submitButtonSelector);

    toggleButtonState(inputList, buttonElement, passedConfig);

    inputList.forEach((inputElement) => {
        inputElement.addEventListener('input', function () {
            checkInputValidity(formElement, inputElement, passedConfig);
            toggleButtonState(inputList, buttonElement, passedConfig);
        });
    });
    formElement.addEventListener('reset', function (evt) {
        evt.preventDefault();
        inputList.forEach((inputElement) => {
            inputElement.value = "";
        })
        toggleButtonState(inputList, buttonElement, passedConfig);
    });
};

const enableValidation = (passedConfig) => {
    const formList = Array.from(document.querySelectorAll(passedConfig.formSelector));
    formList.forEach((formElement) => {
        formElement.addEventListener('submit', function (evt) {
            evt.preventDefault();
        });
        setEventListeners(formElement, passedConfig);
    });
};



const hasInvalidInput = (inputList) => {
    return inputList.some((inputElement) => {
        return !inputElement.validity.valid;
    })
};
const toggleButtonState = (inputList, buttonElement, passedConfig) => {
    if (hasInvalidInput(inputList)) {
        buttonElement.classList.add(passedConfig.inactiveButtonClass);
        buttonElement.disabled = true;
    } else {
        buttonElement.classList.remove(passedConfig.inactiveButtonClass);
        buttonElement.disabled = false;
    }
};

