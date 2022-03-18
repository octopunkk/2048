export const Tile = (props) => {
  return (
    <div
      className="Tile"
      style={{
        gridRow: props.tile.position[0],
        gridColumn: props.tile.position[1],
      }}
    >
      {props.tile.filled && props.tile.value}
    </div>
  );
};
