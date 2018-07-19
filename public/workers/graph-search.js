class GraphController {
  constructor(graph, maxRow, maxCol, type = 0) {
    this.type = type;
    this.graph = graph;
    this.maxRow = maxRow;
    this.maxCol = maxCol;
  }

  getAdjacent(node, diagonal = false) {
    if (this.type === 0) {
      return this.getAdjacentOne(node, diagonal);
    } else {
      return this.getAdjacentTwo(node);
    }
  }

  getAdjacentOne(node, diagonal = false) {
    let { pos } = node;
    let arr = [
      { i: pos.i + 1, j: pos.j },
      { i: pos.i, j: pos.j + 1 },
      { i: pos.i - 1, j: pos.j },
      { i: pos.i, j: pos.j - 1 }
    ];
    if (diagonal) {
      arr.push(
        ...[
          { i: pos.i + 1, j: pos.j - 1 },
          { i: pos.i + 1, j: pos.j + 1 },
          { i: pos.i - 1, j: pos.j + 1 },
          { i: pos.i - 1, j: pos.j - 1 }
        ]
      );
    }
    return arr
      .filter(
        val =>
          val.i >= 0 &&
          val.i < this.maxRow &&
          (val.j >= 0 && val.j < this.maxCol)
      )
      .map(pos => this.at(pos));
  }

  getAdjacentTwo(node) {
    let arr = [];
    this.graph.arcs.forEach(arc => {
      if (arc.from === node.pos) {
        arr.push(arc.to);
      } else if (arc.to === node.pos && this.graph.arcMode === 0) {
        arr.push(arc.from);
      }
      console.log("subesh", this.graph.arcMode);
    });
    console.log(arr);
    return arr
      .map(pos => {
        return this.at(pos);
      })
      .sort((a, b) => a.x >= b.x);
  }

  at(pos) {
    if (this.type === 0) {
      let { i, j } = pos;
      pos = i * this.maxCol + j;
      if (pos >= this.graph.length)
        throw new TypeError(`No Node Found of ${i},${j}`);
      return this.graph[pos];
    } else {
      return this.graph.nodes[pos];
    }
  }
  getPos({ i, j }) {
    return i * this.maxCol + j;
  }
}

class BreadthFirstSearch {
  constructor(graph, maxRow, maxCol, type = 0) {
    this._graph = new GraphController(graph, maxRow, maxCol, type);
  }

  search(initial, goal, diagonal = false) {
    let start = this._graph.at(initial);
    const getPos = this._graph.getPos.bind(this._graph);

    let action = [];
    start.color = "Gainsboro";
    start.predecessor = undefined;
    start.d = 0;
    let final;
    let queue = [start];
    while (queue.length !== 0) {
      let u = queue.shift();
      if (u.pos.i === goal.i && u.pos.j === goal.j) {
        final = u;
        break;
      }

      for (let v of this._graph.getAdjacent(u, diagonal)) {
        if (v.color === "white") {
          v.color = "Gainsboro";
          v.predecessor = u;
          v.d = u.d + 1;
          action.push({
            pos: getPos(v.pos),
            color: "Gainsboro"
          });
          queue.push(v);
        }
      }

      u.color = "lightcyan";
      action.push({
        pos: getPos(u.pos),
        color: "lightcyan"
      });
    }

    if (final) {
      let path = final.predecessor;
      while (path.predecessor) {
        path.color = "YellowGreen";
        action.push({
          pos: getPos(path.pos),
          color: "YellowGreen"
        });
        path = path.predecessor;
      }
    }
    return action;
  }
}

self.onmessage = ({
  data: [algo, { graph, col, row }, [i, j], [i2, j2], diagonal]
}) => {
  let search = new BreadthFirstSearch(graph, row, col);
  self.postMessage(search.search({ i, j }, { i: i2, j: j2 }, diagonal));
};
