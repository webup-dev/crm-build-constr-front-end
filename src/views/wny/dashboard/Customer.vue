<template>
  <div class="wrapper">
    <div class="animated fadeIn">
      <flash-message></flash-message>
      <b-row>
        <b-col cols="12" md="3">
          <b-card
            header-tag="header"
            footer-tag="footer">
            <div slot="header">
              <i class="fa fa-align-justify"></i><strong> Block Header</strong>
              <div class="card-header-actions"></div>
            </div>
            <div>
              Content
            </div>
          </b-card>
        </b-col>
      </b-row>
    </div>

  </div>

</template>

<script>
    const API_URL = process.env.VUE_APP_API_URL;

    export default {
        name: 'DashboardCustomer',
        data: function() {
            return {

            }
        },

        mounted() {

        }
    }
</script>
