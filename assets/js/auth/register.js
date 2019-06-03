const firstnameInput = document.getElementById('firstname');
const lastnameInput = document.getElementById('lastname');
const emailInput = document.getElementById('email');
const passwordInput = document.getElementById('password');
const passwordConfirmationInput = document.getElementById('password-confirmation');
const passwordVisibility = document.getElementById('password-visibility');

/**
 * Check if firstname is not empty or not or does not exceed 75 chars.
 */
firstnameInput.addEventListener('keyup', () => {
  const classes = firstnameInput.classList;
  if (firstnameInput.value.length === 0 || firstnameInput.value.length > 75) {
    classes.add('invalid');
    classes.remove('valid');
  } else {
    classes.add('valid');
    classes.remove('invalid');
  }
});

/**
 * Check if lastname is not empty or not or does not exceed 75 chars.
 */
lastnameInput.addEventListener('keyup', () => {
  const classes = lastnameInput.classList;
  if (lastnameInput.value.length === 0 || lastnameInput.value.length > 75) {
    classes.add('invalid');
    classes.remove('valid');
  } else {
    classes.add('valid');
    classes.remove('invalid');
  }
});

/**
 * Check email validity
 */
emailInput.addEventListener('keyup', () => {
  const classes = emailInput.classList;
  const emailValue = emailInput.value;
  const regexP = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

  if (regexP.test(emailValue)) {
    classes.add('valid');
    classes.remove('invalid');
  } else {
    classes.add('invalid');
    classes.remove('valid');
  }
});

/**
 * Check password strength
 */
passwordInput.addEventListener('keyup', () => {
  const passwordStrength = document.getElementById('password-strength');
  const passwordLength = document.getElementById('password-length');

  const passwordValue = passwordInput.value;

  const isNumeric = /\d/.test(passwordValue);
  const isLower = /[a-z]/.test(passwordValue);
  const isUpper = /[A-Z]/.test(passwordValue);
  const isOther = /\W/.test(passwordValue);

  const alphaPassword = passwordValue.replace(/[0-9\W]/g, '');
  const numericPassword = passwordValue.replace(/[a-zA-Z\W]/g, '');

  let score = 0;
  let strength = '';
  let color = '';

  if (passwordValue.length > 0 && passwordValue.length <= 4) {
    score += 5;
  } else if (passwordValue.length >= 5 && passwordValue.length <= 7) {
    score += 10;
  } else if (passwordValue.length >= 8) {
    score += 25;
  } else {
    score += 0;
  }

  if (isLower && !isUpper) {
    score += 5;
  } else if (!isLower && isUpper) {
    score += 10;
  } else if (isLower && isUpper) {
    score += 20;
  } else {
    score += 0;
  }

  if (numericPassword.length === 1) {
    score += 10;
  } else if (numericPassword.length >= 3) {
    score += 20;
  } else {
    score += 0;
  }

  if (alphaPassword.length === 1) {
    score += 10;
  } else if (alphaPassword.length >= 3) {
    score += 25;
  } else {
    score += 0;
  }

  if (isLower && !isUpper && isNumeric && !isOther) {
    score += 2;
  } else if (isLower && !isUpper && isNumeric && isOther) {
    score += 3;
  } else if (isLower && isUpper && isNumeric && isOther) {
    score += 5;
  }

  if (score >= 0 && score < 25) {
    strength = 'Very Weak';
    color = '#e71a1a';
  } else if (score >= 25 && score < 50) {
    strength = 'Weak';
    color = '#Fe3d1a';
  } else if (score >= 50 && score < 60) {
    strength = 'Average';
    color = '#e3cb00';
  } else if (score >= 60 && score < 70) {
    strength = 'Strong';
    color = '#006000';
  } else if (score >= 70 && score < 80) {
    strength = 'Very Strong';
    color = '#008000';
  } else if (score >= 80 && score < 90) {
    strength = 'Secure';
    color = '#7ff67c';
  } else if (score >= 90) {
    strength = 'Very Secure';
    color = '#0ca908';
  }

  passwordStrength.innerText = strength;
  passwordStrength.style.color = color;
  passwordLength.innerText = `${passwordValue.length}/`;
});

/**
 * Check if password match with confirm password
 */
passwordConfirmationInput.addEventListener('keyup', () => {
  const password = passwordInput.value;
  const passwordConfirmation = passwordConfirmationInput.value;
  const passwordClasses = passwordInput.classList;
  const passwordConfirmationClasses = passwordConfirmationInput.classList;

  if (passwordConfirmation === password) {
    passwordConfirmationClasses.add('valid');
    passwordClasses.add('valid');
    passwordClasses.remove('invalid');
    passwordConfirmationClasses.remove('invalid');
  } else {
    passwordClasses.add('invalid');
    passwordConfirmationClasses.add('invalid');
    passwordClasses.remove('valid');
    passwordConfirmationClasses.remove('valid');
  }
});

/**
 * Affiche ou non le mot de passe lors de la saisie
 */
passwordVisibility.addEventListener('click', () => {
  const classes = passwordVisibility.classList;

  if (passwordVisibility.getAttribute('data-visibility') === 'off') {
    classes.remove('mdi-eye-off');
    classes.add('mdi-eye');
    passwordVisibility.setAttribute('data-visibility', 'on');
    passwordInput.type = 'text';
    passwordConfirmationInput.type = 'text';
  } else {
    classes.remove('mdi-eye');
    classes.add('mdi-eye-off');
    passwordVisibility.setAttribute('data-visibility', 'off');
    passwordInput.type = 'password';
    passwordConfirmationInput.type = 'password';
  }
});
