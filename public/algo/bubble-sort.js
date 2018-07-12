class BubbleSort {
  constructor(list) {
    this._list = new List([...list]);
  }

  sort(compare) {
    let length = this._list.list.length;
    let action = [];

    for (let i = length - 1; i > 0; i--) {
      for (let j = 0; j < i; j++) {
        action.push({
          type: "LIST_COMPARE",
          payload: [j, j + 1]
        });
        if (compare(this._list.at(j), this._list.at(j + 1))) {
          this._list.swap(j, j + 1);
          action.push({
            type: "LIST_SWAP",
            payload: [j, j + 1]
          });
        }
      }
    }
    return action;
  }
}
