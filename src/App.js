import logo from "./logo.svg";
import "./App.css";
import { Grid } from "./Grid";
import { useState, useEffect } from "react";

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
              for (let c = 0; c <= 3; c++) {
                // checking for free space at column ${j}, row ${c}
                if (!newTiles[c][j]) {
                  // found some free space !
                  newTiles[c][j] = tiles[i][j];
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
              for (let c = 3; c >= 0; c--) {
                if (!newTiles[c][j]) {
                  newTiles[c][j] = tiles[i][j];
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

function App() {
  let [tiles, setTiles] = useState(initTiles());

  const keyHandler = (event) => {
    if (event.key === "ArrowUp") {
      let newTiles = moveTiles("up", tiles);
      let newnewTiles = generateNewTile(newTiles);
      setTiles(newnewTiles);
    }
    if (event.key === "ArrowDown") {
      let newTiles = moveTiles("down", tiles);
      let newnewTiles = generateNewTile(newTiles);
      setTiles(newnewTiles);
    }
    if (event.key === "ArrowLeft") {
      let newTiles = moveTiles("left", tiles);
      let newnewTiles = generateNewTile(newTiles);
      setTiles(newnewTiles);
    }
    if (event.key === "ArrowRight") {
      let newTiles = moveTiles("right", tiles);
      let newnewTiles = generateNewTile(newTiles);
      setTiles(newnewTiles);
    }
  };

  useEffect(() => {
    document.addEventListener("keydown", keyHandler, false);

    return () => {
      document.removeEventListener("keydown", keyHandler, false);
    };
  });
  return (
    <div className="App">
      <h1>2048</h1>
      <Grid tiles={tiles} />
    </div>
  );
}

export default App;
