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
                <li v-for="error in errors" v-bind:key="error">{{ error }}</li>
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

              </b-form-input>
            </b-form-group>
            <b-form-group
              label="Author"
              label-for="authorName"
              :label-cols="3"
            >
              <b-form-input
                plaintext
                id="authorName"
                v-model="authorName"
                type="text"
                placeholder="Author Name">

              </b-form-input>
            </b-form-group>
            <b-form-group
              label="Pages Count"
              label-for="pagesCount"
              :label-cols="3"
            >
              <b-form-input
                plaintext
                id="pagesCount"
                v-model.number="pagesCount"
                type="number"
                placeholder="XXX">
              </b-form-input>
            </b-form-group>
            <b-form-group
              label="Creator"
              label-for="userId"
              :label-cols="3"
            >
              <b-form-input
                plaintext
                id="userId"
                v-model="userId"
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
  const VUE_APP_FLASH_TIMEOUT = process.env.VUE_APP_FLASH_TIMEOUT;

  export default {
        name: 'BookShowStatic',
        data() {
            return {
                id: this.$route.params.id,
                title: "Book Name 1",
                authorName: "Tom Richards",
                pagesCount: 123,
                userId: 1,
                created_at: "2015-04-24T01:46:50.459583",
                updated_at: "2015-04-24T01:46:50.459593",
                error: false,
                errors: []
            }
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
