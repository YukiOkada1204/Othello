const piece;

const showBoard = function () {
    const b = document.getElementById("board");
    while (b.firstChild) {
        b.removeChild(b.firstChild);
    }
    for (let y = 1; y <= 8; y++) {
    for (let x = 1; x <= 8; x++) {
            const c = piece[board[x][y]].cloneNode(true);
            c.style.left = ((x - 1) * 64) + "px";
            c.style.top = ((y - 1) * 64) + "px";
            b.appendChild(c);
        }
    }
};

const board = [];

onload = function() {
    piece = [document.getElementById("cell")];
    for(let i = 0; i < 10; i++){
        board[i] = [];
        for(let j = 0; j <10; j++){
            board[i][j] = 0;
        }
    }
    showBoard();
};