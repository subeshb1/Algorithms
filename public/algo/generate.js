const generateList = (x, n) => {
  switch (n) {
    case 1:
      return new Array(x).fill(1).map((_, i) => ({
        height: (i + 1) * 10,
        x: i * 10,
        y: x * 10 - (i + 1) * 10,
        key: i
      }));
    case 2:
      return new Array(x).fill(1).map((_, i) => {
        const k = x - i - 1;
        return {
          height: (k + 1) * 10,
          x: i * 10,
          y: x * 10 - (k + 1) * 10,
          key: i
        };
      });
    case 3:
      let arr = new Array(x).fill(1).map((_, i) => i + 1);
      return new Array(x).fill(1).map((_, i) => {
        let item = Math.floor(Math.random() * arr.length);
        const [height] = arr.splice(item, 1);
        return {
          height: height * 10,
          // x: i * 10,
          y: x * 10 - height * 10
          // key: i
        };
      });
    default:
      return [];
  }
};

self.onmessage = e => {
  let list = generateList(e.data[0], e.data[1]);
  self.postMessage(list);
};
