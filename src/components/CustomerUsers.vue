<template>
  <div>
    <div slot="header">
      <strong>Users</strong>
    </div>
    <div v-for="item in users">
      <b-form-group
        :label=item.id
        label-for="name"
        :label-cols="5"
        class="bold"
      >
        <b-form-input
          plaintext
          id="name"
          :value=item.name
          type="text">

        </b-form-input>
      </b-form-group>
    </div>
  </div>
</template>

<script>
  export default {
    name: "CustomerUsers",
    props: ['users'],
    data: function () {
      return {

      }
    }
  }
</script>

<style scoped>
  .bold {
    font-weight: bold;
  }
</style>
