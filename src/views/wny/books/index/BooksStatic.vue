<template>
  <div className="animated">
    <b-card>
      <b-card-header>
        <i class="icon-menu mr-1"></i>Book Index
        <a href="https://coreui.io/pro/vue/" class="badge badge-danger">Demo Module Static</a>
        <div class="card-header-actions">
          <a
            href="https://github.com/vadis2/helper/blob/master/vuejs/admin-template/coreUI/components/03-table-static.md"
            rel="noopener noreferrer" target="_blank" className="card-header-action">
            <small className="text-muted">docs</small>
          </a>
        </div>
      </b-card-header>
      <b-card-body>
        <v-client-table :columns="columns" :data="data" :options="options" :theme="theme" id="dataTable">
          <!--          <a slot="uri" slot-scope="props" target="_blank" :href="props.row.uri" class="icon-eye"></a>-->

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
    import sampleData from './_data'
    import BCard from 'bootstrap-vue/es/components/card/card'
    import BCardHeader from 'bootstrap-vue/es/components/card/card-header'
    import BCardBody from 'bootstrap-vue/es/components/card/card-body'

    const VUE_APP_FLASH_TIMEOUT = process.env.VUE_APP_FLASH_TIMEOUT;

    Vue.use(ClientTable)

    export default {
        name: 'BooksStatic',
        components: {
            ClientTable,
            Event,
            BCard,
            BCardHeader,
            BCardBody
        },
        data: function () {
            return {
                columns: ['id', 'title', 'author_name', 'actions'],
                data: sampleData,
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
