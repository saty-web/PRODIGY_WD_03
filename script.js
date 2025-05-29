const cells = document.querySelectorAll(".cell");
const resetButton = document.getElementById("reset");
const resultDisplay = document.createElement("h2");
document.querySelector(".container").appendChild(resultDisplay);

let currentPlayer = "X";
let boardState = ["", "", "", "", "", "", "", "", ""];

const checkWinner = () => {
    const winningPatterns = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
        [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columns
        [0, 4, 8], [2, 4, 6] // Diagonals
    ];

    for (let pattern of winningPatterns) {
        const [a, b, c] = pattern;
        if (boardState[a] && boardState[a] === boardState[b] && boardState[a] === boardState[c]) {
            resultDisplay.innerHTML = `🎉 Player ${currentPlayer} Wins! 🎉`;
            highlightWinnerCells(pattern);
            disableBoard();
            return;
        }
    }

    if (!boardState.includes("")) {
        resultDisplay.innerHTML = "😕 It's a Draw! 😕";
        disableBoard();
    }
};

const highlightWinnerCells = (pattern) => {
    pattern.forEach(index => {
        cells[index].style.background = "gold";
    });
};

const disableBoard = () => {
    cells.forEach(cell => cell.style.pointerEvents = "none");
};

cells.forEach(cell => {
    cell.addEventListener("click", () => {
        const index = cell.id;

        if (!boardState[index]) {
            boardState[index] = currentPlayer;
            cell.textContent = currentPlayer;
            checkWinner();
            currentPlayer = currentPlayer === "X" ? "O" : "X";
        }
    });
});

const resetGame = () => {
    boardState = ["", "", "", "", "", "", "", "", ""];
    cells.forEach(cell => {
        cell.textContent = "";
        cell.style.background = "rgba(255, 255, 255, 0.2)";
        cell.style.pointerEvents = "auto";
    });
    resultDisplay.innerHTML = "";
    currentPlayer = "X";
};

resetButton.addEventListener("click", resetGame);
