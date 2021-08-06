let piece;
let board = [];

let turn;

const checkPiece = function(x, y, flip){
    let ret = 0;
    for(let dx = -1; dx <= 1; dx++){
    for(let dy = -1; dy <= 1; dy++){
        if(dx == 0 && dy == 0){ continue; }
        let nx = x + dx, ny = y + dy, n = 0;
        while(board[nx][ny] == 3 - turn) {
            n++; nx += dx; ny += dy;
        }
        if(n > 0 && board[nx][ny] == turn){
            ret += n;
            if(flip){
                nx = x + dx; ny = y + dy;
                while(board[nx][ny] == 3 - turn){
                    board[nx][ny] = turn;
                    nx += dx; ny += dy;
                }
                board[x][y] = turn;
            }
        }
    }
    }
    return ret;
};

const turnChange = function(){
    let b = 0, w = 0;
    turn = 3 - turn;
    let message = ((turn == 1)?"black":"white");

    for(let x = 1; x <= 8; x++){
    for(let y = 1; y <= 8; y++){
        if(board[x][y] == 0 && checkPiece(x, y, false)){
            document.getElementById("message").innerHTML = message + "'s move";
            showBoard();
            return;
        }
    }
    }
    turn = 3 - turn;
    message += " pass<br>" + ((turn == 1)?"black":"white") + "'s move";
    for(let x = 1; x <= 8; x++){
        for(let y = 1; y <= 8; y++){
            if(board[x][y] == 0 && checkPiece(x, y, false)){
                document.getElementById("message").innerHTML = message;
                showBoard();
                return;
            } else {
                if(board[x][y] == 1) { b++; } 
                if(board[x][y] == 2) { w++; }
            }
        }
        }

        message = "black;" + b + "white;" + w + "<br>";
        if(b == w) {
            message += "draw";
        } else {
            message += ((b > w)? "black": "white") + "won";
        }
    document.getElementById("message").innerHTML = message;
    showBoard();
};

const showBoard = function () {
    let b = document.getElementById("board");
    while (b.firstChild) {
        b.removeChild(b.firstChild);
    }
    for (let y = 1; y <= 8; y++) {
    for (let x = 1; x <= 8; x++) {
            let c = piece[board[x][y]].cloneNode(true);
            c.style.left = ((x - 1) * 64) + "px";
            c.style.top = ((y - 1) * 64) + "px";
            b.appendChild(c);
            if(board[x][y] == 0){
                (function() {
                    let _x = x, _y = y;    
                    c.onclick = function () {
                        if(checkPiece(_x,_y, true)){
                            turnChange();
                        }
                    };
                })();
            }
    }
    }
};


onload = function() {
    turn = 2;
    piece = [document.getElementById("cell"),document.getElementById("black"),document.getElementById("white")];
    for(let i = 0; i < 10; i++){
        board[i] = [];
        for(let j = 0; j <10; j++){
            board[i][j] = 0;
        }
    }
    board[4][5] = 1;
    board[5][4] = 1;
    board[4][4] = 2;
    board[5][5] = 2;
    turnChange();
};

