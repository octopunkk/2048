import logo from "./logo.svg";
import "./App.css";
import { Grid } from "./Grid";
import { Score } from "./Score";
import { useState, useEffect } from "react";

let score = 0;
if (!localStorage.getItem("hiscore")) {
  localStorage.setItem("hiscore", 0);
}

let getEmptyTiles = (tiles) => {
  let empty = [];
  tiles.forEach((row, rowIndex) => {
    row.forEach((tile, columnIndex) => {
      if (!tile) {
        empty.push([rowIndex, columnIndex]);
      }
    });
  });
  return empty;
};

let generateNewTile = (tiles) => {
  let empty = getEmptyTiles(tiles);
  let randIndex = empty[Math.floor(empty.length * Math.random())];
  let randValue = Math.floor(Math.random() * 2) === 0 ? 2 : 4;
  let newTiles = JSON.parse(JSON.stringify(tiles));
  newTiles[randIndex[0]][randIndex[1]] = randValue;
  return newTiles;
};

let initTiles = () => {
  let tiles = [
    [null, null, null, null],
    [null, null, null, null],
    [null, null, null, null],
    [null, null, null, null],
  ];
  let newTiles = generateNewTile(generateNewTile(tiles));
  return newTiles;
};

let pathIsClear = (line, index1, index2) => {
  //line means row or column
  //always have index1 < index2
  if (index1 > index2) {
    let tmp = index1;
    index1 = index2;
    index2 = tmp;
  }
  for (let i = index1 + 1; i < index2; i++) {
    if (line[i]) {
      return false;
    }
  }
  return true;
};

let moveTiles = (direction, tiles) => {
  let newTiles = [
    [null, null, null, null],
    [null, null, null, null],
    [null, null, null, null],
    [null, null, null, null],
  ];
  switch (direction) {
    case "up":
      for (let i = 0; i <= 3; i++) {
        for (let j = 0; j <= 3; j++) {
          // checking column ${j}, row ${i}
          if (tiles[i][j]) {
            // found tile !
            bloc: {
              let line = [tiles[0][j], tiles[1][j], tiles[2][j], tiles[3][j]];
              for (let c = 0; c <= 3; c++) {
                // checking for free space at column ${j}, row ${c}
                if (!newTiles[c][j]) {
                  // found some free space !
                  newTiles[c][j] = tiles[i][j];
                  break bloc;
                } else if (
                  newTiles[c][j] === tiles[i][j] &&
                  pathIsClear(line, c, i)
                ) {
                  newTiles[c][j] += newTiles[c][j];
                  score += newTiles[c][j];
                  if (score > parseInt(localStorage.getItem("hiscore"))) {
                    localStorage.setItem("hiscore", score);
                  }
                  break bloc;
                }
              }
            }
          }
        }
      }
      break;
    case "down":
      for (let i = 3; i >= 0; i--) {
        for (let j = 3; j >= 0; j--) {
          if (tiles[i][j]) {
            bloc: {
              let line = [tiles[0][j], tiles[1][j], tiles[2][j], tiles[3][j]];
              for (let c = 3; c >= 0; c--) {
                if (!newTiles[c][j]) {
                  newTiles[c][j] = tiles[i][j];
                  break bloc;
                } else if (
                  newTiles[c][j] === tiles[i][j] &&
                  pathIsClear(line, c, i)
                ) {
                  newTiles[c][j] += newTiles[c][j];
                  score += newTiles[c][j];
                  if (score > parseInt(localStorage.getItem("hiscore"))) {
                    localStorage.setItem("hiscore", score);
                  }
                  break bloc;
                }
              }
            }
          }
        }
      }
      break;
    case "left":
      for (let i = 0; i <= 3; i++) {
        for (let j = 0; j <= 3; j++) {
          if (tiles[j][i]) {
            bloc: {
              for (let c = 0; c <= 3; c++) {
                if (!newTiles[j][c]) {
                  newTiles[j][c] = tiles[j][i];
                  break bloc;
                } else if (
                  newTiles[j][c] === tiles[j][i] &&
                  pathIsClear(tiles[j], c, i)
                ) {
                  newTiles[j][c] += newTiles[j][c];
                  score += newTiles[j][c];
                  if (score > parseInt(localStorage.getItem("hiscore"))) {
                    localStorage.setItem("hiscore", score);
                  }
                  break bloc;
                }
              }
            }
          }
        }
      }
      break;
    case "right":
      for (let i = 3; i >= 0; i--) {
        for (let j = 3; j >= 0; j--) {
          if (tiles[j][i]) {
            bloc: {
              for (let c = 3; c >= 0; c--) {
                if (!newTiles[j][c]) {
                  newTiles[j][c] = tiles[j][i];
                  break bloc;
                } else if (
                  newTiles[j][c] === tiles[j][i] &&
                  pathIsClear(tiles[j], c, i)
                ) {
                  newTiles[j][c] += newTiles[j][c];
                  score += newTiles[j][c];
                  if (score > parseInt(localStorage.getItem("hiscore"))) {
                    localStorage.setItem("hiscore", score);
                  }
                  break bloc;
                }
              }
            }
          }
        }
      }
      break;
  }
  return newTiles;
};

let neighborsCheck = (tiles) => {
  for (let i = 0; i <= 3; i++) {
    for (let j = 0; j <= 3; j++) {
      if (i !== 0 && tiles[i - 1][j] === tiles[i][j]) {
        return false;
      }
      if (j !== 0 && tiles[i][j - 1] === tiles[i][j]) {
        return false;
      }
      if (i !== 3 && tiles[i + 1][j] === tiles[i][j]) {
        return false;
      }
      if (j !== 3 && tiles[i][j + 1] === tiles[i][j]) {
        return false;
      }
    }
  }
  return true;
};

let gameOverCheck = (tiles) => {
  return getEmptyTiles(tiles).length === 0 && neighborsCheck(tiles);
};

let gridsAreDifferent = (tiles1, tiles2) => {
  return JSON.stringify(tiles1) !== JSON.stringify(tiles2);
};

function App() {
  let [tiles, setTiles] = useState(initTiles());
  let [gameover, setGameover] = useState(false);
  let resetGame = () => {
    score = 0;
    setTiles(initTiles());
  };

  const keyHandler = (event) => {
    if (event.key === "ArrowUp") {
      let newTiles = moveTiles("up", tiles);
      if (gridsAreDifferent(tiles, newTiles)) {
        let newnewTiles = generateNewTile(newTiles);
        setTiles(newnewTiles);
      }
    }
    if (event.key === "ArrowDown") {
      let newTiles = moveTiles("down", tiles);
      if (gridsAreDifferent(tiles, newTiles)) {
        let newnewTiles = generateNewTile(newTiles);
        setTiles(newnewTiles);
      }
    }
    if (event.key === "ArrowLeft") {
      let newTiles = moveTiles("left", tiles);
      if (gridsAreDifferent(tiles, newTiles)) {
        let newnewTiles = generateNewTile(newTiles);
        setTiles(newnewTiles);
      }
    }
    if (event.key === "ArrowRight") {
      let newTiles = moveTiles("right", tiles);
      if (gridsAreDifferent(tiles, newTiles)) {
        let newnewTiles = generateNewTile(newTiles);
        setTiles(newnewTiles);
      }
    }
  };

  useEffect(() => {
    document.addEventListener("keydown", keyHandler, false);

    return () => {
      document.removeEventListener("keydown", keyHandler, false);
    };
  });
  useEffect(() => {
    setGameover(gameOverCheck(tiles));
  }, [tiles]);
  return (
    <div className="App">
      <h1>2048</h1>
      <div className="onTopOfGrid">
        <div className="HiScore">
          High Score : {localStorage.getItem("hiscore")}
        </div>
        <Score score={score} />
        <div className="resetButton" onClick={resetGame}>
          New Game
        </div>
      </div>
      {gameover && <h2>Game Over !</h2>}
      <Grid tiles={tiles} />
    </div>
  );
}

export default App;
