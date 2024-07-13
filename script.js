const cardsArray = [
    { name: 'image1', img: '1.jpg' },
    { name: 'image2', img: '2.jpg' },
    { name: 'image3', img: '3.png' },
    { name: 'image4', img: '4.jpg' },
    { name: 'image5', img: '5.jpg' },
    { name: 'image6', img: '6.jpg' },
    { name: 'image7', img: '7.jpg' },
    { name: 'image8', img: '8.jpg' }
];

let gameGrid = cardsArray.concat(cardsArray).sort(() => 0.5 - Math.random());
let firstGuess = '';
let secondGuess = '';
let count = 0;
let previousTarget = null;
let delay = 1000;

const gameBoard = document.getElementById('gameBoard');

function createBoard() {
    gameGrid.forEach(item => {
        const card = document.createElement('div');
        card.classList.add('card');
        card.dataset.name = item.name;

        const front = document.createElement('div');
        front.classList.add('front');

        const img = document.createElement('img');
        img.src = item.img;
        img.alt = item.name;

        front.appendChild(img);

        const back = document.createElement('div');
        back.classList.add('back');

        card.appendChild(front);
        card.appendChild(back);
        gameBoard.appendChild(card);
    });
}

function matchCards() {
    const selected = document.querySelectorAll('.selected');
    selected.forEach(card => {
        card.classList.add('matched');
        card.classList.remove('selected');
    });
}

function resetGuesses() {
    firstGuess = '';
    secondGuess = '';
    count = 0;
    previousTarget = null;

    const selected = document.querySelectorAll('.selected');
    selected.forEach(card => {
        card.classList.remove('selected');
    });
}

gameBoard.addEventListener('click', function(event) {
    const clicked = event.target;

    if (
        clicked.parentNode.classList.contains('card') &&
        !clicked.parentNode.classList.contains('selected') &&
        !clicked.parentNode.classList.contains('matched')
    ) {
        if (count < 2) {
            count++;
            if (count === 1) {
                firstGuess = clicked.parentNode.dataset.name;
                clicked.parentNode.classList.add('selected');
            } else {
                secondGuess = clicked.parentNode.dataset.name;
                clicked.parentNode.classList.add('selected');
            }

            if (firstGuess && secondGuess) {
                if (firstGuess === secondGuess) {
                    setTimeout(matchCards, delay);
                }
                setTimeout(resetGuesses, delay);
            }
            previousTarget = clicked.parentNode;
        }
    }
});

function restartGame() {
    gameBoard.innerHTML = '';
    gameGrid = cardsArray.concat(cardsArray).sort(() => 0.5 - Math.random());
    createBoard();
}

document.querySelector('button').addEventListener('click', restartGame);

createBoard();
