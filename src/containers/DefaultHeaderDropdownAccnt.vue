<template>
  <AppHeaderDropdown right no-caret>
    <template slot="header">
      <img
        src="img/avatars/6.jpg"
        class="img-avatar"
        alt="admin@bootstrapmaster.com"/>
    </template>
    \
    <template slot="dropdown">
      <b-dropdown-header tag="div" class="text-center"><strong>Account</strong></b-dropdown-header>
<!--      <b-dropdown-item><i class="fa fa-bell-o"/> Name-->
<!--        <b-badge variant="info">{{ store.state.role.isSuperadmin }}</b-badge>-->
<!--      </b-dropdown-item>-->
      <b-dropdown-item><i class="fa fa-bell-o"/> Updates
        <b-badge variant="info">{{ itemsCount }}</b-badge>
      </b-dropdown-item>
      <b-dropdown-item><i class="fa fa-envelope-o"/> Messages
        <b-badge variant="success">{{ itemsCount }}</b-badge>
      </b-dropdown-item>
      <b-dropdown-item><i class="fa fa-tasks"/> Tasks
        <b-badge variant="danger">{{ itemsCount }}</b-badge>
      </b-dropdown-item>
      <b-dropdown-item><i class="fa fa-comments"/> Comments
        <b-badge variant="warning">{{ itemsCount }}</b-badge>
      </b-dropdown-item>
      <b-dropdown-header
        tag="div"
        class="text-center">
        <strong>Settings</strong>
      </b-dropdown-header>
      <b-dropdown-item><i class="fa fa-user"/> Profile</b-dropdown-item>
      <b-dropdown-item><i class="fa fa-wrench"/> Settings</b-dropdown-item>
      <b-dropdown-item><i class="fa fa-usd"/> Payments
        <b-badge variant="secondary">{{ itemsCount }}</b-badge>
      </b-dropdown-item>
      <b-dropdown-item><i class="fa fa-file"/> Projects
        <b-badge variant="primary">{{ itemsCount }}</b-badge>
      </b-dropdown-item>
      <b-dropdown-divider/>
      <b-dropdown-item><i class="fa fa-shield"/> Lock Account</b-dropdown-item>
      <b-dropdown-item @click="logout"><i class="fa fa-lock"/> Logout</b-dropdown-item>
    </template>
  </AppHeaderDropdown>
</template>

<script>
    import {HeaderDropdown as AppHeaderDropdown} from '@coreui/vue'
    import store from "../store";
    import mixin from "../mixins/mixin";

    export default {
        name: 'DefaultHeaderDropdownAccnt',
        mixins: [mixin],
        components: {
            AppHeaderDropdown
        },
        data: () => {
            return {
                itemsCount: 42,
                error: false
            }
        },
        methods: {
            logout() {
                // console.log("Start Logout. Token: " + localStorage.token)
                let headers = {
                    headers: {
                        'Accept': 'application/json',
                        'Authorization': 'Bearer ' + localStorage.token
                    }
                };
                this.$http.post('/auth/logout', [], headers)
                    .then(request => this.logoutSuccessful(request))
                    .catch(() => this.logoutFailed());
            },
            logoutSuccessful(req) {
                // console.log(req);
                delete localStorage.token;
                this.allToFalse();
                this.userStoreConfig("");
                this.error = false;
                console.log("Logout!");
                this.$router.replace('/auth/sign-in');
            },
            logoutFailed() {
                // console.log(req);
                this.error = true;
                this.message = 'Login failed!';
                // console.log("Logout Failed. Token: " + localStorage);
                // console.log("store.state.user: " + store.state.user);
            }
        }
    }
</script>
