import store from "../store";

export default {
  methods: {
    roleStoreConfig(mainRole) {
      this.allToFalse();
      switch (mainRole) {
        case 'superadmin':
          store.state.role.isSuperadmin = true;
          break;
        case 'developer':
          store.state.role.isDeveloper = true;
          break;
        case 'admin':
          store.state.role.isAdmin = true;
          break;
        case 'platform-superadmin':
          store.state.role.isPlatformSuperadmin = true;
          break;
        case 'platform-admin':
          store.state.role.isPlatformAdmin = true;
          break;
        case 'organization-superadmin':
          store.state.role.isOrganizationSuperadmin = true;
          break;
        case 'organization-admin':
          store.state.role.isOrganizationAdmin = true;
          break;
        case 'organization-general-manager':
          store.state.role.isOrganizationGeneralManager = true;
          break;
        case 'organization-sales-manager':
          store.state.role.isOrganizationSalesManager = true;
          break;
        case 'customer-individual':
          store.state.role.isCustomer = true;
          break;
        case 'customer-organization':
          store.state.role.isCustomer = true;
          break;
        default:
          store.state.role.isGuest = true;
          break;
      }
    },
    allToFalse() {
      store.state.role.isSuperadmin = false;
      store.state.role.isDeveloper = false;
      store.state.role.isAdmin = false;
      store.state.role.isPlatformSuperadmin = false;
      store.state.role.isPlatformAdmin = false;
      store.state.role.isOrganizationSuperadmin = false;
      store.state.role.isOrganizationAdmin = false;
      store.state.role.isOrganizationGeneralManager = false;
      store.state.role.isOrganizationSalesManager = false;
      store.state.role.isGuest = false
    },
    userStoreConfig(name, id) {
      store.state.user.name = name;
      store.state.user.id = id;
    },
    userRoleStoreConfig(role) {
      store.state.user.role = role;
    },
    mainRole() {
      let headers = {
        headers: {
          'Accept': 'application/json',
          'Authorization': 'Bearer ' + localStorage.token
        }
      };
      this.$http.get('/rules/main-role', headers)
          .then(request => this.mainRoleSuccessful(request))
          .catch(() => this.mainRoleFailed());

    },
    mainRoleSuccessful(req) {
      const mainRole = req.data.data.name;
      console.log("mainRole: " + mainRole);
      if (Array.isArray(mainRole) && !mainRole.length) {
        this.mainRoleSuccessfulFailed(req);
        return
      }

      this.roleStoreConfig(mainRole);
      this.userRoleStoreConfig(mainRole);

      this.error = false;
    },
    mainRoleFailed() {
      this.error = 'Main role getting is failed!';
      delete localStorage.token;
    },
    mainRoleSuccessfulFailed(req) {
      console.log(req);
      this.flash('You do not have any role.', 'error');
      this.roleStoreConfig('guest');
    },
    logout() {
      console.log("Start Logout. Token: " + localStorage.token);
      let headers = {
        headers: {
          'Accept': 'application/json',
          'Authorization': 'Bearer ' + localStorage.token
        }
      };

      this.$http.post('/auth/logout', [], headers)
          .then(() => this.logoutSuccessful())
          .catch(request => this.logoutFailed(request));
    },
    logoutSuccessful() {
      // console.log(req);
      delete localStorage.token;
      this.allToFalse();
      this.userStoreConfig("");
      this.error = false;
      console.log("Logout!");
      this.$router.replace('/auth/sign-in');
    },
    logoutFailed(req) {
      console.log(req);
      this.error = true;
      this.message = 'Login failed!';
      // console.log("Logout Failed. Token: " + localStorage);
      // console.log("store.state.user: " + store.state.user);
    }
  }
};
