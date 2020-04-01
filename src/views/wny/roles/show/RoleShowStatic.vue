<template>
  <div class="animated fadeIn">
    <b-row>
      <b-col md="6">
        <b-card>
          <div slot="header">
            <strong>Show Role</strong>
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
              label="roleName"
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
              <b-button type="reset" size="sm" variant="danger" href="#/roles/index"><i class="fa fa-ban"></i>
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
        name: 'RoleShowStatic',
        data() {
            return {
                id: 1,
                roleName: "Role Name 1",
                description: "Role Description",
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
