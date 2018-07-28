class GraphController {
  constructor(graph) {
    this.graph = graph;
  }

  getAdjacent(node, mode = 0) {
    let arr = [];
    for (let key in this.graph.arc) {
      const arc = this.graph.arc[key];
      if (arc.from === node.key) {
        arr.push(arc.to);
      } else if (arc.to === node.key && mode === 0) {
        arr.push(arc.from);
      }
    }
    return arr
      .map(pos => {
        return this.at(pos);
      })
      .sort((a, b) => a.x >= b.x);
  }
  // this.graph.arc.forEach(arc => {

  at(pos) {
    console.log(pos);
    return this.graph.node[pos];
  }
}

class BreadthFirstSearch {
  constructor(graph) {
    this._graph = new GraphController(graph);
  }
  search(initial, goal, mode = 0) {
    let start = this._graph.at(initial);
    let action = [];
    start.color = "VISITED";
    start.predecessor = undefined;
    start.d = 0;
    action.push({
      key: start.key,
      color: "VISITED",
      text: [
        { text: start.key, offsetX: 0, offsetY: 2 },
        { text: start.d, offsetX: 0, offsetY: 10 }
      ]
    });
    let final;
    let queue = [start];
    while (queue.length !== 0) {
      let u = queue.shift();
      if (u.key === goal) {
        final = u;
        break;
      }

      for (let v of this._graph.getAdjacent(u, mode)) {
        if (v.color === "UNVISITED") {
          v.color = "VISITED";
          v.predecessor = u;
          v.d = u.d + 10;
          action.push({
            key: v.key,
            color: "VISITED",
            text: [
              { text: v.key, offsetX: 0, offsetY: 2 },
              { text: v.d, offsetX: 0, offsetY: 10 }
            ]
          });
          queue.push(v);
        }
      }
      u.color = "EXPLORED";
      action.push({ key: u.key, color: "EXPLORED" });
    }
    if (final) {
      let path = final;
      while (path) {
        action.push({ key: path.key, color: "PATH" });
        path = path.predecessor;
      }
    }
    return action;
  }
}

class DepthFirstSearch {
  constructor(graph) {
    this._graph = new GraphController(graph);
  }
  search(initial, goal, mode = 0) {
    this.mode = mode;
    this.goal = goal;
    this.action = [];
    let start = this._graph.at(initial);
    start.predecessor = undefined;
    this.final = undefined;
    this.dfs(start);
    if (this.final) {
      let path = this.final;
      while (path) {
        this.action.push({ key: path.key, color: "PATH" });
        path = path.predecessor;
      }
    }
    return this.action;
  }
  dfs(u) {
    this.time++;
    u.d = this.time;

    if (u.key === this.goal) {
      this.final = u;
      this.action.push({
        key: u.key,
        color: "EXPLORED",
        text: [{ text: u.d, offsetX: 0, offsetY: 2 }]
      });
      return;
    }
    u.color = "VISITED";
    this.action.push({
      key: u.key,
      color: "VISITED",
      text: [{ text: u.d, offsetX: 0, offsetY: 2 }]
    });
    for (let v of this._graph.getAdjacent(u, this.mode)) {
      if (this.final) return;
      if (v.color === "UNVISITED") {
        v.predecessor = u;
        this.dfs(v);
      }
    }
    if (this.final) return;
    u.color = "EXPLORED";
    this.time++;
    u.f = this.time;
    this.action.push({
      key: u.key,
      color: "EXPLORED",
      text: [
        { text: u.d, offsetX: 0, offsetY: 2 },
        { text: u.f, offsetX: 0, offsetY: 10 }
      ]
    });
  }
}

self.onmessage = ({ data: [algo, { node, arc, start, end }, type = 0] }) => {
  console.log("I am here");
  if (!Object.keys(node).length) self.postMessage([]);
  let search;
  switch (algo) {
    case "dfs":
      search = new DepthFirstSearch({ node, arc });
      break;
    // case "a-star":
    //   search = new AStar(graph, row, col, type);
    //   break;
    // case "dijkstras":
    //   search = new Dijkstras(graph, row, col, type);
    //   break;
    default:
      search = new BreadthFirstSearch({ node, arc });
  }
  if (node[start] === undefined) start = Object.keys(node)[0];
  console.log(start);
  const action = search.search(start, end, type);
  console.log(JSON.stringify(action));
  self.postMessage(action);
};
