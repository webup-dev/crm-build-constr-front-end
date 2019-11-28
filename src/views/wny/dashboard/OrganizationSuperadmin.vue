<template>
  <div class="wrapper">
    <div class="animated fadeIn">
      <flash-message></flash-message>
      <b-row>
        <b-col cols="12" md="3">

        </b-col>
      </b-row>
    </div>

  </div>

</template>

<script>
    const API_URL = process.env.VUE_APP_API_URL;

    export default {
        name: 'DashboardDeveloper',
        data: function() {
            return {

            }
        },

        mounted() {

        }
    }
</script>
