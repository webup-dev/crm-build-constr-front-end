<template>
  <div class="wrapper">
    <div class="animated fadeIn">
      <flash-message></flash-message>
      <b-row>
        <b-col cols="12" md="3">
          <b-card
            header-tag="header"
            footer-tag="footer">
<!--            <div slot="header">-->
<!--              <i class="fa fa-align-justify"></i><strong> Soft-Deleted</strong>-->
<!--              <div class="card-header-actions"></div>-->
<!--            </div>-->
<!--            <div>-->
<!--              <a href="#/admin/user-profiles/soft-deleted"><p>Users-->
<!--                <b-badge>{{ usersSoftDeleted }}</b-badge>-->
<!--              </p></a>-->
<!--              <a href="#/admin/customers/soft-deleted"><p>Customers-->
<!--                <b-badge>{{ customersSoftDeleted }}</b-badge>-->
<!--              </p></a>-->
<!--              <a href="#/admin/organizations/soft-deleted"><p>Organizations-->
<!--                <b-badge>{{ organizationsSoftDeleted }}</b-badge>-->
<!--              </p></a>-->
<!--            </div>-->
          </b-card>
        </b-col>
      </b-row>
    </div>

  </div>

</template>

<script>
    const API_URL = process.env.VUE_APP_API_URL;

    export default {
        name: 'DashboardOrganizationGeneralManager',
        data: function() {
            return {

            }
        },

        mounted() {

        }
    }
</script>
