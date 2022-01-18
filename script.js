const el = document.querySelectorAll('.el');
const main = document.querySelector('.main');

function getRandomNum(min, max) {
	min = Math.ceil(min);
  	max = Math.floor(max);
  	return Math.floor(Math.random() * (max - min)) + min;
}

const randomArr = [];


function numWithoutRepeat () {
	for (let i = 0; i < 25; i++) {
		const num = getRandomNum(1, 26);
		if (!randomArr.includes(num)) {
			randomArr[i] = num;
		} else {
			i--;
		}
	}

}

function getRandomColor() {
	const colors = ['#add6e3', '#c07373', '#de9d20', '#71de20', '#20de75', '#20a5de', '#2057de', '#5f20de', '#d720de', '#de20b5'];
	const num = getRandomNum(0, 10);

	const randomColor = colors[num];
	return randomColor
}

function getRandomSize() {
	const size = getRandomNum(15, 45) + 'px';
	return size;
}

function start() {
	numWithoutRepeat();
	createNotificationParagraph();
	for (let i = 0; i < el.length; i++) {
		el[i].textContent = randomArr[i];
		el[i].style.color = getRandomColor();
		el[i].style.fontSize = getRandomSize();
		el[i].addEventListener('click', gameRules)	
	}
}

let counter = 1;

function gameRules() {
	let content = +this.textContent;
	console.log(`counter: ${counter}`);
	console.log(`content: ${content}`);
	if (counter == content) {
		this.classList.add('true');
		counter++;
		if (counter > 25 && content == 25) {
			win();
		}
	} else {
		gameOver();
	}
}


function gameOver() {
	for (let i = 0; i < el.length; i++) {
		el[i].removeEventListener('click', gameRules);
	}
	clearTimeout(timer);
	document.querySelector('.time').textContent = 'Game Over';
	createRestartBtn();
}

function win() {
	for (let i = 0; i < el.length; i++) {
		el[i].removeEventListener('click', gameRules);
	}
	clearTimeout(timer);
	document.querySelector('.time').textContent = "Winner!!";
	createRestartBtn();
}

let timer;
let time = 60;

function createNotificationParagraph() {
	const p = document.createElement('p');
	p.classList.add('time');
	document.querySelector('.wrapper').insertAdjacentElement("afterBegin", p);
	countdown();

}

function countdown() {
	document.querySelector('.time').textContent = `Time left: ${time--}`;
	if (document.querySelector('.time').textContent == `Time left: ${0}`) {
		clearTimeout(timer);
		gameOver();
	} else {
		timer = setTimeout(countdown, 1000);
	}
}

function createRestartBtn() {
	const restartBtn = document.createElement('button');
	restartBtn.classList.add('restartBtn');
	restartBtn.addEventListener('click', restart);
	restartBtn.textContent = "Restart";
	//----------------
	restartBtn.disabled = true
	//--------------
	document.querySelector('.wrapper').appendChild(restartBtn);
}

function restart() {
	time = 60;
	counter = 1;
	start();
}


// restart();

start()