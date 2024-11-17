document.addEventListener('DOMContentLoaded', () => {
    const deck = document.querySelector('.deck');
    const cards = Array.from(document.querySelectorAll('.hero')); // Convert NodeList to Array
    let hasFlippedCard = false;
    let lockBoard = false;
    let firstCard, secondCard;
    let matchedPairs = 0;

    // Function to shuffle the cards
    function shuffleCards() {
        cards.forEach(card => {
            let randomPos = Math.floor(Math.random() * cards.length);
            card.style.order = randomPos; // CSS Grid allows you to order elements using the order property
        });
    }

    function flipCard() {
        if (lockBoard) return; // Prevents flipping more than two cards
        if (this === firstCard) return; // Prevents clicking the same card twice

        this.classList.add('flipped');

        if (!hasFlippedCard) {
            hasFlippedCard = true;
            firstCard = this;
            return;
        }

        secondCard = this;
        lockBoard = true; // Lock the board until cards are checked

        checkForMatch();
    }

    function checkForMatch() {
        const isMatch = firstCard.querySelector('.front').src === secondCard.querySelector('.front').src;

        if (isMatch) {
            disableCards(); // Keeps the cards flipped if they match
        } else {
            unflipCards(); // Flips them back if they don't match
        }
    }

    function disableCards() {
        // Disable further clicking on the matched cards
        firstCard.removeEventListener('click', flipCard);
        secondCard.removeEventListener('click', flipCard);

        matchedPairs += 2;
        resetBoard();

        if (matchedPairs === cards.length) {
            deck.classList.add('won');
            setTimeout(() => alert('You Win!'), 500);
        }
    }

    function unflipCards() {
        setTimeout(() => {
            firstCard.classList.remove('flipped');
            secondCard.classList.remove('flipped');
            resetBoard();
        }, 1000); // Delay before flipping back
    }

    function resetBoard() {
        [hasFlippedCard, lockBoard] = [false, false];
        [firstCard, secondCard] = [null, null];
    }

    // Shuffle cards on game start/restart
    shuffleCards();

    //click event listeners to each card
    cards.forEach(card => {
        card.addEventListener('click', flipCard);
    });

});


document.addEventListener('DOMContentLoaded', () => {
    const numberOfDots = 200; // Number of dots
    const body = document.body;

    // animate dots
    function createDot() {
        const dot = document.createElement('div');
        dot.classList.add('dot');

        // Random initial position
        const randomX = Math.random() * 100;
        const randomY = Math.random() * 100;
        dot.style.top = `${randomY}vh`;
        dot.style.left = `${randomX}vw`;

        // Random movement direction
        const randomXDirection = Math.random() - 1; // Generates a value between -1 and 1
        const randomYDirection = Math.random() - 1; 
        dot.style.setProperty('--xDirection', randomXDirection);
        dot.style.setProperty('--yDirection', randomYDirection);

        // Randomize animation duration
        const randomDuration = Math.random() * 3 + 2; // Duration between 2 and 5 seconds
        dot.style.animationDuration = `${randomDuration}s`;

        body.appendChild(dot);
    }

    // Create the desired number of dots
    for (let i = 0; i < numberOfDots; i++) {
        createDot();
    }
});

