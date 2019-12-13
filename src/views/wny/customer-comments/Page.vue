<template>
  <div class="animated fadeIn">
    <b-card>
      <flash-message></flash-message>
      <b-card-header>
        <i class="icon-menu mr-1"></i>Customer Comments
        <a href="#" class="badge badge-danger">Customer Comments</a>

        <div class="card-header-actions"></div>
      </b-card-header>
      <b-card-body>
        <div class="email-app mb-4">
          <nav>
            <a @click="newComment" class="btn btn-warning btn-block">New Comment</a>
            <ul class="nav">
              <li class="nav-item">{{ customer.organization.name}}</li>
              <li class="nav-item">{{customer.name}}</li>
              <li class="nav-item">{{customer.type}}</li>
              <li class="nav-item">{{customer.city}}</li>
              <li class="nav-item">{{customer.line_1}}</li>
            </ul>
          </nav>
          <main class="inbox">
            <b-form id="newComment"
                    :style="{ 'display': disp}"
                    @submit.prevent=checkForm
                    novalidate=novalidate>
              <div class="alert alert-danger" v-if="errors.length">
                <b>Correct, please the following error(s):</b>
                <ul>
                  <li v-for="item in errors">{{ item }}</li>
                </ul>
              </div>
              <div class="alert alert-danger" v-if="error">
                {{ error }}
              </div>
              <h4 v-bind:style="{'display': displayReply}">Reply to the comment:</h4>
              <h4 v-bind:style="{'display': displayEdit}">Edit your comment:</h4>
              <h4 v-bind:style="{'display': displayNew}">Create a new comment:</h4>
              <div class="form-group mt-4" id="newReply" v-bind:style="{'display': displayReply}">
                <b-form-group>
                  <b-form-input plaintext
                                id="replyComment"
                                v-model="$v.parentComment.$model"
                                type="text"
                                class="text-italic">

                  </b-form-input>
                </b-form-group>
                <input type="hidden" name="commentId" :value="commentId">
                <input type="hidden" name="parentId" :value="parentId">
                <input type="hidden" name="parentLevel" :value="parentLevel">
              </div>
              <textarea class="form-control"
                        id="message"
                        rows="6"
                        placeholder="Enter your comment here, please"
                        v-model="$v.bodyComment.$model"
                        type="text"
                        :class="status($v.bodyComment)">
            </textarea>
              <div class="form-group">
                <b-button class="mr-1"
                          type="submit"
                          variant="success"
                          @click="disp = 'none'">
                  Save
                </b-button>
                <b-button class="mr-1" @click="disp = 'none', bodyComment=''" variant="danger">Cancel</b-button>
              </div>
            </b-form>
            <ul class="messages">
          <span v-for="comment in comments">
          <li class="message" v-bind:style="comment.marginL">
            <a>
              <div class="header">
                <span class="from"><b>{{comment.user.name}}</b></span>
                <span class="date"><span class="fa fa-paper-clip"></span><b> {{ comment.created_at }}</b></span>
              </div>
              <div class="title">
                {{ comment.comment }}
              </div>
              <div>
                <a @click="reply(comment)" style="color: #00aced">Reply </a>
                <a v-if="comment.author_id === store.state.user.id" @click="editComment(comment)" style="color: green"> Edit </a>
                <a v-if="comment.author_id === store.state.user.id" @click="deleteComment(comment)"
                   style="color: red"> Delete </a></div>
            </a>
          </li>
            </span>
            </ul>
          </main>

        </div>
      </b-card-body>
    </b-card>
  </div>
</template>

<script>
  import Vue from 'vue'
  import axios from "../../../backend/vue-axios/axios";
  import moment from "moment";
  import ordComms from "../../../mixins/orderedComments";
  import {validations} from './validation'
  import store from "../../../store";

  const API_URL = process.env.VUE_APP_API_URL;

  export default {
    name: "Page",
    mixins: [ordComms],
    validations: validations,
    data: function () {
      return {
        customer: [],
        comments: [],
        disp: "none;",
        displayNew: "none;",
        displayReply: "none;",
        displayEdit: "none;",
        errors: [],
        error: false,
        commentId: '',
        bodyComment: '',
        parentId: null,
        parentComment: '',
        parentLevel: 1,
        store: store
      }
    },
    methods: {
      editComment(comment) {
        this.disp = 'block';
        this.displayNew = 'none';
        this.displayReply = 'none';
        this.displayEdit = 'block';
        this.commentId = comment.id;
        this.bodyComment = comment.comment;
      },
      newComment() {
        console.log('newComment!')
        this.disp = 'block';
        this.displayNew = 'block';
        this.displayReply = 'none';
        this.displayEdit = 'none';
      },

      reply(comment) {
        this.disp = 'block';
        this.displayNew = 'none';
        this.displayReply = 'block';
        this.displayEdit = 'none';
        this.parentId = comment.id;
        this.parentComment = comment.comment;
        this.parentLevel = comment.level;
      },

      status(validation) {
        return {
          error: validation.$error,
          dirty: validation.$dirty
        }
      },
      checkForm: function (e) {
        // validation
        this.errors = [];

        // name
        if (!this.$v.bodyComment.required) {
          this.errors.push('Text is required.');
        }

        if (!this.errors.length) {
          this.save();
          return true;
        }

        e.preventDefault();
      },
      save() {
        let headers = {
          headers: {
            'Accept': 'application/json',
            'Authorization': 'Bearer ' + localStorage.token
          }
        };

        if (this.displayNew === 'block') {
          this.create(headers)
        }
        if (this.displayEdit === 'block') {
          this.edit(headers)
        }
        if (this.displayReply === 'block') {
          this.createReply(headers)
        }

        this.bodyComment = '';
      },
      create(headers) {
          let dataPost = {
            customer_id: this.customer.id,
            author_id: store.state.user.id,
            parent_id: null,
            comment: this.bodyComment,
            level: 1
          };

          axios.post('/customers/' + this.$route.params.id + "/comments", dataPost, headers)
               .then(request => this.commentCreatingSuccessful(request))
               .catch((request) => this.commentCreatingFailed(request));
      },

      edit(headers) {
        let dataPost = {
            comment: this.bodyComment,
          };

          console.log(dataPost);
          axios.put('/customers/' + this.$route.params.id + "/comments/" + this.commentId, dataPost, headers)
               .then(request => this.commentCreatingSuccessful(request))
               .catch((request) => this.commentCreatingFailed(request));
      },

      createReply(headers) {
        let dataPost = {
            customer_id: this.customer.id,
            author_id: store.state.user.id,
            comment: this.bodyComment,
            parent_id: this.parentId,
            level: this.parentLevel + 1
          };

          console.log(dataPost);
          axios.post('/customers/' + this.$route.params.id + "/comments", dataPost, headers)
               .then(request => this.commentCreatingSuccessful(request))
               .catch((request) => this.commentCreatingFailed(request));
      },

      commentCreatingSuccessful(req) {
        this.errors = false;
        this.error = false;
        this.flash('New Comment is created.', 'success');

        this.downloadData()
      },

      commentCreatingFailed(req) {
        this.errors = false;
        this.error = 'Comment Creating failed! ' + req;
        console.log(req);
      },

      deleteComment: function (comment) {
        let headers = {
          headers: {
            'Accept': 'application/json',
            'Authorization': 'Bearer ' + localStorage.token
          }
        };

        axios.delete(API_URL + '/customers/' + this.$route.params.id + "/comments/" + comment.id, headers)
             .then(request => this.commentDeletingSuccessful(request))
             .catch((request) => this.commentDeletingFailed(request));
      },
      commentDeletingSuccessful(req) {
        this.errors = false;
        this.error = false;
        this.flash('The Comment is deleted.', 'success');

        this.downloadData();
      },
      commentDeletingFailed(req) {
        this.errors = false;
        this.error = 'Comment Deleting failed! ' + req;
        this.flash(req.response.data.message + ' Code: ' + req.response.data.code)
      },
      format(comments) {
        comments = this.formatResponse(comments);
        console.log("formatResponse");
        console.log(comments);
        console.log("format");
        for (let i = 0; i < comments.length; i++) {
          let item = comments[i].created_at;
          console.log("item")
          console.log(item)
          item = this.formatDate(item);
          console.log(item)
          comments[i].created_at = item;
        }
        console.log(comments);
        return comments;
      },
      formatDate(date) {
        if (date !== null) {
          let date_parts = date.match(/^(\d{4})-(\d+)-(\d+) (\d{2}):(\d{2}):(\d{2})(.*)$/);
          let year;
          let month;
          let day;
          let hours;
          let minutes;
          let seconds;

          if (date_parts) {
            year = date_parts[1].slice(-4);
            month = date_parts[2].slice(-2);
            day = date_parts[3].slice(-2);
            hours = date_parts[4].slice(-2);
            minutes = date_parts[5].slice(-2);
            seconds = date_parts[6].slice(-2);

            let newDate = new Date(year, month - 1, day, hours, minutes, seconds);

            date = moment(newDate).format('LLL');
            return date;
          } else {
            return date;
          }
        } else {
          return date;
        }
      },
      order(comments) {

      },

      downloadData() {
        let headers = {
          headers: {
            'Accept': 'application/json',
            'Authorization': 'Bearer ' + localStorage.token
          }
        };

        axios.get(API_URL + '/customers/' + this.$route.params.id, headers)
             .then(response => {
               this.customer = response.data.data;
               this.message = response.data.message;
               this.success = response.data.success;
             })
             .catch(error => console.log(error));

        axios.get(API_URL + '/customers/' + this.$route.params.id + '/comments', headers)
             .then(response => {
               this.comments = this.format(response.data.data.comments);
               console.log("response");
               console.log(response);
               this.message = response.data.message;
               this.success = response.data.success;
             })
             .catch(error => console.log(error));
      }
    },
    mounted() {
      this.downloadData();
    }
  }
</script>

<style scoped>
  #newComment, #newReply {
    display: none;
  }

  .email-app nav {
    -webkit-box-flex: 0;
    -ms-flex: 0 0 300px;
    flex: 0 0 300px;
  }

  .email-app .inbox .message {
    padding: 1rem 1rem 1rem 1rem;
  }

  .label-bold {
    font-weight: bold
  }

  .text-italic {
    font-style: italic;
  }
</style>
