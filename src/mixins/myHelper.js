export default {
  methods: {
    formatSinglePhone(value) {
      if (value.length !== 10) {
        return value;
      }
      let x = value.replace(/\D/g, '').match(/(\d{0,3})(\d{0,3})(\d{0,4})/);
      value = !x[2] ? x[1] : '(' + x[1] + ') ' + x[2] + (x[3] ? '-' + x[3] : '');
      return value;
    }
  }
};
