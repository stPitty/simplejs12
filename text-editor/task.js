const text = document.getElementById('editor');
const clearButton = document.createElement('button')

clearButton.textContent = 'Clear all';
clearButton.addEventListener('click', () => {
  localStorage.clear();
  text.value = null
})
text.insertAdjacentElement('afterend', clearButton);

text.value = localStorage.getItem('text');

text.addEventListener('input', () => {
  localStorage.setItem('text', text.value);
})