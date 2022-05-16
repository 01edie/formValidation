// elements
const form = document.querySelector('form');
const username = document.querySelector('#username');
const email = document.querySelector('#email');
const password = document.querySelector('#password');
const confirmPassword = document.querySelector('#confirm-password');

// input array
const inputArray = [username, email, password, confirmPassword];
//Functions

//ShowError Function
const showError = function (input, message) {
  const formControl = input.parentElement;
  formControl.className = 'form-control error';
  const small = formControl.querySelector('small');
  small.innerText = message;
};

//showSuccess function for
const showSuccess = function (input) {
  const formControl = input.parentElement;
  formControl.className = 'form-control success';
};


//check email
const checkEmail = function (input) {
  const re =
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

  if (re.test(String(input.value).toLowerCase().trim())) {
    showSuccess(input);
  } else {
    showError(input, 'Email is not valid');
  }
};

//checkRequired Functions
const checkRequired = function (inputArr) {
  inputArr.forEach((input) => {
    if (input.value === '') {
      showError(input, `${message(input)} is required`);
    } else {
      showSuccess(input);
    }
  });
};

//min Max function
const checkLength = function (input, min, max) {
  if (input.value.length < min) {
    showError(input, `${message(input)} must be at least ${min} characters`);
  } else if (input.value.length > max) {
    showError(input, `${message(input)} must be less than ${max} characters`);
  } else {
    showSuccess(input);
  }
};

//Password Match Function

const checkPasswordMatch = function (input1, input2) {
  if (input1.value !== '' && input2.value !== '')
    if (input1.value !== input2.value) {
      showError(input2, 'Passwords not matched');
    } else {
      showSuccess(input1);
      showSuccess(input2);
    }
};

//message function

const message = function (input) {
  var errorMessage = input.id.replace(/-p/, ' P');
  return errorMessage.charAt(0).toUpperCase() + errorMessage.slice(1);
};

//evert Listeners

form.addEventListener('submit', (e) => {
  e.preventDefault();
  checkRequired(inputArray);
  checkLength(username, 3, 10);
  checkEmail(email);
  checkLength(password, 5, 12);
  checkPasswordMatch(password, confirmPassword);
});
