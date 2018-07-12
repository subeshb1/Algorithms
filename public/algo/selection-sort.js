 class SelectionSort {
    constructor(list) {
        this._list = new List([...list]);

    }

    sort(compare) {
        let length = this._list.list.length;
        let action = [];
        for(let i = 0 ; i < length; i++ ) {
            for(let j = i+1; j < length; j++) {
                action.push({
                    type:"LIST_COMPARE",
                    payload:[i,j]
                })
                if(compare(this._list.at(i),this._list.at(j))) {
                    this._list.swap(i,j);
                    action.push({
                        type:"LIST_SWAP",
                        payload:[i,j]
                    })
                }
            }
        }
        console.log(this._list.list);
        return action;
    }

}