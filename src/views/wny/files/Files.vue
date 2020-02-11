<template>
  <div class="animated fadeIn">
    <b-card>
      <flash-message></flash-message>
      <b-card-header>
        <i class="icon-menu mr-1"></i>Customer Files

        <div class="card-header-actions"></div>
      </b-card-header>
      <b-card-body>
        <div class="row" >
          <!--        <div class="email-app">-->
          <div class="col-md-3 info-block" style="padding: 10px; border: 1px solid #c8ced3" >
              <!--            <a @click="newFile" class="btn btn-warning btn-block">Create New File</a>-->
              <a class="btn btn-warning btn-block">Create New File</a>
              <customer-info :customer="customer"/>
          </div>
          <div class="col-md-9" style="padding: 10px; border: 1px solid #c8ced3; border-left: 0; ">
              <!--            <b-form id="newComment"-->
              <!--                    :style="{ 'display': disp}"-->
              <!--                    @submit.prevent=checkForm-->
              <!--                    novalidate=novalidate>-->
              <!--              <div class="alert alert-danger" v-if="errors.length">-->
              <!--                <b>Correct, please the following error(s):</b>-->
              <!--                <ul>-->
              <!--                  <li v-for="item in errors">{{ item }}</li>-->
              <!--                </ul>-->
              <!--              </div>-->
              <!--              <div class="alert alert-danger" v-if="error">-->
              <!--                {{ error }}-->
              <!--              </div>-->
              <!--              <h4 v-bind:style="{'display': displayReply}">Reply to the comment:</h4>-->
              <!--              <h4 v-bind:style="{'display': displayEdit}">Edit your comment:</h4>-->
              <!--              <h4 v-bind:style="{'display': displayNew}">Create a new comment:</h4>-->
              <!--              <div class="form-group mt-4" id="newReply" v-bind:style="{'display': displayReply}">-->
              <!--                <b-form-group>-->
              <!--                  <b-form-input plaintext-->
              <!--                                id="replyComment"-->
              <!--                                v-model="$v.parentComment.$model"-->
              <!--                                type="text"-->
              <!--                                class="text-italic">-->

              <!--                  </b-form-input>-->
              <!--                </b-form-group>-->
              <!--                <input type="hidden" name="commentId" :value="commentId">-->
              <!--                <input type="hidden" name="parentId" :value="parentId">-->
              <!--                <input type="hidden" name="parentLevel" :value="parentLevel">-->
              <!--                <input type="hidden" name="level" :value="level">-->
              <!--              </div>-->
              <!--              <textarea class="form-control"-->
              <!--                        id="message"-->
              <!--                        rows="6"-->
              <!--                        placeholder="Enter your comment here, please"-->
              <!--                        v-model="$v.bodyComment.$model"-->
              <!--                        type="text"-->
              <!--                        :class="status($v.bodyComment)">-->
              <!--            </textarea>-->
              <!--              <div class="form-group">-->
              <!--                <b-button class="mr-1"-->
              <!--                          type="submit"-->
              <!--                          variant="success"-->
              <!--                          @click="disp = 'none'">-->
              <!--                  Save-->
              <!--                </b-button>-->
              <!--                <b-button class="mr-1" @click="disp = 'none', bodyComment=''" variant="danger">Cancel</b-button>-->
              <!--              </div>-->
              <!--            </b-form>-->
              <!--            <ul class="messages">-->
              <!--          <span v-for="comment in comments">-->
              <!--          <li class="message" v-bind:style="comment.marginL">-->
              <!--            <a>-->
              <!--              <div class="header">-->
              <!--                <span class="from"><b>{{comment.user.name}}</b></span>-->
              <!--                <span class="date"><span class="fa fa-paper-clip"></span><b> {{ comment.created_at }}</b></span>-->
              <!--              </div>-->
              <!--              <div class="title">-->
              <!--                {{ comment.comment }}-->
              <!--              </div>-->
              <!--              <div>-->
              <!--                <a @click="reply(comment)" style="color: #00aced">Reply </a>-->
              <!--                <a v-if="comment.author_id === store.state.user.id" @click="editComment(comment)" style="color: green"> Edit </a>-->
              <!--                <a v-if="comment.author_id === store.state.user.id" @click="deleteComment(comment)"-->
              <!--                   style="color: red"> Delete </a></div>-->
              <!--            </a>-->
              <!--          </li>-->
              <!--            </span>-->
              <!--            </ul>-->
              <v-client-table :columns="columns" :data="data" :options="options" :theme="theme" id="dataTable">
                <p slot="actions" slot-scope="props">
                  <a :href="'#/admin/customers/' + props.row.id + '/show'" class="fa fa-user-o action-icon"></a>
                  <a :href="'#/admin/customer-comments/' + props.row.id" class="fa fa-comment-o action-icon"></a>
                  <a :href="'#/admin/customers/' + props.row.id + '/edit'" class="icon-pencil action-icon"></a>
                  <a :href="'#/admin/customers/' + props.row.id + '/files'" class="fa fa-files-o action-icon"></a>
                  <a class="icon-trash" v-on:click="deleteCustomer(props.row.id)" style="cursor: pointer"></a>
                </p>

                <!--          <div slot="child_row" slot-scope="props">-->
                <!--            The link to {{props.row.name}} is <a :href="props.row.uri">{{props.row.uri}}</a>-->
                <!--          </div>-->
              </v-client-table>

          </div>
        </div>
      </b-card-body>
    </b-card>
  </div>
</template>

<script>
  import Vue from "vue";
  import {ClientTable, Event} from 'vue-tables-2';
  import CustomerInfo from "../../../components/CustomerInfo";
  import {getCustomerFiles} from "../../../api/customerFiles";
  import axios from "../../../backend/vue-axios/axios";
  import mixin from "../../../mixins/mixin";

  const API_URL = process.env.VUE_APP_API_URL;
  Vue.use(ClientTable);

  export default {
    name: "Files",
    mixins: [mixin],
    components: {
      ClientTable,
      Event,
      CustomerInfo
    },
    data() {
      return {
        columns: ['id', 'description', 'filename', 'created_at', 'updated_at', 'actions'],
        data: [],
        options: {
          headings: {
            id: 'ID',
            name: 'Account Name',
            type: 'Type',
            'organization.name': 'Organization',
            created_at: 'Created',
            updated_at: 'Updated',
            actions: 'Actions'
          },
          sortable: ['description', 'filename', 'created_at', 'updated_at'],
          filterable: ['description', 'filename', 'created_at', 'updated_at'],
          sortIcon: {base: 'fa', up: 'fa-sort-asc', down: 'fa-sort-desc', is: 'fa-sort'},
          pagination: {
            chunk: 5,
            edge: false,
            nav: 'scroll'
          }
        },
        customer: {
          name: "Customer WNY2",
          organization: "WNY2",
          type: "Business",
          city: "New York2",
          line_1: "408 3rd Court Brentwood",
          line_2: "22",
          state: "Ca",
          zip: 11718,
          customer_owner_user: "John Higgins"
        }
      }
    },
    methods: {
      deleteCustomer: function (customerId) {
        let headers = {
          headers: {
            'Accept': 'application/json',
            'Authorization': 'Bearer ' + localStorage.token
          }
        };

        axios.delete(API_URL + '/customers/' + customerId, headers)
             .then(request => this.customerDeletingSuccessful(request))
             .catch((request) => this.customerDeletingFailed(request));
      },
      customerDeletingSuccessful(req) {
        this.errors = false;
        this.error = false;
        this.flash('The Customer is deleted.', 'success');

        this.downloadData();
      },
      customerDeletingFailed(req) {
        this.errors = false;
        this.error = 'Customer Deleting failed! ' + req;
      },

      downloadData() {
        getCustomerFiles(this.$route.params.id)
          .then(response => {
            this.data = response.data.data;
            this.message = response.data.message;
            this.success = response.data.success;
            console.log(response);
          })
          .catch((error) => this.getFail(error));
      },
      getFail(error) {
        if (error.response) {
          console.log(error.response.data);
          console.log(error.response.status);
          this.logout();
        }
      }
    },
    mounted() {
      this.downloadData();
    }
  }
</script>

<style scoped lang="scss">
  #newComment, #newReply {
    display: none;
  }

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
