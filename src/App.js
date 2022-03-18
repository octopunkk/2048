import logo from "./logo.svg";
import "./App.css";
import { Grid } from "./Grid";
import { useState, useEffect } from "react";

function App() {
  let [tiles, setTiles] = useState([
    { filled: false, value: 0, position: [1, 4] },
    { filled: false, value: 0, position: [1, 1] },
    { filled: false, value: 0, position: [1, 2] },
    { filled: false, value: 0, position: [1, 3] },
    { filled: false, value: 0, position: [2, 4] },
    { filled: false, value: 0, position: [2, 1] },
    { filled: false, value: 0, position: [2, 2] },
    { filled: false, value: 0, position: [2, 3] },
    { filled: false, value: 0, position: [3, 4] },
    { filled: false, value: 0, position: [3, 1] },
    { filled: false, value: 0, position: [3, 2] },
    { filled: false, value: 0, position: [3, 3] },
    { filled: false, value: 0, position: [4, 4] },
    { filled: false, value: 0, position: [4, 1] },
    { filled: false, value: 0, position: [4, 2] },
    { filled: false, value: 0, position: [4, 3] },
  ]);
  let getEmptyTiles = () => {
    let empties = [];
    tiles.forEach((tile, index) => {
      if (!tile.filled) {
        empties.push(index);
      }
    });
    return empties;
  };

  let generateNewTile = () => {
    let empties = getEmptyTiles();
    let randIndex = empties[Math.floor(empties.length * Math.random())];
    let randValue = Math.floor(Math.random() * 2) === 0 ? 2 : 4;
    setTiles((prev) => {
      let newTiles = [...prev];
      let position = newTiles[randIndex].position;
      newTiles[randIndex] = {
        filled: true,
        value: randValue,
        position: position,
      };
      return newTiles;
    });
  };

  useEffect(() => {
    generateNewTile();
    generateNewTile();
  }, []);

  return (
    <div className="App">
      <h1>2048</h1>
      <Grid tiles={tiles} />
    </div>
  );
}

export default App;
