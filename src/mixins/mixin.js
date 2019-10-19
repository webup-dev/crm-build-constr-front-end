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
    userStoreConfig(name) {
      store.state.user.name = name;
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
      
      return;
    },
    mainRoleSuccessful(req) {
      const mainRole = req.data.data.name;
      console.log("MainRole. Success. MainRole: " + mainRole);
      console.log(req);
      if (Array.isArray(mainRole) && !mainRole.length) {
        console.log("Main Role. Success. Data is not empty array.");
        this.mainRoleSuccessfulFailed(req);
        return
      }
      
      this.roleStoreConfig(mainRole);
      this.userRoleStoreConfig(mainRole);
      
      console.log("MainRole. Success. isSuperadmin: " + store.state.role.isSuperadmin);
      console.log("MainRole. Success. isAdmin: " + store.state.role.isAdmin);
      console.log("MainRole. Success. user.role: " + store.state.user.role);
      this.error = false;
    },
    mainRoleFailed(req) {
      this.error = 'Main role getting is failed!';
      console.log("Main role getting is failed. Request: " + req);
      delete localStorage.token;
      console.log("loginFailed. Token was deleted. Token: " + localStorage.token);
      console.log("Main role getting is failed. Role: " + localStorage.token);
    },
    mainRoleSuccessfulFailed(req) {
      this.flash('You do not have any role.', 'error');
      this.roleStoreConfig('guest');
    }
  }
};