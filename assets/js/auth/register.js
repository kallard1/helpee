const passwordVisibility = document.getElementById('password-visibility');
const passwordInput = document.getElementById('password');
const passwordConfirmationInput = document.getElementById('password-confirmation');

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
