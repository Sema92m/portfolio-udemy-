const hamburger = document.querySelector('.hamburger'),
	menu = document.querySelector('.menu'),
	closeElem = document.querySelector('.menu__close');

hamburger.addEventListener('click', () => {
	menu.classList.add('active');
});

closeElem.addEventListener('click', () => {
	menu.classList.remove('active');
});

const percentage = document.querySelectorAll('.creation__title-percentage'),
lines = document.querySelectorAll('.creation-line span');

percentage.forEach( (item, i) => {
	lines[i].style.width = item.innerHTML;

})
