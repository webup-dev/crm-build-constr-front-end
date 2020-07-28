export default {
  methods: {
    formatResponse(trick) {
      // change null to 0 in parent_id
      for (let i = 0; i < trick.length; i++) {
        if (trick[i].parent_id === null) {
          trick[i].parent_id = 0;
        }
      }

      // Creating of plain copy (arr) of input array of objects
      let arr = [trick.length - 1];
      for (let k = 0; k < trick.length; k++) {
        let obj = {};
        obj.id = trick[k].id;
        obj.parent_id = trick[k].parent_id;
        obj.name = trick[k].name;
        obj.order = trick[k].order;
        obj.level = trick[k].level;
        arr.push(obj);
      }

      // create temporary arr
      // parent 1 =[]  // empty arr if there is child
      //     child 1
      //     child 2
      // parent 2

      let hashArr = {};

      for (let i = 0; i < arr.length; i++) {
        if (hashArr[arr[i].parent_id] === undefined) hashArr[arr[i].parent_id] = [];
        hashArr[arr[i].parent_id].push(arr[i]);
      }

      return  this.hierarchySort(hashArr, 0, []);
    },
    // formatNames(trick) {
    //   // change names dependently of level: ---
    //   const prefix = '|---';
    //   let currentPrefix = '';
    //   let lastParent = 1;
    //   for (let i = 0; i < trick.length; i++) {
    //     if (trick[i].parent_id === 0) {
    //       currentPrefix = '';
    //       lastParent = trick[i].id;
    //       currentPrefix = prefix;
    //     } else {
    //       if (trick[i].parent_id === lastParent) {
    //         trick[i].name = currentPrefix + " " + trick[i].name;
    //       } else {
    //         lastParent = trick[i - 1].id;
    //         currentPrefix += prefix;
    //         trick[i].name = currentPrefix + " " + trick[i].name;
    //       }
    //     }
    //   }
    //
    //   return trick;
    // },
    formatNames(trick) {
      // change names dependently of level: ---
      const prefix = '|---';
      for (let i = 0; i < trick.length; i++) {
        let n = trick[i].level;
        for (let j = n; j > 0; j--) {
          trick[i].name = prefix + trick[i].name;
        }
      }

      return trick;
    },
    hierarchySortFunc(a, b) {
      if(a.order > b.order) {
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
    console.log('hashArr: ')
    console.log(result)
      return result;
    },
    getParents(trick) {
      // Creating of arr
      let arr = [];

      for (let i = 0; i < trick.length; i++) {
        if (trick[i].level == 1) {
          let obj = {};
          obj.id = trick[i].id;
          obj.parent_id = trick[i].parent_id;
          obj.name = trick[i].name;
          obj.order = trick[i].order;
          obj.level = trick[i].level;
          arr.push(obj);
        }
      }
      console.log("parents:");
      console.log(arr);

      return arr
    }
  },
  computed: {
    options: function () {
      let trick = this.optionsApi;
      let optionsArr = [
        {value: 0, text: "Select Organization"}
      ];

      trick = this.formatNames(trick);

      trick.forEach(function (item) {
        let row = {
          value: item.id,
          text: item.name
        };

        optionsArr.push(row)
      });

      return optionsArr;
    },
    parents: function () {
      let trick = this.optionsApi;
      let optionsArr = [];

      trick.forEach(function (item) {
        let row = {
          value: item.id,
          text: item.name
        };

        optionsArr.push(row)
      });

      return optionsArr;
    }
  }
}
