importScripts(
  "list.js",
  "merge-sort.js",
  "selection-sort.js",
  "bubble-sort.js",
  "heap-sort.js",
  "quick-sort.js"
);

self.onmessage = e => {
  let a = new MergeSort(e.data);
  self.postMessage(a.sort(a => a.height));
};
