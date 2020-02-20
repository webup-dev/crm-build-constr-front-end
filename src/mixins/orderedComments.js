export default {
  methods: {
    formatResponse(trick) {
      // change null to 0 in parent_id
      trick = this.nullTo0(trick);

      // Creating of plain copy (arr) of input array of objects
      let arr = this.plainCopyOfObj(trick);

      let hashArr = {};

      for (let i = 0; i < arr.length; i++) {
        if (hashArr[arr[i].parent_id] === undefined) hashArr[arr[i].parent_id] = [];
        hashArr[arr[i].parent_id].push(arr[i]);
      }

      return  this.hierarchySort(hashArr, 0, []);
    },
    nullTo0(trick) {
      // change null to 0 in parent_id
      for (let i = 0; i < trick.length; i++) {
        if (trick[i].parent_id === null) {
          trick[i].parent_id = 0;
        }
      }

      return trick;
    },
    plainCopyOfObj(trick) {
      // Creating of plain copy (arr) of input array of objects
      let arr = [trick.length - 1];
      for (let k = 0; k < trick.length; k++) {
        let obj = {};
        obj.id = trick[k].id;
        obj.parent_id = trick[k].parent_id;
        obj.customer_id = trick[k].customer_id;
        obj.author_id = trick[k].author_id;
        obj.comment = trick[k].comment;
        obj.created_at = trick[k].created_at;
        obj.user = trick[k].user;
        obj.level = trick[k].level;
        obj.marginL = 'margin-left: ' + 40 * (trick[k].level - 1) + 'px';
        arr.push(obj);
      }

      return arr;
    },
    hierarchySortFunc(a, b) {
      if(a.created_at > b.created_at) {
        return 1;
      } else {
        return -1
      }
    },

    hierarchySort(hashArr, key, result) {
      if (hashArr[key] === undefined) return;
      let arr = hashArr[key].sort(this.hierarchySortFunc);
      for (let i = 0; i < arr.length; i++) {
        result.push(arr[i]);
        this.hierarchySort(hashArr, arr[i].id, result);
      }
    console.log('hashArr: ');
    console.log(result);
      return result;
    }
  }
}
