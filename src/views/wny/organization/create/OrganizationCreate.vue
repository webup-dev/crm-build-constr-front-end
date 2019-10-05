<template>
  <div class="animated fadeIn">
    <b-row>
      <b-col md="6">
        <b-card>
          <div slot="header">
            <strong>Create Organization</strong>
          </div>
          <b-form
            @submit.prevent=checkForm
            novalidate=novalidate
          >
            <div class="alert alert-danger" v-if="errors.length">
              <b>Correct, please the following error(s):</b>
              <ul>
                <li v-for="item in errors">{{ item }}</li>
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
              label="Order in ths Structure"
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
              <b-button
                type="submit"
                size="sm"
                variant="primary">
                <i class="fa fa-dot-circle-o"></i> Submit
              </b-button>
              <b-button type="reset" size="sm" variant="danger" v-bind:href="'#/admin/organization'"><i
                class="fa fa-ban"></i> Reset
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

    const alphaNumSpace = (value) => {
        if (typeof value === 'undefined' || value === null || value === '') {
            return true
        }
        return /^[0-9a-zA-Z #]*$/.test(value)
    };

    import {required, minLength, maxLength, numeric} from 'vuelidate/lib/validators'

    export default {
        name: 'OrganizationCreate',
        data() {
            return {
                name: '',
                order: '',
                parentId: 'Please select an option',
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
                console.log(trick);
                let optionsArr = [
                    {value: 0, text: "Select Parent Organization"}
                ];

                trick.forEach(function (item, index, array) {
                    console.log(item.id + " " + item.name)

                    let row = {
                        value: item.id,
                        text: item.name
                    };

                    optionsArr.push(row)
                });
                console.log(optionsArr);

                return optionsArr;
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
                    name: this.name,
                    order: this.order,
                    parent_id: this.parentId
                };

                console.log(dataPost);
                this.$http.post('/organizations', dataPost, headers)
                    .then(request => this.organizationsCreatingSuccessful(request))
                    .catch((request) => this.organizationsCreatingFailed(request));
            },

            organizationsCreatingSuccessful(req) {
                this.errors = false;
                this.error = false;
                this.flash('New Organization created.', 'success');

                this.$router.replace(this.$route.query.redirect || '/admin/organization')
            },

            organizationsCreatingFailed(req) {
                this.errors = false;
                this.error = 'Organization Creating failed! ' + req;
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
                    this.optionsApi = response.data.data
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
