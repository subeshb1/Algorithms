importScripts(
  "list.js",
  "merge-sort.js",
  "selection-sort.js",
  "bubble-sort.js",
  "heap-sort.js",
  "quick-sort.js"
);

self.onmessage = e => {
  let algo;
  let cmp;
  switch (e.data[0]) {
    case "selection-sort":
      algo = new SelectionSort(e.data[1]);
      cmp = (a, b) => a.height > b.height;
      break;
    case "quick-sort":
      algo = new QuickSort(e.data[1]);
      cmp = (a, b) => a.height > b.height;
      break;
    case "merge-sort":
      algo = new MergeSort(e.data[1]);
      cmp = a => a.height;
      break;
    case "heap-sort":
      algo = new HeapSort(e.data[1]);
      cmp = a => a.height;
      break;
    default:
      algo = new BubbleSort(e.data[1]);
      cmp = (a, b) => a.height > b.height;
      break;
  }

  self.postMessage(algo.sort(cmp));
};
