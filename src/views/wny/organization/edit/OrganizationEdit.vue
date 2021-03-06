<template>
  <div class="animated fadeIn">
    <b-row>
      <b-col md="6">
        <b-card>
          <div slot="header">
            <strong>Edit Organizational Structure Item</strong>
          </div>
          <b-form
            @submit.prevent=checkForm
            novalidate=novalidate
          >
            <div class="alert alert-danger" v-if="errors.length">
              <b>Correct, please the following error(s):</b>
              <ul>
                <li v-for="item in errors" v-bind:key="item">{{ item }}</li>
              </ul>
            </div>
            <div class="alert alert-danger" v-if="error">
              {{ error }}
            </div>
            <b-form-group
              description="Enter, please Name of the Structure Item, e.g. Sales"
              label="Name"
              label-for="name"
              :label-cols="3"
            >
              <b-form-input
                id="name"
                v-model="$v.name.$model"
                :class="status($v.name)"
                type="text"
                placeholder="Accepts only alphabet, numeric, space, # characters">

              </b-form-input>
            </b-form-group>

            <b-form-group
              description="Enter, please Order of the Item (integer)"
              label="Order in the Structure"
              label-for="order"
              :label-cols="3"
            >
              <b-form-input
                id="name"
                v-model="$v.order.$model"
                :class="status($v.order)"
                type="text"
                placeholder="Integer">

              </b-form-input>
            </b-form-group>

            <b-form-group
              label="Parent Structure Item"
              label-for="parent_id"
              :label-cols="3"
            >
              <b-form-select id="parent_id"
                             v-model="parentId"
                             :plain="true"
                             :options=options
                             value="Please select">
              </b-form-select>
            </b-form-group>

            <div slot="footer">
              <b-button type="submit"
                        size="sm"
                        variant="primary">
                <i class="fa fa-dot-circle-o"></i> Save
              </b-button>
              <b-button type="reset"
                        size="sm"
                        variant="danger"
                        v-bind:href="'#/admin/organization'"><i
                class="fa fa-ban"></i> Cancel
              </b-button>
            </div>
          </b-form>
        </b-card>
      </b-col>
    </b-row>
  </div>
</template>

<script>
  const API_URL = process.env.VUE_APP_API_URL;
  const VUE_APP_FLASH_TIMEOUT = process.env.VUE_APP_FLASH_TIMEOUT;

  const alphaNumSpace = (value) => {
    if (typeof value === 'undefined' || value === null || value === '') {
      return true
    }
    return /^[0-9a-zA-Z #]*$/.test(value)
  };

  import {required, minLength, maxLength, numeric} from 'vuelidate/lib/validators'
  import ordDeps from "../../../../mixins/orderedDepartments";

  export default {
    name: 'OrganizationEdit',
    mixins: [ordDeps],
    data() {
      return {
        name: '',
        order: '',
        parentId: '',
        optionsApi: [],
        errors: [],
        myError: false
      }
    },
    validations: {
      name: {
        required,
        minLength: minLength(3),
        alphaNumSpace
      },
      order: {
        required,
        numeric,
        minLength: minLength(1),
        maxLength: maxLength(3)
      }
    },
    computed: {
      options: function () {
        let trick = this.optionsApi;
        let optionsArr = [
          {value: 0, text: "Select Parent Organization"}
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
      parentId: function () {
        let trick = this.optionsApi;
        let pId = trick.find(x => x.id === this.$route.params.id).parent_id;

        console.log('parentId');
        console.log(pId);

        return pId;
      }
    },
    methods: {
      status(validation) {
        return {
          error: validation.$error,
          dirty: validation.$dirty
        }
      },
      checkForm: function (e) {
        // validation
        this.errors = [];

        if (!this.name) {
          this.errors.push('Name is required.');
        }

        if (!this.order) {
          this.errors.push('Order is required.');
        }

        if (!this.errors.length) {
          this.update();
          return true;
        }

        e.preventDefault();
      },
      update() {
        let headers = {
          headers: {
            'Accept': 'application/json',
            'Authorization': 'Bearer ' + localStorage.token
          }
        };

        let dataPost = {
          name: this.name,
          order: this.order,
          parent_id: this.parentId
        };

        this.$http.put('/organizations/' + this.$route.params.id, dataPost, headers)
            .then(() => this.organizationsUpdatingSuccessful())
            .catch((request) => this.organizationsUpdatingFailed(request));
      },

      organizationsUpdatingSuccessful() {
        this.errors = false;
        this.error = false;
        this.flash('Organization is updated.', 'success', {timeout: VUE_APP_FLASH_TIMEOUT});

        this.$router.replace(this.$route.query.redirect || '/admin/organization')
      },

      organizationsUpdatingFailed(req) {
        this.errors = false;
        this.error = 'Organization Updating is failed! ' + req;
        console.log(req);
      },
    },
    created() {
      let headers = {
        headers: {
          'Accept': 'application/json',
          'Authorization': 'Bearer ' + localStorage.token
        }
      };
      this.$http.get(API_URL + '/organizations', headers)
          .then(response => (
            this.optionsApi = this.formatResponse(response.data.data)
          ));
    },
    mounted() {
      let headers = {
        headers: {
          'Accept': 'application/json',
          'Authorization': 'Bearer ' + localStorage.token
        }
      };
      this.$http.get(API_URL + '/organizations/' + this.$route.params.id, headers)
          .then(response => (
            this.name = response.data.data.name,
              this.order = response.data.data.order,
              this.parentId = response.data.data.parent_id
          ));
    }

  }
</script>

<style scoped>
  .fade-enter-active,
  .fade-leave-active {
    transition: opacity 0.5s;
  }

  .fade-enter,
  .fade-leave-to {
    opacity: 0;
  }

  .dirty {
    border-color: #5A5;
    background: #EFE;
  }

  .dirty:focus {
    outline-color: #8E8;
  }

  .error {
    border-color: red;
    background: #FDD;
  }

  .error:focus {
    outline-color: #F99;
  }
</style>
