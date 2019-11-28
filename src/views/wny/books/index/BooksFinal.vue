<template>
  <div className="animated">
    <b-card>
      <flash-message></flash-message>

      <b-card-header>
        <i class="icon-menu mr-1"></i>Book Index
        <a href="#" class="badge badge-danger">Demo Module Final</a>

        <div class="card-header-actions"></div>
      </b-card-header>
      <b-card-body>
        <a href="/#/demo/create" class="btn btn-warning" style="float: right">Create Book</a>
        <v-client-table :columns="columns" :data="data" :options="options" :theme="theme" id="dataTable">
          <p slot="actions" slot-scope="props">
            <a :href="'#/demo/books/' + props.row.id" class="icon-eye action-icon"></a>
            <a :href="'#/demo/books/' + props.row.id + '/edit'" class="icon-pencil action-icon"></a>
            <a class="icon-trash" v-on:click="deleteBook(props.row.id)"></a>
          </p>

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
    Vue.use(ClientTable)

    export default {
        name: 'Books',
        components: {
            ClientTable,
            Event
        },
        data: function () {
            return {
                columns: ['id', 'title', 'author_name', 'actions'],
                data: [],
                message: '',
                success: false,
                res: [],
                options: {
                    headings: {
                        id: 'ID',
                        title: 'Title',
                        author_name: 'Author Name',
                        actions: 'Actions'
                    },
                    sortable: ['title', 'author_name'],
                    filterable: ['title', 'author_name'],
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
            deleteBook: function (bookId) {
                let headers = {
                    headers: {
                        'Accept': 'application/json',
                        'Authorization': 'Bearer ' + localStorage.token
                    }
                };

                this.$http.delete(API_URL + '/book/' + bookId, headers)
                    .then(request => this.bookDeletingSuccessful(request))
                    .catch((request) => this.bookDeletingFailed(request));
            },
            bookDeletingSuccessful(req) {
                this.errors = false;
                this.error = false;
                this.flash('The Book is deleted.', 'success');

                this.downloadData();
            },
            bookDeletingFailed(req) {
                this.errors = false;
                this.error = 'Book Deleting failed! ' + req;
                console.log(req);
            },
            downloadData() {
                let headers = {
                    headers: {
                        'Accept': 'application/json',
                        'Authorization': 'Bearer ' + localStorage.token
                    }
                };
                this.$http.get(API_URL + '/book', headers)
                    .then(response => {
                        this.data = response.data.data;
                        this.message = response.data.message;
                        this.success = response.data.success;
                        console.log(this.message);
                        console.log(this.status);
                    })
                    .catch(error => console.log(error));
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
