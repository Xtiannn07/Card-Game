document.addEventListener('DOMContentLoaded', () => {
    const deck = document.querySelector('.deck');
    const cards = Array.from(document.querySelectorAll('.hero'));
    const restartButton = document.getElementById('restart');
    const scoreDisplay = document.getElementById('score');
    let hasFlippedCard = false;
    let lockBoard = false;
    let firstCard, secondCard;
    let matchedPairs = 0;

    // Shuffle cards
    function shuffleCards() {
        cards.forEach(card => {
            let randomPos = Math.floor(Math.random() * cards.length);
            card.style.order = randomPos;
        });
    }

    // Flip card logic
    function flipCard() {
        if (lockBoard || this === firstCard) return;

        this.classList.add('flipped');

        if (!hasFlippedCard) {
            hasFlippedCard = true;
            firstCard = this;
            return;
        }

        secondCard = this;
        lockBoard = true;

        checkForMatch();
    }

    // Check if cards match
    function checkForMatch() {
        const isMatch = firstCard.querySelector('.front').src === secondCard.querySelector('.front').src;

        isMatch ? disableCards() : unflipCards();
    }

    // Disable matched cards
    function disableCards() {
        firstCard.removeEventListener('click', flipCard);
        secondCard.removeEventListener('click', flipCard);

        matchedPairs += 2;
        scoreDisplay.textContent = `Matched Pairs: ${matchedPairs / 2}`;

        resetBoard();

        if (matchedPairs === cards.length) {
            deck.classList.add('won');
            setTimeout(() => alert('You Win!'), 500);
        }
    }

    // Unflip mismatched cards
    function unflipCards() {
        setTimeout(() => {
            firstCard.classList.remove('flipped');
            secondCard.classList.remove('flipped');
            resetBoard();
        }, 1000);
    }

    // Reset the board state
    function resetBoard() {
        [hasFlippedCard, lockBoard] = [false, false];
        [firstCard, secondCard] = [null, null];
    }

    // Restart the game
    function restartGame() {
        cards.forEach(card => {
            card.classList.remove('flipped');
            card.addEventListener('click', flipCard);
        });
        matchedPairs = 0;
        scoreDisplay.textContent = `Matched Pairs: ${matchedPairs / 2}`;
        shuffleCards();
    }

    // Initialize the game
    shuffleCards();
    deck.addEventListener('click', (event) => {
        if (event.target.classList.contains('hero')) {
            flipCard.call(event.target);
        }
    });

    restartButton.addEventListener('click', restartGame);
});

// Background dots animation
document.addEventListener('DOMContentLoaded', () => {
    const numberOfDots = 200;
    const body = document.body;

    function createDot() {
        const dot = document.createElement('div');
        dot.classList.add('dot');

        const randomX = Math.random() * 100;
        const randomY = Math.random() * 100;
        dot.style.top = `${randomY}vh`;
        dot.style.left = `${randomX}vw`;

        const randomXDirection = Math.random() - 1;
        const randomYDirection = Math.random() - 1;
        dot.style.setProperty('--xDirection', randomXDirection);
        dot.style.setProperty('--yDirection', randomYDirection);

        const randomDuration = Math.random() * 3 + 2;
        dot.style.animationDuration = `${randomDuration}s`;

        body.appendChild(dot);
    }

    for (let i = 0; i < numberOfDots; i++) {
        createDot();
    }
});