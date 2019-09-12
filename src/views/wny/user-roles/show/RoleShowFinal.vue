<template>
  <div class="animated fadeIn">
    <b-row>
      <b-col md="6">
        <b-card>
          <div slot="header">
            <strong>Role</strong>
          </div>
          <b-form
            @submit.prevent=checkForm
            novalidate=novalidate
          >
            <flash-message></flash-message>

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
              label="Role ID"
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
              label="Role Name"
              label-for="roleName"
              :label-cols="3"
            >
              <b-form-input
                plaintext
                id="roleName"
                v-model="roleName"
                type="text"
                autocomplete="roleName">
              </b-form-input>
            </b-form-group>
            <b-form-group
              label="Description"
              label-for="description"
              :label-cols="3"
            >
              <b-form-input
                plaintext
                id="description"
                v-model="description"
                type="text"
                placeholder="Role Description">

              </b-form-input>
            </b-form-group>

            <div slot="footer">
              <b-button
                type="submit"
                size="sm"
                variant="primary"
                v-bind:href="'#/roles/' + id + '/edit'">
                <i class="fa fa-dot-circle-o"></i> Edit
              </b-button>
              <b-button
                type="reset"
                size="sm"
                variant="danger"
                href="#/roles/index">
                <i class="fa fa-ban"></i>
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
    const API_URL = process.env.VUE_APP_API_URL;
    // console.log(localStorage.token);
    // console.log($route.params.id);

    export default {
        name: 'RoleShowFinal',
        data() {
            return {
                id: this.$route.params.id,
                roleName: '',
                description: '',
                created_at: '',
                updated_at: '',
                error: false,
                errors: []
            }
        },
        mounted() {
            this.$http.get(API_URL + '/roles/' + this.$route.params.id)
                .then(response => (
                    this.roleName = response.data.data.name,
                        this.description = response.data.data.description
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
