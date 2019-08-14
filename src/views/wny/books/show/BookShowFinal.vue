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
              label="Book ID"
              label-for="id"
              :label-cols="3"
            >
              <b-form-input
                plaintext
                id="id"
                v-model.number="id"
                type="number">
              </b-form-input>
            </b-form-group>
            <b-form-group
              label="Title"
              label-for="title"
              :label-cols="3"
            >
              <b-form-input
                plaintext
                id="title"
                v-model="title"
                type="text"
                autocomplete="title">
                {{title}}
              </b-form-input>
            </b-form-group>
            <b-form-group
              label="Author"
              label-for="author_name"
              :label-cols="3"
            >
              <b-form-input
                plaintext
                id="author_name"
                v-model="author_name"
                type="text"
                placeholder="Author Name">

              </b-form-input>
            </b-form-group>
            <b-form-group
              label="Pages Count"
              label-for="pages_count"
              :label-cols="3"
            >
              <b-form-input
                plaintext
                id="pages_count"
                v-model.number="pages_count"
                type="number"
                placeholder="XXX">
              </b-form-input>
            </b-form-group>
            <b-form-group
              label="Creator"
              label-for="user_id"
              :label-cols="3"
            >
              <b-form-input
                plaintext
                id="user_id"
                v-model="user_id"
                type="text"
                value="Username">

              </b-form-input>
            </b-form-group>
            <div slot="footer">
              <b-button
                type="submit"
                size="sm"
                variant="primary">
                <i class="fa fa-dot-circle-o"></i> Submit
              </b-button>
              <b-button type="reset" size="sm" variant="danger" href="#/demo/books-final"><i class="fa fa-ban"></i>
                Reset
              </b-button>
            </div>
          </b-form>
        </b-card>
      </b-col>
    </b-row>
  </div>
</template>

<script>
    import Vue from 'vue'

    const API_URL = process.env.VUE_APP_API_URL;
    console.log(localStorage.token);
    // console.log($route.params.id);

    export default {
        name: 'BookShowFinal',
        data() {
            return {
                id: this.$route.params.id,
                title: '',
                author_name: '',
                pages_count: 0,
                user_id: 0,
                created_at: '',
                updated_at: '',
                error: false,
                errors: []
            }
        },
        mounted() {
            this.$http.get(API_URL + '/book/' + this.$route.params.id)
                .then(response => (
                    this.title = response.data.data.title,
                    this.author_name = response.data.data.author_name,
                    this.pages_count = response.data.data.pages_count,
                    this.user_id = response.data.data.user_name
                ))
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
