import logo from "./logo.svg";
import "./App.css";
import { Grid } from "./Grid";
import { useState, useEffect } from "react";

function App() {
  let [tiles, setTiles] = useState([
    [null, null, null, null],
    [null, null, null, null],
    [null, null, null, null],
    [null, null, null, null],
  ]);
  let getEmptyTiles = () => {
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

  let generateNewTile = () => {
    let empty = getEmptyTiles();
    let randIndex = empty[Math.floor(empty.length * Math.random())];
    let randValue = Math.floor(Math.random() * 2) === 0 ? 2 : 4;
    setTiles((prev) => {
      console.log("setting tiles");
      let newTiles = [...prev];
      newTiles[randIndex[0]][randIndex[1]] = randValue;
      return newTiles;
    });
  };
  let moveTiles = (direction) => {
    let newTiles = [
      [null, null, null, null],
      [null, null, null, null],
      [null, null, null, null],
      [null, null, null, null],
    ];
    switch (direction) {
      case "up":
        console.log(JSON.stringify(tiles));

        for (let i = 0; i <= 3; i++) {
          for (let j = 0; j <= 3; j++) {
            console.log(`checking column ${j}, row ${i}`);
            console.log(tiles[i][j]);
            if (tiles[i][j]) {
              console.log(`found tile !`);
              // bloc: {
              //   for (let c = 0; c <= 3; c++) {
              //     console.log(
              //       `checking for free space at column ${j}, row ${c}`
              //     );
              //     if (!newTiles[c][j]) {
              //       console.log(`found some free space !`);
              //       newTiles[c][j] = tiles[i][j];
              //       console.log(`new tiles is now : ${newTiles}`);
              //       console.log({ tiles });
              //       break bloc;
              //     }
              //   }
              // }
            }
          }
        }
    }
    // setTiles(newTiles);
  };

  useEffect(() => {
    generateNewTile();
    generateNewTile();
    moveTiles("up");
  }, []);

  return (
    <div className="App">
      <h1>2048</h1>
      <Grid tiles={tiles} />
    </div>
  );
}

export default App;
