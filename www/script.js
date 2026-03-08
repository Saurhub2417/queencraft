const canvas = document.getElementById("boardCanvas");
const ctx = canvas.getContext("2d");

let N = 4;
let board = [];
let cellSize;
let mode = "manual";
let solving = false;

let timerInterval;
let seconds = 0;

let queenImage = new Image();
queenImage.src = "assets/queen.png";

let moveSound = new Audio("assets/move.mp3");
let winSound = new Audio("assets/win.mp3");
let looseSound = new Audio("assets/loose.mp3");


function resizeCanvas() {
    const size = canvas.clientWidth;

    canvas.width = size;
    canvas.height = size;

    cellSize = canvas.width / N;

    drawBoard();
}

window.addEventListener("resize", resizeCanvas);

function startTimer() {
    clearInterval(timerInterval);
    seconds = 0;
    document.getElementById("time").innerText = seconds + " s";

    timerInterval = setInterval(() => {
        seconds++;
        document.getElementById("time").innerText = seconds + " s";
    }, 1000);
}

function stopTimer() {
    clearInterval(timerInterval);
}

/* ================= START GAME ================= */

function startGame() {
    N = parseInt(document.getElementById("nValue").value);

    if (N < 4) {
        alert("Minimum N is 4");
        return;
    }

    mode = document.getElementById("mode").value;
    board = new Array(N).fill(-1);

    resizeCanvas();

    document.getElementById("status").innerText = "Running";
    document.getElementById("conflicts").innerText = "0";

    startTimer();

    if (mode === "ai") {
        solving = true;
        solveAI(0).then(() => {
            solving = false;
            stopTimer();
        });
    }
}

function startPressed() {
    startGame();
}
function drawBoard() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    for (let row = 0; row < N; row++) {
        for (let col = 0; col < N; col++) {

            ctx.fillStyle = (row + col) % 2 === 0 ? "#451e0e" : "#f5e4ce";
            ctx.fillRect(col * cellSize, row * cellSize, cellSize, cellSize);

            if (board[row] === col) {
                ctx.drawImage(
                    queenImage,
                    col * cellSize,
                    row * cellSize,
                    cellSize,
                    cellSize
                );
            }
        }
    }
}


canvas.addEventListener("click", function (event) {

    if (mode !== "manual" || solving) return;

    const rect = canvas.getBoundingClientRect();

    // IMPORTANT FIX
    const scaleX = canvas.width / rect.width;
    const scaleY = canvas.height / rect.height;

    const x = (event.clientX - rect.left) * scaleX;
    const y = (event.clientY - rect.top) * scaleY;

    const row = Math.floor(y / cellSize);
    const col = Math.floor(x / cellSize);

    board[row] = col;

    moveSound.currentTime = 0;
    moveSound.play();

    drawBoard();
    updateConflicts();
});


function updateConflicts() {
    let conflicts = 0;

    for (let i = 0; i < N; i++) {
        for (let j = i + 1; j < N; j++) {

            if (board[i] === -1 || board[j] === -1) continue;

            if (
                board[i] === board[j] ||
                Math.abs(board[i] - board[j]) === Math.abs(i - j)
            ) {
                conflicts++;
            }
        }
    }

    document.getElementById("conflicts").innerText = conflicts;
}

function submitSolution() {

    let conflicts = 0;

    for (let i = 0; i < N; i++) {

        if (board[i] === -1) {
            showPopup("Incomplete board!");
            looseSound.play();
            return;
        }

        for (let j = i + 1; j < N; j++) {

            if (
                board[i] === board[j] ||
                Math.abs(board[i] - board[j]) === Math.abs(i - j)
            ) {
                conflicts++;
            }
        }
    }

    if (conflicts === 0) {
        showPopup("You made it :) move to next level!");
        winSound.play();
        stopTimer();
        document.getElementById("status").innerText = "Solved!";
    } else {
        showPopup(" Try again you made " + conflicts + " conflicts");
        looseSound.play();
    }
}
async function solveAI(row) {

    if (row === N) {
        document.getElementById("status").innerText = "AI Solved!";
        showPopup("🤖 AI solved!");
        return true;
    }

    for (let col = 0; col < N; col++) {

        board[row] = col;
        drawBoard();
        await sleep(120);

        if (isSafe(row)) {
            if (await solveAI(row + 1)) return true;
        }

        board[row] = -1;
    }

    return false;
}

function isSafe(row) {
    for (let i = 0; i < row; i++) {
        if (
            board[i] === board[row] ||
            Math.abs(board[i] - board[row]) === row - i
        ) {
            return false;
        }
    }
    return true;
}

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}
function resetBoard() {
    board = new Array(N).fill(-1);
    drawBoard();
    stopTimer();
    document.getElementById("status").innerText = "Reset";
    document.getElementById("conflicts").innerText = "0";
    document.getElementById("time").innerText = "0 s";
}
function showPopup(message) {
    document.getElementById("popupMessage").innerText = message;
    document.getElementById("popup").classList.remove("hidden");
}

function closePopup() {
    const popup = document.getElementById("popup");
    const msg = document.getElementById("popupMessage");
    if (popup) popup.classList.add("hidden");
    if (msg) msg.innerText = "";
}
board = new Array(N).fill(-1);
resizeCanvas();

// Theme toggle: toggles light theme on body and persists choice
function toggleTheme() {
    const body = document.body;
    const btn = document.getElementById("themeBtn");

    if (!body.classList.contains("light-theme")) {
        body.classList.add("light-theme");
        if (btn) btn.innerText = "Dark";
        localStorage.setItem("theme", "light");
    } else {
        body.classList.remove("light-theme");
        if (btn) btn.innerText = "Theme";
        localStorage.setItem("theme", "dark");
    }
}

// Apply saved theme on load
(function applySavedTheme() {
    const saved = localStorage.getItem("theme");
    const btn = document.getElementById("themeBtn");
    if (saved === "light") {
        document.body.classList.add("light-theme");
        if (btn) btn.innerText = "Dark";
    } else {
        document.body.classList.remove("light-theme");
        if (btn) btn.innerText = "Theme";
    }
})();