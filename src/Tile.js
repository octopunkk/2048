export const Tile = (props) => {
  return (
    <div
      className="Tile"
      style={{
        gridRow: props.rowIndex + 1,
        gridColumn: props.columnIndex + 1,
      }}
    >
      {props.tile}
    </div>
  );
};
