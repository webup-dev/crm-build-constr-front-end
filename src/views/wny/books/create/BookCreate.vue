<template>
  <div class="animated fadeIn">
    <b-row>
      <b-col md="6">
        <b-card>
          <div slot="header">
            <strong>Create Book</strong>
          </div>
          <b-form
            @submit.prevent=checkForm
            novalidate=novalidate
          >
            <div class="alert alert-danger" v-if="errors.length">
              <b>Correct, please the following error(s):</b>
              <ul>
                <li v-for="error in errors">{{ error }}</li>
              </ul>
            </div>
            <div class="alert alert-danger" v-if="error">
              {{ error }}
            </div>
            <b-form-group
              description="Enter, please Book Title."
              label="Title"
              label-for="title"
              :label-cols="3"
            >
              <b-form-input
                id="title"
                v-model="title"
                type="text"
                autocomplete="title">

              </b-form-input>
            </b-form-group>
            <b-form-group
              description="Enter, please Author of the Book"
              label="Author"
              label-for="authorName"
              :label-cols="3"
            >
              <b-form-input
                id="authorName"
                v-model="authorName"
                type="text"
                placeholder="Author Name">

              </b-form-input>
            </b-form-group>
            <b-form-group
              description="Enter, please a number of the Book pages"
              label="Pages Count"
              label-for="pagesCount"
              :label-cols="3"
            >
              <b-form-input
                id="pagesCount"
                v-model.number="pagesCount"
                type="number"
                placeholder="XXX">
              </b-form-input>
            </b-form-group>
            <!--            <b-form-group-->
            <!--              label="Creator"-->
            <!--              label-for="userId"-->
            <!--              :label-cols="3"-->
            <!--            >-->
            <!--              <b-form-input-->
            <!--                plaintext id="userId"-->
            <!--                v-model="userId"-->
            <!--                type="text"-->
            <!--                value="Username">-->

            <!--              </b-form-input>-->
            <!--            </b-form-group>-->
            <div slot="footer">
              <b-button
                type="submit"
                size="sm"
                variant="primary">
                <i class="fa fa-dot-circle-o"></i> Submit
              </b-button>
              <b-button type="reset" size="sm" variant="danger" href="#/demo/books-final"><i class="fa fa-ban"></i> Reset</b-button>
            </div>
          </b-form>
        </b-card>
      </b-col>
    </b-row>
  </div>
</template>

<script>
    const API_URL = process.env.VUE_APP_API_URL;

    export default {
        name: 'BookCreate',
        data() {
            return {
                title: '',
                authorName: '',
                pagesCount: 0,
                errors: [],
                error: false
            }
        },
        // created() {
        //     let headers = {
        //         headers: {
        //             'Accept': 'application/json',
        //             'Authorization': 'Bearer ' + localStorage.token
        //         }
        //     };
        //
        //     this.$http.get('/auth/me', headers)
        //         .then(request => this.meSuccessful(request))
        //         .catch((request) => this.meFailed(request));
        // },
        methods: {
            checkForm: function (e) {
                // validation
                this.errors = [];

                if (!this.title) {
                    this.errors.push('Title is required.');
                }

                if (!this.authorName) {
                    this.errors.push('Author Name is required.');
                }

                if (!this.pagesCount) {
                    this.errors.push('Pages Count is required.');
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

                console.log(headers);
                let dataPost = {
                    title: this.title,
                    author_name: this.authorName,
                    pages_count: this.pagesCount
                };
                this.$http.post('/book', dataPost, headers)
                    .then(request => this.bookCreatingSuccessful(request))
                    .catch((request) => this.bookCreatingFailed(request));
            },

            // meSuccessful(req) {
            //     this.errors = false;
            //     this.error = false;
            //     console.log(req);
            //     this.flash('Successful Login.', 'success');
            // },
            //
            // meFailed(req) {
            //     this.$router.replace('/auth/sign-in');
            //     console.log(req);
            // }
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
</style>
