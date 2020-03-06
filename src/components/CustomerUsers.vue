<template>
  <div>
    <div slot="header">
      <strong>Users</strong>
    </div>
    <div class="row">
      <div class="col-12">
        <div class="row" v-for="item in users" v-bind:key="item" style="margin-bottom: 10px;">
          <div class="col-2">
            ID: {{item.id}}
          </div>
          <div class="col-6">
            {{ item.name }}
          </div>
          <div class="col-4">
            <a v-if="item.detailsExist != true" v-on:click="addDetails(item.id)" class="btn btn-success">Add Details</a>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: "CustomerUsers",
    props: ['users', 'customer_id'],
    data: function () {
      return {}
    },
    methods: {
      addDetails(id) {
        // this.$emit('add-details', {'customer_id': this.customer_id, 'user_id': id});
        this.$store.commit('setUDCustomerId', this.customer_id);
        this.$store.commit('setUDUserId', id);
        this.$router.push({path: '/admin/user-details/create'})
      }
    }
  }
</script>

<style scoped>
  .bold {
    font-weight: bold;
  }
</style>
