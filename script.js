const cardValues = [
    "🍎", "🍎",
    "🍌", "🍌",
    "🍇", "🍇",
    "🍒", "🍒",
    "🍋", "🍋",
    "🥝", "🥝",
    "🍉", "🍉",
    "🍑", "🍑"
];

// Shuffle cards
cardValues.sort(() => Math.random() - 0.5);

const gameBoard = document.getElementById("game-board");
const movesDisplay = document.getElementById("moves");
const bestScoreDisplay = document.getElementById("best-score");
const restartButton = document.getElementById("restart-btn");

let firstCard = null;
let secondCard = null;
let lockBoard = false;
let moves = 0;
let matchesFound = 0;

// Load best score
let bestScore = localStorage.getItem("bestScore");

if (bestScore !== null) {
    bestScoreDisplay.textContent = bestScore;
}

// Create cards
cardValues.forEach(value => {

    const card = document.createElement("div");

    card.classList.add("card");

    card.dataset.value = value;

    card.textContent = "?";

    gameBoard.appendChild(card);

    card.addEventListener("click", () => {

        if (lockBoard) {
            return;
        }

        if (card === firstCard) {
            return;
        }

        if (card.classList.contains("matched")) {
            return;
        }

        // Flip card
        card.textContent = card.dataset.value;
        card.classList.add("flipped");

        // First card
        if (firstCard === null) {

            firstCard = card;
            return;
        }

        // Second card
        secondCard = card;

        moves++;
        movesDisplay.textContent = moves;

        checkMatch();

    });

});

// Match checking
function checkMatch() {

    if (
        firstCard.dataset.value ===
        secondCard.dataset.value
    ) {

        firstCard.classList.add("matched");
        secondCard.classList.add("matched");

        matchesFound++;

        resetSelections();

        // Win check
        if (matchesFound === 8) {

            setTimeout(() => {

                if (
                    bestScore === null ||
                    moves < Number(bestScore)
                ) {

                    localStorage.setItem(
                        "bestScore",
                        moves
                    );

                    bestScoreDisplay.textContent = moves;
                }

                alert(
                    `You won in ${moves} moves!`
                );

            }, 300);
        }
    }

    else {

        lockBoard = true;

        setTimeout(() => {

            firstCard.textContent = "?";
            secondCard.textContent = "?";

            firstCard.classList.remove("flipped");
            secondCard.classList.remove("flipped");

            resetSelections();

            lockBoard = false;

        }, 1000);
    }
}

// Reset selections
function resetSelections() {

    firstCard = null;
    secondCard = null;
}

// Restart game
restartButton.addEventListener("click", () => {

    location.reload();

});



