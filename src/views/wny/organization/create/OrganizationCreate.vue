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

    const alphaSpaceDotCommaHyphen = (value) => {
        if (typeof value === 'undefined' || value === null || value === '') {
            return true
        }
        return /^[0-9a-zA-Z #,.-]*$/.test(value)
    };

    const alphaSpace = (value) => {
        if (typeof value === 'undefined' || value === null || value === '') {
            return true
        }
        return /^[a-zA-Z #]*$/.test(value)
    };

    import {required, minLength, maxLength, numeric} from 'vuelidate/lib/validators'
    import store from "../../../../store";

    export default {
        name: 'OrganizationCreate',
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
                let optionsArr = [
                    {value: 0, text: "This is parent organization"}
                ];

                trick = this.formatNames(trick);

                trick.forEach(function (item, index, array) {
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
                return a.order > b.order;
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
            status(validation) {
                return {
                    error: validation.$error,
                    dirty: validation.$dirty
                }
            },
            checkForm: function (e) {
                // validation
                // this.errors = [];
                //
                // if (!this.name) {
                //     this.errors.push('Name is required.');
                // }
                //
                // if (!this.order) {
                //     this.errors.push('Order is required.');
                // }
                //
                // if (!this.errors.length && !this.error.length) {
                //     this.create();
                //     return true;
                // }

                console.log("Submit Create.");
                this.$v.$touch();
                if (this.$v.$invalid) {
                    this.submitStatus = "Error";
                    this.errors.push('Field requirements not satisfied. See, please red fields.')
                } else {
                    this.create();
                    this.submitStatus = "Creating";
                    console.log("submitStatus: " + this.submitStatus)
                    return true
                }

                console.log("submitStatus: " + this.submitStatus)
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
