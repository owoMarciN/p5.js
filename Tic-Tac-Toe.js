let players = ["X", "O"];
let board = [
      ["", "", ""],
      ["", "", ""],
      ["", "", ""],
];
let available = [];

let currentPlayer;
function setup() {
      frameRate(2); //Speed of the game
      createCanvas(600, 600);
      currentPlayer = floor(random(players.length));
      for (let i = 0; i < 3; i++) {
            for (let j = 0; j < 3; j++) {
              available.push([i, j]);
            }
      }
}

function equals_3(a, b, c) {
      return a == b && b == c && a != "";
}
function checkWinner() {
      let winner = null;
    
      let w = width / 6;
      let h = height / 6;
    
      //Checking columns
      for (let i = 0; i < 3; i++) {
            if (equals_3(board[0][i], board[1][i], board[2][i])) {
              drawLine((width / 3) * i + w, 0, (width / 3) * i + w, height);
              winner = board[0][i];
            }
      }

      //Checking rows
      for (let i = 0; i < 3; i++) {
            if (equals_3(board[i][0], board[i][1], board[i][2])) {
              drawLine(0, (height / 3) * i + h, width, (height / 3) * i + h);
              winner = board[i][0];
            }
      }

      //Checking diagonals
      if (equals_3(board[0][0], board[1][1], board[2][2])) {
        drawLine(0, 0, width, height);
        winner = board[0][0];
      }
    
      if (equals_3(board[2][0], board[1][1], board[0][2])) {
        drawLine(width, 0, 0, height);
        winner = board[2][0];
      }

      // Winner
      if (winner == null && available.length == 0) {
            return "Tie";
      } else {
            return winner;
      }
}

function drawLine(x, y, a, b) {
      stroke(255, 0, 0);
      strokeWeight(5);
      line(x, y, a, b);
}

function nextTurn() {
      let index = floor(random(available.length));
      let spot = available.splice(index, 1)[0];
      let i = spot[0];
      let j = spot[1];
      board[i][j] = players[currentPlayer];
      currentPlayer = (currentPlayer + 1) % players.length;
}

function draw() {
      background("white");
        
      //Height and Width of one cell
      let w = width / 3;
      let h = height / 3;
        
      //Setting up the grid
      line(w, 0, w, width);
      line(w * 2, 0, w * 2, width);
      line(0, h, height, w);
      line(0, h * 2, height, w * 2);
    
      for (let i = 0; i < 3; i++) {
            for (let j = 0; j < 3; j++) {
                  let spot = board[i][j];
                  let x = w * j + w / 2;
                  let y = h * i + h / 2;
                  textSize(32);
                  text(spot, x, y);
                  strokeWeight(3);
                  noFill(0);
                  if (spot == players[1]) {
                        circle(x, y, w / 2);
                  } else if (spot == players[0]) {
                        let xr = w / 4;
                        line(x - xr, y - xr, x + xr, y + xr);
                        line(x + xr, y - xr, x - xr, y + xr);
                  }
            }
      }
      let result = checkWinner();
      if (result != null) {
            noLoop();
            console.log("The result is: " + result);
      } else {
            nextTurn();
      }
}
