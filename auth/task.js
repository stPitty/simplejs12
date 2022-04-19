const form = document.forms['signin__form'];
const signin = document.querySelector('.signin');
const welcome = document.querySelector('.welcome');

const logout = document.createElement('button');
logout.textContent = 'Выйти из системы';
logout.addEventListener('click', () => {
  clearInput()
  localStorage.clear();
  activeWelcome(null);
})
document.querySelector('.card').insertAdjacentElement('beforeend', logout);

function clearInput() {
  for (let input of form.querySelectorAll('.control')) {
    input.value = null;
  }
}

function activeWelcome(id) {
  document.getElementById('user_id').textContent = id
  signin.classList.toggle('signin_active');
  welcome.classList.toggle('welcome_active');
}

if (localStorage.getItem('userId')) {
  activeWelcome(localStorage.getItem('userId'));
}

form.addEventListener('submit', event => {
  event.preventDefault();
  const xhr = new XMLHttpRequest();

  xhr.addEventListener('readystatechange', () => {
    if (xhr.readyState === xhr.DONE) {
      const response = JSON.parse(xhr.response)
      if (response.success) {
        localStorage.setItem('userId', response['user_id'])
        activeWelcome(response['user_id'])
      } else {
        clearInput()
        alert('Неверный логин или пароль');
      }
    }
  })

  xhr.open('POST', 'https://netology-slow-rest.herokuapp.com/auth.php');
  xhr.send(new FormData(form));
})