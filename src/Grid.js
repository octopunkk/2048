import { Tile } from "./Tile.js";

export const Grid = (props) => {
  return (
    <div className="Grid">
      {props.tiles.map((tile) => (
        <Tile tile={tile} />
      ))}
    </div>
  );
};
