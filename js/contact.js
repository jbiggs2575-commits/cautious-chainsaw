// Various variables used through out this javascript page
const hasAcc = document.querySelector('.hasAcc');
const needsAcc = document.querySelector('.needsAcc');
const createAcc = document.querySelector('.createAcc');
const signIn = document.getElementById('signIn');
const signOut = document.getElementById('signOut');
const userSignIn = document.querySelector('.userSignIn');
const signOutContainer = document.querySelector('#signOutContainer');
const users = JSON.parse(localStorage.getItem('users')) || [];
// User class constructor
class User {
  constructor(username, email, password) {
    this.username = username;
    this.email = email;
    this.password = password;
  }
}
// Event listener that shows the has account form and hides the needs account form
hasAcc.addEventListener('click', function () {
  document.getElementById('formNeedsAcc').classList.remove('hide');
  document.getElementById('signInForm').classList.remove('hide');
  document.getElementById('joinForm').classList.add('hide');
  document.getElementById('formHasAcc').classList.add('hide');
});
// Event listener that shows the needs account form and hides the has account form
needsAcc.addEventListener('click', function () {
  document.getElementById('formNeedsAcc').classList.add('hide');
  document.getElementById('signInForm').classList.add('hide');
  document.getElementById('joinForm').classList.remove('hide');
  document.getElementById('formHasAcc').classList.remove('hide');
});
// Create account validation
function createAccount() {
  try {
    createAcc.addEventListener('click', function () {
      let username = document.getElementById('username');
      let email = document.getElementById('email');
      let password = document.getElementById('password');
      let usernameValue = username.value;
      let emailValue = email.value;
      let passwordValue = password.value;
      let emailValidate = /\w+@\w+\.\w{2,4}/i;
      let user = new User(usernameValue, emailValue, passwordValue);
      if (usernameValue === "") {
        document.querySelector('.smallUsername').classList.remove('hide');
      } else if (emailValue === "" || !emailValue.match(emailValidate)) {
        document.querySelector('.smallEmail').classList.remove('hide');
      } else if (passwordValue === "") {
        document.querySelector('.smallPassword').classList.remove('hide');
      } else if (users.some(({ username }) => username === user.username)) {
        document.querySelector('.existingAcc').classList.remove('hide');
      } else {
        users.push(user);
        localStorage.setItem('users', JSON.stringify(users));
        localStorage.setItem('signedIn', usernameValue);
        userSignIn.textContent = `Welcome, ${user.username}`;
        signOutContainer.classList.remove('hide');
        username.value = "";
        email.value = "";
        password.value = "";
        document.querySelector('.existingAcc').classList.add('hide');
      }
    });
  } catch (err) {
    console.error('error')
  }
}
// Sign-In
signIn.addEventListener('click', function () {
  const users = JSON.parse(localStorage.getItem('users'));
  let signInUsername = document.getElementById('signInUsername');
  let signInPassword = document.getElementById('signInPassword');
  let signInUsernameValue = signInUsername.value;
  let signInPasswordValue = signInPassword.value;
  if (signInUsernameValue === "") {
    document.querySelector('.smallSignInUsername').classList.remove('hide');
  } else if (signInPasswordValue === "") {
    document.querySelector('.smallSignInPassword').classList.remove('hide');
  }
  const user = users.find(({ username }) => username === signInUsernameValue);

  if (!user) {
    document.querySelector('.smallNoExistingAcc').classList.remove('hide');
    return;
  }
  if (user.password !== signInPasswordValue) {
    document.querySelector('.smallNoExistingPassword').classList.remove('hide');
    return;
  }
  // Local Storage
  localStorage.setItem('signedIn', signInUsernameValue);
  userSignIn.textContent = `Welcome, ${signInUsernameValue}`;
  signOutContainer.classList.remove('hide');
  signInUsername.value = "";
  signInPassword.value = "";
  document.querySelector('.smallNoExistingAcc').classList.add('hide');
  document.querySelector('.smallNoExistingPassword').classList.add('hide')
});

document.querySelectorAll('input').forEach(input => {
  input.addEventListener('input', e => {
    input.nextElementSibling.classList.add('hide');
  })
});

function signedIn() {
  let signedIn = localStorage.getItem('signedIn');
  let users = JSON.parse(localStorage.getItem('users'));
  if (!users) {
    return;
  }
  const user = users.find(({ username }) => username === signedIn)
  if (!user) {
    return;
  }
  if (signedIn) {
    userSignIn.textContent = `Welcome, ${user.username}`;
    signOutContainer.classList.remove('hide')
  }

}
// Load Content
document.addEventListener('DOMContentLoaded', function () {
  signedIn();
  createAccount();
});
// Sign-Out
signOut.addEventListener('click', function () {
  localStorage.setItem('signedIn', null);
  userSignIn.textContent = "";
  signOutContainer.classList.add('hide');
});