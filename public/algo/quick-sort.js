 class QuickSort {
  constructor(list) {
    this._list = new List([...list]);
   
  }

  sort(compare) {
    let length = this._list.list.length;
    this.compare = compare;
    this.action = [];

    this.quickSort(0, length - 1);
    this.action.push({type: "LIST_COMPLETE", payload: 1});
    return this.action;
  }

  quickSort(p, r) {
    if (p < r) {
      let q = this.partition(p, r);
      this.quickSort(p, q - 1);
      this.quickSort(q + 1, r);
    }
  }

  partition(p, r) {
    let x = this._list.at(r);
    let i = p - 1;
    this.action.push({type: "LIST_BOUNDARY", payload: [p, r]});
    this.action.push({type: "LIST_SET_PIVOT", payload: -1});
    for (let j = p; j < r; j++) {
      if (this.compare(x, this._list.at(j))) {
        i++;

        this._list.swap(i, j);
        this.action.push({type: "LIST_SWAP", payload: [i, j]})
      }
    }
    i++;
    this.action.push({type: "LIST_SET_PIVOT", payload: i});
    this.action.push({type: "LIST_SWAP", payload: [i, r]});
    this._list.swap(i, r);


    console.log(i, r);
    return i;
  }
}
