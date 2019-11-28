<template>
  <div className="animated">
    <b-card>
      <flash-message></flash-message>

      <b-card-header>
        <i class="icon-menu mr-1"></i>Soft Deleted Organizations
        <a href="#" class="badge badge-danger">Module Organizations</a>

        <!--        <a v-bind:href="'/#/admin/organization/show'" class="badge badge-info" style="margin-left: 20px">Show WNY-->
        <!--          Structure</a>-->
        <!--        <a v-bind:href="'/#/admin/organization/2/show'" class="badge badge-info" style="margin-left: 20px">Show Spring-->
        <!--          Structure</a>-->

        <div class="card-header-actions"></div>
      </b-card-header>
      <b-card-body>
        <v-client-table :columns="columns" :data="data" :options="options" :theme="theme" id="dataTable">
          <p slot="superName" slot-scope="props">
            {{props.row.name}} <br>
            <span style="color: red;">{{props.row.subline}}</span></p>
          <p slot="actions" slot-scope="props">
            <a class="icon-action-undo action-icon" v-on:click="restoreOrganization(props.row.id)"
               style="cursor: pointer"></a>
            <a class="icon-trash" v-on:click="permanentDeleteOrganization(props.row.id)" style="cursor: pointer"></a>
          </p>
        </v-client-table>
      </b-card-body>
    </b-card>
  </div>
</template>

<script>
    import Vue from 'vue'
    import {ClientTable, Event} from 'vue-tables-2'
    import _ from 'lodash'

    const API_URL = process.env.VUE_APP_API_URL;
    Vue.use(ClientTable);

    export default {
        name: 'OrganizationsSoftDeleted',
        components: {
            ClientTable,
            Event
        },
        data: function () {
            return {
                columns: ['id', 'superName', 'parent_id', 'order', 'actions'],
                data: [],
                message: '',
                success: false,
                options: {
                    headings: {
                        id: 'Item ID',
                        superName: 'Name',
                        parent_id: 'Parent',
                        order: "Order",
                        actions: 'Actions'
                    },
                    sortable: ['id', 'name', 'parent_id'],
                    filterable: ['id', 'name', 'parent_id'],
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
            restoreOrganization: function (organizationId) {
                let headers = {
                    headers: {
                        'Accept': 'application/json',
                        'Authorization': 'Bearer ' + localStorage.token
                    }
                };

                this.$http.put(API_URL + '/organizations/' + organizationId + '/restore', headers)
                    .then(request => this.organizationRestoringSuccessful(request))
                    .catch((request) => this.organizationRestoringFailed(request));

            },
            organizationRestoringSuccessful(req) {
                this.errors = false;
                this.error = false;
                this.flash('The Organization is restored.', 'success');

                this.downloadData();
                // this.$router.replace(this.$route.query.redirect || '/admin/user-profiles')
            },

            organizationRestoringFailed(req) {
                this.errors = false;
                this.flash(req.response.data.message + " Status code: " + req.response.data.code, 'error');
            },
            permanentDeleteOrganization: function (organizationId) {
                let headers = {
                    headers: {
                        'Accept': 'application/json',
                        'Authorization': 'Bearer ' + localStorage.token
                    }
                };

                this.$http.delete(API_URL + '/organizations/' + organizationId + '/permanently', headers)
                    .then(request => this.organizationDeletingSuccessful(request))
                    .catch((request) => this.organizationDeletingFailed(request));
            },
            organizationDeletingSuccessful(req) {
                this.errors = false;
                this.error = false;
                this.flash('The Organization is deleted permanently.', 'success');

                this.downloadData();
            },
            organizationDeletingFailed(req) {
                this.errors = false;
                this.flash(req.response.data.message + " Status code: " + req.response.data.code, 'error');
            },
            downloadData() {
                let headers = {
                    headers: {
                        'Accept': 'application/json',
                        'Authorization': 'Bearer ' + localStorage.token
                    }
                };

                this.$http.get(API_URL + '/organizations/soft-deleted', headers)
                    .then(response => {
                        if (response.status === 204) {
                            console.log('204');
                            this.data = [];
                        } else {
                            this.data = response.data.data;
                            this.message = response.data.message;
                            this.success = response.data.success;
                        }
                    })
                    .catch(error => console.log(error));

                console.log(this.data);
            },
            formatColumnName(source) {
                let min = this.findMinLevel(source);
                // cycle over data
                // we add the new field "subname" in each object
                // subname adds all parents names
                console.log("formatColumnName. source:");
                console.log(source);
                source.forEach(function (item, index, array) {
                    item.subname = '';
                    let tempItem = _.clone(item);
                    console.log(tempItem);
                    let parent_id = item.parent_id;
                    while (tempItem.parent_id !== null && tempItem.level !== min) {
                        // find item with id = parent_id
                        let itemParent = source.find(x => x.id === parent_id);
                        item.subname = itemParent.name + ':' + item.subname;
                        tempItem = _.clone(itemParent);

                        parent_id = tempItem.parent_id;
                    }
                    if (item.subname !== '') {

                        item.subname += item.name;
                    }
                });
                console.log("formatColumnName. output:");
                console.log(source);

                return source
            },
            findMinLevel(arr) {
                let min = arr[0].level;

                for (let i = 1, len = arr.length; i < len; i++) {
                    let v = arr[i].level;
                    min = (v < min) ? v : min;
                }

                return min;
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
