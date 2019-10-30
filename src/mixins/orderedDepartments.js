export default {
  methods: {
    formatResponse(trick) {
      for (let i = 0; i < trick.length; i++) {
        if (trick[i].parent_id === null) {
          trick[i].parent_id = 0;
        }
      }
    
      // Creating of arr
      let arr = [trick.length - 1];
      for (let k = 0; k < trick.length; k++) {
        let obj = {};
        obj.id = trick[k].id;
        obj.parent_id = trick[k].parent_id;
        obj.name = trick[k].name;
        obj.order = trick[k].order;
        arr.push(obj);
      }
    
      let hashArr = {};
    
      for (let i = 0; i < arr.length; i++) {
        if (hashArr[arr[i].parent_id] === undefined) hashArr[arr[i].parent_id] = [];
        hashArr[arr[i].parent_id].push(arr[i]);
      }
    
      return  this.hierarchySort(hashArr, 0, []);
    },
    formatNames(trick) {
      // change names dependently of level: ---
      const prefix = '|---';
      let currentPrefix = '';
      let lastParent = 1;
      for (let i = 0; i < trick.length; i++) {
        if (trick[i].parent_id === 0) {
          currentPrefix = '';
          lastParent = trick[i].id;
          currentPrefix = prefix;
        } else {
          if (trick[i].parent_id === lastParent) {
            trick[i].name = currentPrefix + " " + trick[i].name;
          } else {
            lastParent = trick[i - 1].id;
            currentPrefix += prefix;
            trick[i].name = currentPrefix + " " + trick[i].name;
          }
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
    
      return result;
    },
    getParents(trick) {
      // Creating of arr
      let arr = [];
      
      for (let i = 0; i < trick.length; i++) {
        if (trick[i].parent_id === null) {
          let obj = {};
          obj.id = trick[i].id;
          obj.parent_id = trick[i].parent_id;
          obj.name = trick[i].name;
          obj.order = trick[i].order;
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
      console.log(trick);
      let optionsArr = [
        {value: 0, text: "Select Organization"}
      ];
    
      trick = this.formatNames(trick);
    
      trick.forEach(function (item, index, array) {
        // console.log(item.id + " " + item.name)
      
        let row = {
          value: item.id,
          text: item.name
        };
      
        optionsArr.push(row)
      });
      // console.log(optionsArr);
    
      // console.log('departmentId:');
      // console.log(trick.find(x => x.id === this.$route.params.id));
    
      return optionsArr;
    },
    parents: function () {
      let trick = this.optionsApi;
      let optionsArr = [];
    
      trick.forEach(function (item, index, array) {
        // console.log(item.id + " " + item.name)
      
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
