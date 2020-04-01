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
              <i class="fa fa-align-justify"></i><strong> Soft-Deleted</strong>
              <div class="card-header-actions"></div>
            </div>
            <div>
              <a href="#/admin/user-profiles/soft-deleted">
                <p>Users
                  <b-badge>{{ usersSoftDeleted }}</b-badge>
                </p>
              </a>
              <a href="#/admin/customers/soft-deleted">
                <p>Customers
                  <b-badge>{{ customersSoftDeleted }}</b-badge>
                </p>
              </a>
              <a href="#/admin/user-customers/soft-deleted">
                <p>User-Customers
                  <b-badge>{{ userCustomersSoftDeleted }}</b-badge>
                </p>
              </a>
              <a href="#/admin/organizations/soft-deleted">
                <p>Organizations
                  <b-badge>{{ organizationsSoftDeleted }}</b-badge>
                </p>
              </a>
              <a href="#/admin/files/soft-deleted">
                <p>Files
                  <b-badge>{{ filesSoftDeleted }}</b-badge>
                </p>
              </a>
              <a href="#/admin/lead-source-categories/soft-deleted">
                <p>Lead Sources
                  <b-badge>{{ lsCategoriesSoftDeleted }}</b-badge>
                </p>
              </a>
              <a href="#/admin/lead-sources/soft-deleted">
                <p>Lead Sources
                  <b-badge>{{ leadSourcesSoftDeleted }}</b-badge>
                </p>
              </a>
            </div>
          </b-card>
        </b-col>
      </b-row>
    </div>

  </div>

</template>

<script>
  const API_URL = process.env.VUE_APP_API_URL;
  const VUE_APP_FLASH_TIMEOUT = process.env.VUE_APP_FLASH_TIMEOUT;

  export default {
    name: 'DashboardDeveloper',
    data: function () {
      return {
        customersSoftDeleted: '',
        usersSoftDeleted: '',
        userCustomersSoftDeleted: '',
        organizationsSoftDeleted: '',
        filesSoftDeleted: '',
        lsCategoriesSoftDeleted: '',
        leadSourcesSoftDeleted: ''
      }
    },

    mounted() {
      let headers = {
        headers: {
          'Accept': 'application/json',
          'Authorization': 'Bearer ' + localStorage.token
        }
      };

      this.$http.get(API_URL + '/soft-deleted-items', headers)
          .then(response => {
            return (
              this.usersSoftDeleted = response.data.data[0].count,
                this.customersSoftDeleted = response.data.data[1].count,
                this.organizationsSoftDeleted = response.data.data[2].count,
                this.userCustomersSoftDeleted = response.data.data[3].count,
                this.filesSoftDeleted = response.data.data[4].count,
                this.lsCategoriesSoftDeleted = response.data.data[5].count,
                this.leadSourcesSoftDeleted = response.data.data[6].count
            );
          });
    }
  }
</script>
