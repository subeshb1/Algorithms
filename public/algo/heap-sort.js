 class HeapSort {
  constructor(list) {
    this._list = new List([...list]);
    this.action = [];
  }

  sort(value) {
    this.value = value;
    this.length = this._list.list.length;
    this.heapSize = this.length;
    this.buildMaxHeap();
    for (let i = this.length - 1; i >= 1; i--) {
      this.heapExtractMax();
    }
    
    return this.action;
  }
  buildMaxHeap() {
    for (let i = parseInt(this.length / 2,10) - 1; i >= 0; i--) this.maxHeapify(i);
  }

  maxHeapify(i) {
    // to get the left child
    let l = 2 * i + 1;
    // to get the right child
    let r = 2 * i + 2;
    // Initially the parent is larger
    let largest = i;
    // Checking if the left child lies in the heap or not and then checking
    // whether it is greater than the parent
    // console.log(this.value(this._list.at(l)),l,i);
    if (
      l < this.heapSize &&
      this.value(this._list.at(l)) > this.value(this._list.at(largest))
    ) {
      largest = l;
    }
    // Checking if the left child lies in the heap or not and then checking
    // whether it is greater than the parent
    if (
      r < this.heapSize &&
      this.value(this._list.at(r)) > this.value(this._list.at(largest))
    ) {
      largest = r;
    }
    // if the largest has no changed no need to heapify
    if (largest !== i) {
      // swap and then recursively heapify the affected sub tree
      this.action.push({
        type:"LIST_SWAP",
        payload:[i,largest]
      })
      this._list.swap(i, largest);
      this.maxHeapify(largest);
    }
  }

  heapExtractMax() {
    if (this.heapSize < 1) throw new TypeError("Heap empty");
    let max = this._list.at(0);
    this.action.push({
      type:"LIST_SWAP",
      payload:[0,this.heapSize-1]
    })
    this._list.swap(0, this.heapSize - 1);
    this.heapSize--;
    this.maxHeapify(0);
    return max;
  }
}
