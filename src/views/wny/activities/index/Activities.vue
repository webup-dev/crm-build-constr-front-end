<template>
  <div className="animated">
    <b-card>
      <flash-message></flash-message>

      <b-card-header>
        <i class="icon-menu mr-1"></i>Activities
        <a href="#" class="badge badge-danger">Module Activities</a>

        <div class="card-header-actions"></div>
      </b-card-header>
      <b-card-body>
        <a v-on:click="clearHistory()" class="btn btn-danger" style="float: right">Clear
          History</a>
        <v-client-table :columns="columns" :data="data" :options="options" :theme="theme" id="dataTable">

          <!--<section v-if="props.row.role_names == ''">-->
          <!--          </section>-->

          <!--          <div slot="child_row" slot-scope="props">-->
          <!--            The link to {{props.row.name}} is <a :href="props.row.uri">{{props.row.uri}}</a>-->
          <!--          </div>-->
        </v-client-table>
      </b-card-body>
    </b-card>
  </div>
</template>

<script>
    import Vue from 'vue'
    import {ClientTable, Event} from 'vue-tables-2'

    const API_URL = process.env.VUE_APP_API_URL;
    const VUE_APP_FLASH_TIMEOUT = process.env.VUE_APP_FLASH_TIMEOUT;

    Vue.use(ClientTable)

    export default {
        name: 'Activities',
        components: {
            ClientTable,
            Event
        },
        data: function () {
            return {
                columns: ['id', 'user_id', 'user_name', 'req'],
                data: [],
                message: '',
                success: false,
                options: {
                    headings: {
                        id: 'Activity ID',
                        user_name: 'User Name',
                        req: 'Request'
                    },
                    sortable: ['id', 'user_name'],
                    filterable: ['id', 'user_name'],
                    sortIcon: {base: 'fa', up: 'fa-sort-asc', down: 'fa-sort-desc', is: 'fa-sort'},
                    pagination: {
                        chunk: 5,
                        edge: false,
                        nav: 'scroll'
                    }
                },
                useVuex: false,
                theme: 'bootstrap4',
                template: 'default'
            }
        },
        methods: {
            clearHistory: function () {
                let headers = {
                    headers: {
                        'Accept': 'application/json',
                        'Authorization': 'Bearer ' + localStorage.token
                    }
                };

                this.$http.delete(API_URL + '/activities', headers)
                    .then(() => this.clearHistorySuccessful())
                    .catch((request) => this.clearHistoryFailed(request));
            },
            clearHistorySuccessful() {
                this.errors = false;
                this.error = false;
                this.flash('The History of Activities is cleared.', 'success', {timeout: VUE_APP_FLASH_TIMEOUT});

                this.downloadData();
            },
            clearHistoryFailed(req) {
                this.errors = false;
                this.error = 'The History of Activities Clearing failed! ' + req;
            },
            downloadData() {
                let headers = {
                    headers: {
                        'Accept': 'application/json',
                        'Authorization': 'Bearer ' + localStorage.token
                    }
                };

                this.$http.get(API_URL + '/activities', headers)
                    .then(response => {
                        this.data = response.data.data;
                        this.message = response.data.message;
                        this.success = response.data.success;
                    })
                    .catch(error => console.log(error));

                console.log(this.data);
            }
        },
        mounted() {
            this.downloadData();

        }
    };
</script>

<style lang="scss">
  #dataTable {
    width: 95%;
    margin: 0 auto;

    .VuePagination {
      text-align: center;
      justify-content: center;
    }

    .vue-title {
      text-align: center;
      margin-bottom: 10px;
    }

    .VueTables__search-field {
      display: flex;
    }

    .action-icon {
      margin-right: 10px;
    }

    .VueTables__search-field input {
      margin-left: 0.25rem;
    }

    .VueTables__limit-field {
      display: flex;
    }

    .VueTables__limit-field select {
      margin-left: 0.25rem !important;
    }

    .VueTables__table th {
      text-align: center;
    }

    .VueTables__child-row-toggler {
      width: 16px;
      height: 16px;
      line-height: 16px;
      display: block;
      margin: auto;
      text-align: center;
    }

    .VueTables__child-row-toggler--closed::before {
      content: "+";
    }

    .VueTables__child-row-toggler--open::before {
      content: "-";
    }
  }

</style>
