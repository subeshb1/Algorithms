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
    });
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
    start.color = "VISITED";
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
        if (v.color === "UNVISITED") {
          v.color = "VISITED";
          v.predecessor = u;
          v.d = u.d + 1;
          action.push({
            pos: getPos(v.pos),
            color: "VISITED",
            text: [
              { text: getPos(u.pos), offsetX: 0, offsetY: 2 },
              { text: v.d, offsetX: 0, offsetY: 10 }
            ]
          });
          queue.push(v);
        }
      }

      u.color = "EXPLORED";
      action.push({
        pos: getPos(u.pos),
        color: "EXPLORED"
      });
    }

    if (final) {
      let line = `M ${final.x + 5},${final.y + 5}`;
      let path = final.predecessor;
      line += `L ${path.x + 5},${path.y + 5}`;
      console.log(goal);
      while (path.predecessor) {
        path.color = "VISITED";
        action.push({
          pos: getPos(path.pos),
          color: "PATH"
        });
        path = path.predecessor;
        line += ` L ${path.x + 5},${path.y + 5}`;
      }
      action.push({
        path: line
      });
    }
    return action;
  }
}

class DepthFirstSearch {
  constructor(graph, maxRow, maxCol, type = 0) {
    this._graph = new GraphController(graph, maxRow, maxCol, type);
  }
  search(initial, goal, diagonal = false) {
    this.diagonal = diagonal;
    this.goal = goal;
    this.action = [];
    this.getPos = this._graph.getPos.bind(this._graph);
    let start = this._graph.at(initial);
    start.predecessor = undefined;
    this.final = undefined;

    this.dfs(start);
    if (this.final) {
      let line = `M ${this.final.x + 5},${this.final.y + 5}`;
      let path = this.final.predecessor;
      line += `L ${path.x + 5},${path.y + 5}`;
      while (path.predecessor) {
        path.color = "PATH";
        this.action.push({
          pos: this.getPos(path.pos),
          color: "PATH"
        });
        path = path.predecessor;
        line += ` L ${path.x + 5},${path.y + 5}`;
      }
      this.action.push({
        path: line
      });
    }

    return this.action;
  }

  dfs(u) {
    if (u.pos.i === this.goal.i && u.pos.j === this.goal.j) {
      u.color = "VISITED";
      this.action.push({
        pos: this.getPos(u.pos),
        color: "VISITED"
      });
      this.final = u;
      return;
    }
    u.color = "VISITED";
    this.action.push({
      pos: this.getPos(u.pos),
      color: "VISITED"
    });
    for (let v of this._graph.getAdjacent(u, this.diagonal)) {
      if (this.final) return;
      if (v.color === "UNVISITED") {
        v.predecessor = u;
        this.dfs(v);
      }
    }
    if (this.final) return;
    u.color = "EXPLORED";
    this.action.push({
      pos: this.getPos(u.pos),
      color: "EXPLORED"
    });
  }
}

self.onmessage = ({
  data: [algo, { graph, col, row }, [i, j], [i2, j2], diagonal, type = 0]
}) => {
  let search;
  switch (algo) {
    case "dfs":
      search = new DepthFirstSearch(graph, row, col, type);
      break;

    default:
      search = new BreadthFirstSearch(graph, row, col, type);
  }
  console.log(algo);

  self.postMessage(search.search({ i, j }, { i: i2, j: j2 }, diagonal));
};
