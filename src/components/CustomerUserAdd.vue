<template>
  <div>
    <b-form
      id="formAddUser"
      style="display: none;"
      @submit.prevent=checkForm
      novalidate=novalidate
    >
      <div class="alert alert-danger" v-if="errors.length">
        <b>Correct, please the following error(s):</b>
        <ul>
          <li v-for="error in errors" v-bind:key="error">{{ error }}</li>
        </ul>
      </div>
      <div class="alert alert-danger" v-if="error">
        {{ error }}
      </div>
      <b-form-group
        label="User Email"
        label-for="email"
        :label-cols="3"
      >
        <b-form-input
          id="email"
          v-model="$v.email.$model"
          type="text"
          :class="status($v.email)">

        </b-form-input>
      </b-form-group>

      <div slot="footer">
        <b-button type="submit"
                  variant="primary"
                  style="margin-right: 10px">
          Save User
        </b-button>
        <b-button type="reset"
                  variant="danger"
                  v-on:click="closeForm">
          Cancel
        </b-button>
      </div>
    </b-form>
    <button id="btnAddUser" class="btn btn-success" v-on:click="showForm">Add User to this Customer</button>
  </div>
</template>

<script>
  import {validations} from '../components/validations/customerUserAdd';

  export default {
    // name: "CustomerUserAdd"
    name: "CustomerUserAdd",
    data: function () {
      return {
        errors: [],
        error: '',
        email: '',
        success: false
      }
    },
    validations: validations,
    methods: {
      showForm() {
        let formAddUser = document.getElementById('formAddUser');
        formAddUser.style.display = 'block';

        let btnAddUser = document.getElementById('btnAddUser');
        btnAddUser.style.display = 'none';
      },
      closeForm() {
        let formAddUser = document.getElementById('formAddUser');
        formAddUser.style.display = 'none';

        let btnAddUser = document.getElementById('btnAddUser');
        btnAddUser.style.display = 'block';
      },
      status(validation) {
        return {
          error: validation.$error,
          dirty: validation.$dirty
        }
      },
      checkForm: function (e) {
        // validation
        this.errors = [];

        // email
        if (!this.$v.email.required) {
          this.errors.push('User Email is required.');
        }

        // email
        if (!this.$v.email.email) {
          this.errors.push('User Email must be email.');
        }

        if (!this.errors.length && !this.error.length) {
            this.create();
            return true;
        }

        e.preventDefault();
      },
      create() {
        let headers = {
          headers: {
            'Accept': 'application/json',
            'Authorization': 'Bearer ' + localStorage.token
          }
        };

        let dataPost = {
          email: this.email,
          customer_id: this.$route.params.id
        };

        this.$http.post('/user-customers', dataPost, headers)
            .then(() => this.createSuccess())
            .catch((request) => this.createFail(request));
      },
      createSuccess() {
        this.errors = false;
        this.error = false;
        this.success = true;
        this.$emit('new-customer-user-created', true);
        this.closeForm();
        this.flash('New Customer\'s User is created.', 'success');

        this.$router.replace(this.$route.query.redirect || '/admin/customers/' + this.$route.params.id + '/show');
      },

      createFail(req) {
        this.errors = false;
        this.error = 'New Customer\'s User Creating failed! ' + req;
        this.success = false;
        console.log(req);
      }
    }
  }
</script>

<style scoped>
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
