<template>
  <div>
    <div slot="header">
      <strong>Users</strong>
    </div>
    <div class="row">
      <div class="col-12">
          <div class="row" v-for="item in users" style="margin-bottom: 10px;">
            <div class="col-2">
              ID:  {{item.id}}
            </div>
            <div class="col-6">
              {{ item.name }}
            </div>
            <div class="col-4">
              <button v-if="item.detailsExist != true" class="btn btn-success">Add Details</button>
            </div>
          </div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: "CustomerUsers",
    props: ['users'],
    data: function () {
      return {}
    }
  }
</script>

<style scoped>
  .bold {
    font-weight: bold;
  }
</style>
