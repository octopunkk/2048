import { Tile } from "./Tile.js";

export const Grid = (props) => {
  return (
    <div className="Grid">
      {props.tiles.map((row, rowIndex) => (
        <>
          {row.map((tile, index) => (
            <Tile tile={tile} rowIndex={rowIndex} columnIndex={index} />
          ))}
        </>
      ))}
    </div>
  );
};
