<template>
  <div>
    <b-row>
      <b-col md="8">
        <b-card>
          <div slot="header">
            <strong>User Details</strong>
          </div>
          <add-details></add-details>
        </b-card>
      </b-col>
    </b-row>
  </div>
</template>

<script>
  import AddDetails from "../../../components/AddDetails";

  const VUE_APP_FLASH_TIMEOUT = process.env.VUE_APP_FLASH_TIMEOUT;

  export default {
    name: "RequestersCreate",
    components: {
      AddDetails
    },
    data() {
      return {
      }
    },
    methods: {
      downloadData() {

      }
    },
    mounted() {
      this.downloadData();
    }
  }
</script>

<style scoped>

</style>
