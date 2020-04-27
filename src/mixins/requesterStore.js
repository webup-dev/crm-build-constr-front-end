export default {
  methods: {
    checkForm(keyWord, e) {
      this.errors = [];

      if (!this.$v.firstName.name) {
        this.errors.push('Name consists of letters, hyphen, apostrophe and space only.');
      }

      if (!this.$v.lastName.name) {
        this.errors.push('Name consists of letters, hyphen, apostrophe and space only.');
      }

      if (!this.$v.prefix.namePrefix) {
        this.errors.push('Name consists of letters, slash, dot, comma, hyphen, apostrophe and space only.');
      }

      if (!this.$v.suffix.namePrefix) {
        this.errors.push('Name consists of letters, slash, dot, comma, hyphen, apostrophe and space only.');
      }

      if (!this.$v.organizationId.required) {
        this.errors.push('Organization is required.');
      }

      if (!this.$v.organizationId.integer) {
        this.errors.push('Wrong set of organizations.');
      }

      if (!this.$v.emailWork.email) {
        this.errors.push('Wrong Email Work.');
      }

      if (!this.$v.emailPersonal.email) {
        this.errors.push('Wrong Email Personal.');
      }

      if (!this.$v.addressLine1.required) {
        this.errors.push('Address Line 1 is required.');
      }

      if (!this.$v.addressLine1.address) {
        this.errors.push('Address Line 1 consist of digits, slash, comma, dot, number, hyphen');
      }

      if (!this.$v.addressLine2.address) {
        this.errors.push('Address Line 2 consist of alphas, digits, slash, comma, dot, number, hyphen');
      }

      if (!this.$v.city.required) {
        this.errors.push('City is required.');
      }

      if (!this.$v.city.city) {
        this.errors.push('City consist of alphas, space, hyphen, apostrophe');
      }

      if (!this.$v.zip.required) {
        this.errors.push('Postal Code is required.');
      }

      if (!this.$v.state.required) {
        this.errors.push('State is required.');
      }

      if (!this.$v.zip.usaZip) {
        this.errors.push('ZIP consist of 5 digits');
      }

      if (!this.$v.website.url) {
        this.errors.push('Website must be URL');
      }

      if (!this.$v.otherSource.alphaNumSpaceDotCommaHyphenApostrophe) {
        this.errors.push('Other source consist of alphas, digits, slash, comma, dot, number, hyphen');
      }

      if (!this.$v.note.alphaNumSpaceDotCommaHyphenApostrophe) {
        this.errors.push('Note consist of alphas, digits, slash, comma, dot, number, hyphen');
      }

      if (!this.errors.length && !this.error.length) {
        if (keyWord === 'save') {
          this.create();
          return true;
        }
      }

      if (!this.errors.length && !this.error.length) {
        if (keyWord === 'saveAndNew') {
          this.saveAndNew();
          return true;
        }
      }

      e.preventDefault();
    }
  }
}
