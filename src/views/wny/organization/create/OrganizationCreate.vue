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
                             v-model="$v.parentId.$model"
                             :plain="true"
                             :options=options
                             :class="status($v.parentId)"
                             placeholder="Please select">
              </b-form-select>
            </b-form-group>

            <div slot="footer">
              <b-button
                type="submit"
                size="sm"
                variant="primary">
                <i class="fa fa-dot-circle-o"></i> Save
              </b-button>
              <b-button type="reset" size="sm" variant="danger" v-bind:href="'#/admin/organization'"><i
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

    const alphaSpaceDotCommaHyphen = (value) => {
        if (typeof value === 'undefined' || value === null || value === '') {
            return true
        }
        return /^[0-9a-zA-Z #,.-]*$/.test(value)
    };

    import {required, minLength, maxLength, numeric} from 'vuelidate/lib/validators'
    import orgDeps from "../../../../mixins/orderedDepartments";

    export default {
        name: 'OrganizationCreate',
        mixins: [orgDeps],
        data() {
            return {
                name: '',
                order: '',
                parentId: 'Please select an option',
                optionsApi: [],
                errors: [],
                error: false,
                submitStatus: "Empty"
            }
        },
        validations: {
            name: {
                required,
                minLength: minLength(3),
                alphaSpaceDotCommaHyphen
            },
            order: {
                required,
                numeric,
                minLength: minLength(1),
                maxLength: maxLength(3)
            },
            parentId: {
                required,
                numeric
            }
        },
        computed: {
            options: function () {
                let trick = this.optionsApi;
                console.log(trick)
                let optionsArr = [
                    {value: 0, text: "This is parent organization"}
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
                this.$v.$touch();
                if (this.$v.$invalid) {
                    this.submitStatus = "Error";
                    this.errors.push('Field requirements not satisfied. See, please red fields.')
                } else {
                    this.create();
                    this.submitStatus = "Creating";
                    return true
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
                    .then(() => this.organizationsCreatingSuccessful())
                    .catch((request) => this.organizationsCreatingFailed(request));
            },

            organizationsCreatingSuccessful() {
                this.errors = false;
                this.error = false;
                this.flash('New Organization created.', 'success', {timeout: VUE_APP_FLASH_TIMEOUT});

                this.$router.replace(this.$route.query.redirect || '/admin/organization')
            },

            organizationsCreatingFailed(req) {
                this.errors = false;
                this.error = 'Organization Creating failed! ' + req;
                console.log(req);
            }
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
