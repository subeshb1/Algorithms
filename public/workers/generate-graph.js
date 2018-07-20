self.onmessage = e => {
  const check = (i, j, m, n, mode) => [
    i < m ? i : !mode ? 0 : m - 1,
    j < n ? j : !mode ? 0 : n - 1
  ];
  const arr = [];

  const row = e.data[0];
  const col = e.data[1];
  const start = check(...e.data[2], row, col);
  const end = check(...e.data[3], row, col, 1);
  console.log(row, col);
  for (let i = 0; i < row; i++) {
    for (let j = 0; j < col; j++) {
      let className = undefined;
      if (i === start[0] && j === start[1]) className = "start";
      else if (i === end[0] && j === end[1]) className = "end";

      arr.push({
        x: j * 10,
        y: i * 10,
        className,
        color: "UNVISITED",
        pos: { i, j },
        predecessor: undefined,
        d: Infinity
      });
    }
  }
  self.postMessage({ graph: arr, row, col });
};
