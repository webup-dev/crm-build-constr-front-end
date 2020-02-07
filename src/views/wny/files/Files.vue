<template>
  <div class="animated fadeIn">
    <b-card>
      <flash-message></flash-message>
      <b-card-header>
        <i class="icon-menu mr-1"></i>Customer Files

        <div class="card-header-actions"></div>
      </b-card-header>
      <b-card-body>
        <div class="email-app mb-4">
          <nav>
<!--            <a @click="newComment" class="btn btn-warning btn-block">New Comment</a>-->
<!--            <ul class="nav">-->
<!--              <li class="nav-item">{{ customer.organization.name}}</li>-->
<!--              <li class="nav-item">{{customer.name}}</li>-->
<!--              <li class="nav-item">{{customer.type}}</li>-->
<!--              <li class="nav-item">{{customer.city}}</li>-->
<!--              <li class="nav-item">{{customer.line_1}}</li>-->
<!--            </ul>-->
          </nav>
          <main class="inbox">
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
          </main>

        </div>
      </b-card-body>
    </b-card>
  </div>
</template>

<script>
  export default {
    name: "Files"
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
