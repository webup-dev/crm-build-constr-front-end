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
              <div class="card-header-actions">
                <!--                <a href="https://bootstrap-vue.js.org/docs/components/badge" class="card-header-action" rel="noreferrer noopener" target="_blank">-->
                <!--                  <small class="text-muted">docs</small>-->
                <!--                </a>-->
              </div>
            </div>
            <div>
              <a href="#/admin/user-profiles/soft-deleted"><p>Users
                <b-badge>{{ usersSoftDeleted  + ' ' + this.$store.state.user.name}}</b-badge>
              </p></a>
              <a href="#/admin/customers/soft-deleted"><p>Customers
                <b-badge>{{ customersSoftDeleted }}</b-badge>
              </p></a>
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
        name: 'DashboardDeveloper',
        data: function() {
            return {
                customersSoftDeleted: '',
                usersSoftDeleted: ''
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
                .then(response => (
                    this.usersSoftDeleted = response.data.data[0].count,
                    this.customersSoftDeleted = response.data.data[1].count
                ));
        }
    }
</script>
