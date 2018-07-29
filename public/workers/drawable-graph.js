class GraphController {
  constructor(graph) {
    this.graph = graph;
  }
  getDistance(u, v) {
    u = this.at(u);
    v = this.at(v);
    return parseInt(
      Math.pow(Math.pow(u.x - v.x, 2) + Math.pow(u.y - v.y, 2), 0.5),
      10
    );
  }
  getAdjacent(node, mode = 0, distance = 0) {
    let arr = [];
    for (let key in this.graph.arc) {
      const arc = this.graph.arc[key];
      if (arc.from === node.key) {
        arr.push([
          this.at(arc.to),
          {
            value: distance ? this.getDistance(node.key, arc.to) : arc.value,
            through: arc.key
          }
        ]);
      } else if (arc.to === node.key && mode === 0) {
        arr.push([
          this.at(arc.from),
          {
            value: distance ? this.getDistance(node.key, arc.from) : arc.value,
            through: arc.key
          }
        ]);
      }
    }
    return arr.sort((a, b) => a[0].x >= b[0].x);
  }
  // this.graph.arc.forEach(arc => {

  at(pos) {
    return this.graph.node[pos];
  }
}

class BreadthFirstSearch {
  constructor(graph) {
    this._graph = new GraphController(graph);
  }
  search(initial, goal, distance, mode = 0) {
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
        const { through } = v[1];
        v = v[0];
        if (v.color === "UNVISITED") {
          v.color = "VISITED";
          v.predecessor = u;
          v.through = through;
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
        if (path.through)
          action.push({ key: path.through, color: "PATH", type: "ARC" });
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
  search(initial, goal, distance, mode = 0) {
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
        if (path.through)
          this.action.push({ key: path.through, color: "PATH", type: "ARC" });
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
      const { through } = v[1];
      v = v[0];
      if (this.final) return;
      if (v.color === "UNVISITED") {
        v.predecessor = u;
        v.through = through;
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

class Dijkstras {
  constructor(graph) {
    this._graph = new GraphController(graph);
  }
  search(initial, goal, distance, mode = 0) {
    const getDistance = this._graph.getDistance.bind(this._graph);
    Object.keys(this._graph.graph.node).forEach(x => {
      this._graph.graph.node[x].d = Infinity;
      this._graph.graph.node[x].predecessor = null;
    });
    let start = this._graph.at(initial);
    start.d = 0;
    let action = [];
    const queue = { ...this._graph.graph.node };
    const s = [];
    let final;
    while (Object.keys(queue).length !== s.length) {
      let u = Object.keys(queue).reduce(
        (acc, next) => {
          if (queue[next].d < acc.d && !queue[next].visit) return queue[next];
          return acc;
        },
        { d: Infinity }
      );
      if (u.key === undefined) break;
      if (u.key === goal) {
        final = u;
        break;
      }
      u.visit = true;
      s.push(u);
      action.push({ key: u.key, color: "EXPLORED" });
      for (let v of this._graph.getAdjacent(u, mode, distance)) {
        const { through, value } = v[1];
        const dis = u.d + value;
        v = v[0];
        if (v.d > dis) {
          v.d = dis;
          v.predecessor = u;
          v.through = through;
          action.push({
            key: v.key,
            color: "VISITED",
            text: [
              { text: u.key, offsetX: 0, offsetY: 2 },
              { text: v.d, offsetX: 0, offsetY: 10 }
            ]
          });
        }
      }
    }
    if (final) {
      let path = final;
      while (path) {
        action.push({ key: path.key, color: "PATH" });
        if (path.through)
          action.push({ key: path.through, color: "PATH", type: "ARC" });
        path = path.predecessor;
      }
    }
    return action;
  }
}

class AStar {
  constructor(graph) {
    this._graph = new GraphController(graph);
  }
  search(initial, goal = initial, distance, mode = 0) {
    let start = this._graph.at(initial);
    let detail = {};
    let open = [{ key: start.key, f: 0, g: 0 }];
    let close = {};
    let final;
    let action = [];
    while (open.length) {
      let q = open.reduce(
        (acc, next, i) => {
          if (next.f < acc.f) return { ...next, i };
          return acc;
        },
        { f: Infinity, i: -1 }
      );
      if (q.i === -1) break;
      if (q.key === goal) {
        final = q;
        break;
      }
      action.push({ key: q.key, color: "EXPLORED" });
      open.splice(q.i, 1);
      for (let v of this._graph.getAdjacent(q, mode, distance)) {
        const { through, value } = v[1];
        v = v[0];
        const h = !distance ? v.h || 0 : this._graph.getDistance(v.key, goal);
        const g = value + q.g;
        const f = h + g;
        console.log(f, g, h);

        const inClose = close[v.key];
        if (!inClose || (inClose && inClose.f > f)) {
          const inOpen = detail[v.key];
          if (!inOpen || (inOpen && inOpen.f > f)) {
            open.push({ key: v.key, f, g, predecessor: q, through });
            detail[v.key] = { key: v.key, f, g, predecessor: q, through };
            action.push({
              key: v.key,
              color: "VISITED",
              text: [
                { text: f, offsetX: 0, offsetY: 2 },
                { text: h, offsetX: 0, offsetY: 10 },
                { text: g, offsetX: 6, offsetY: 10 }
              ]
            });
          }
        }
      }
      if (final) break;
      close[q.key] = q;
    }
    if (final) {
      let path = final;
      while (path) {
        action.push({ key: path.key, color: "PATH" });
        if (path.through)
          action.push({ key: path.through, color: "PATH", type: "ARC" });
        path = path.predecessor;
      }
    }
    return action;
  }
}

self.onmessage = ({
  data: [algo, { node, arc, start, end }, distance, type = 0]
}) => {
  if (!Object.keys(node).length) self.postMessage([]);
  let search;
  switch (algo) {
    case "dfs":
      search = new DepthFirstSearch({ node, arc });
      break;
    case "a-star":
      search = new AStar({ node, arc });
      break;
    case "dijkstras":
      search = new Dijkstras({ node, arc });
      break;
    default:
      search = new BreadthFirstSearch({ node, arc });
  }
  if (node[start] === undefined) start = Object.keys(node)[0];
  if (node[end] === undefined)
    end = Object.keys(node)[Object.keys(node).length - 1];
  const action = search.search(start, end, distance, type);
  // console.log(JSON.stringify(action));
  self.postMessage(action);
};