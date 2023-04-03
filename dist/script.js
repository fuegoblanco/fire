const buttons = document.getElementsByTagName('BUTTON');
const screen = document.getElementById('screen');

document.body.addEventListener('click', sleepScreen);

for (let i = 0; i < buttons.length; i++)
  buttons[i].addEventListener('click', startScreen);

function sleepScreen(e) {
  if (e.target.tagName != 'BUTTON')
    screen.style.backgroundColor = '#1d1d1d';
}

function startScreen() {
  screen.style.backgroundColor = 'black';
}

screen.style.transition = 'all 0.5s ease-in-out';