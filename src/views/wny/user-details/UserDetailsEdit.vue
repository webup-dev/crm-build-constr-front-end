<template>
  <div>
    <b-row>
      <b-col md="8">
        <b-card>
          <div slot="header">
            <strong>User Details</strong>
          </div>
            <edit-details></edit-details>
        </b-card>
      </b-col>
    </b-row>
  </div>
</template>

<script>
  import Vue from 'vue';
  import EditDetails from "../../../components/EditDetails";
  import {getDetails} from "../../../api/getDetails";

  export default {
    name: "UserDetailsEdit",
    components: {
      EditDetails
    },
    data() {
      return {
        userDetailsForEditing: {}
      }
    },
    methods: {
      downloadData() {
        getDetails(this.$route.params.id)
          .then(response => {
            this.userDetailsForEditing = response.data.data;
            this.message = response.data.message;
            this.success = response.data.success;
          })
          .catch(error => console.log(error));
      }
    },
    mounted() {
      this.downloadData();
    }
  }
</script>

<style scoped>

</style>
