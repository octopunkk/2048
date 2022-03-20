export const Tile = (props) => {
  let color = {
    c0: "#b7e4c7",
    c2: "#b9fbc0",
    c4: "#b9fbc0",
    c8: "#98f5e1",
    c16: "#8eecf5",
    c32: "#90dbf4",
    c64: "#a3c4f3",
    c128: "#cfbaf0",
    c256: "#f1c0e8",
    c512: "#ffcfd2",
    c1024: "#fde4cf",
    c2048: "#fbf8cc",
    c4096: "#fbf8cc",
  };
  let fontSize = props.tile < 1000 ? "40px" : "30px";
  let colorString = props.tile ? props.tile.toString() : "0";
  let colorpick = `c${colorString}`;

  return (
    <div
      className="Tile"
      style={{
        gridRow: props.rowIndex + 1,
        gridColumn: props.columnIndex + 1,
        backgroundColor: color[colorpick],
        fontSize: fontSize,
      }}
    >
      {props.tile}
    </div>
  );
};
