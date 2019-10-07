<template>
  <div class="app">
    <AppHeader fixed>
      <SidebarToggler class="d-lg-none" display="md" mobile/>
      <b-link class="navbar-brand" to="#">
        <img class="navbar-brand-full" src="img/brand/logo-wny-755.png" width="25" height="25" alt="WNY logo">
        <img class="navbar-brand-minimized" src="img/brand/logo-wny-755.png" width="30" height="30" alt="WNY logo">
      </b-link>
      <SidebarToggler class="d-md-down-none" display="lg" :defaultOpen=true />
      <b-navbar-nav class="d-md-down-none">
        <b-nav-item class="px-3" to="/dashboard">Dashboard</b-nav-item>
        <b-nav-item class="px-3" to="/users" exact>Users</b-nav-item>
        <b-nav-item class="px-3">Settings</b-nav-item>
      </b-navbar-nav>
      <b-navbar-nav class="ml-auto">
        <span class="px-3">{{ store.state.user.name }}</span>
        <span class="badge badge-success" v-if="store.state.user.role" >Role: {{ store.state.user.role }}</span>
        <b-nav-item class="d-md-down-none">
          <DefaultHeaderDropdownNotif/>
        </b-nav-item>
        <b-nav-item class="d-md-down-none">
          <DefaultHeaderDropdownTasks/>
        </b-nav-item>
        <b-nav-item class="d-md-down-none">
          <DefaultHeaderDropdownMssgs/>
        </b-nav-item>
        <b-nav-item class="d-md-down-none">
          <DefaultHeaderDropdown/>
        </b-nav-item>
        <DefaultHeaderDropdownAccnt/>
      </b-navbar-nav>
      <AsideToggler class="d-none d-lg-block"/>
      <!--<AsideToggler class="d-lg-none" mobile />-->
    </AppHeader>
    <div class="app-body">
      <AppSidebar fixed>
        <SidebarHeader/>
        <SidebarForm/>

        <SidebarNav v-if="store.state.role.isSuperadmin === true" :navItems="navSuperadmin" ></SidebarNav>
        <SidebarNav v-if="store.state.role.isDeveloper === true" :navItems="navDeveloper" ></SidebarNav>
        <SidebarNav v-if="store.state.role.isPlatformSuperadmin === true" :navItems="navPlatformSuperadmin" ></SidebarNav>
        <SidebarNav v-if="store.state.role.isGuest === true" :navItems="navGuest" ></SidebarNav>
        <!--            <user-view v-if="userType === 'user'"></user-view>&ndash;&gt;-->
        <!--        <guest-view v-if="userType === 'guest'"></guest-view>-->
        <SidebarFooter/>
        <SidebarMinimizer/>
      </AppSidebar>
      <main class="main">
        <!--        <Breadcrumb :list="list"/>-->
        <div class="container-fluid">
          <router-view></router-view>
        </div>
      </main>
      <AppAside fixed>
        <!--aside-->
        <DefaultAside/>
      </AppAside>
    </div>
    <TheFooter>
      <!--footer-->
      <div>
        <a href="https://wny.com">WNY</a>
        <span class="ml-1">&copy; 2018 WNY.</span>
      </div>
      <div class="ml-auto">
        <span class="mr-1">Powered by</span>
        <a href="https://vadis.pp.ua">Vadis</a>
      </div>
    </TheFooter>
  </div>
</template>

<script>
    import navSuperadmin from '../views/wny/menu/nav_superadmin'
    import navGuest from '../views/wny/menu/nav_guest'
    import navDeveloper from '../views/wny/menu/nav_developer'
    import navPlatformSuperadmin from '../views/wny/menu/nav_platform_superadmin'
    import {
        Header as AppHeader,
        SidebarToggler,
        Sidebar as AppSidebar,
        SidebarFooter,
        SidebarForm,
        SidebarHeader,
        SidebarMinimizer,
        SidebarNav,
        Aside as AppAside,
        AsideToggler,
        Footer as TheFooter,
        Breadcrumb
    } from '@coreui/vue'
    import DefaultAside from './DefaultAside'
    import DefaultHeaderDropdown from './DefaultHeaderDropdown'
    import DefaultHeaderDropdownNotif from './DefaultHeaderDropdownNotif'
    import DefaultHeaderDropdownAccnt from './DefaultHeaderDropdownAccnt'
    import DefaultHeaderDropdownMssgs from './DefaultHeaderDropdownMssgs'
    import DefaultHeaderDropdownTasks from './DefaultHeaderDropdownTasks'
    import store from "../store";

    export default {
        name: 'DefaultContainer',
        components: {
            AsideToggler,
            AppHeader,
            AppSidebar,
            AppAside,
            TheFooter,
            Breadcrumb,
            DefaultAside,
            DefaultHeaderDropdown,
            DefaultHeaderDropdownMssgs,
            DefaultHeaderDropdownNotif,
            DefaultHeaderDropdownTasks,
            DefaultHeaderDropdownAccnt,
            SidebarForm,
            SidebarFooter,
            SidebarToggler,
            SidebarHeader,
            SidebarNav,
            SidebarMinimizer
        },
        data() {
            return {
                navSuperadmin: navSuperadmin.items,
                navGuest: navGuest.items,
                navDeveloper: navDeveloper.items,
                navPlatformSuperadmin: navPlatformSuperadmin.items,
                store: store
            }
        },
        created() {
            console.log("isSuperadmin: " + store.state.user.isSuperadmin)
            let headers = {
                headers: {
                    'Accept': 'application/json',
                    'Authorization': 'Bearer ' + localStorage.token
                }
            };

            this.$http.get('/auth/me', headers)
                .then(request => this.meSuccessful(request))
                .catch((request) => this.meFailed(request));
        },
        computed: {
            name() {
                return this.$route.name
            },
            list() {
                return this.$route.matched.filter((route) => route.name || route.meta.label)
            }
        },
        methods: {
            meSuccessful(req) {
                this.errors = false;
                this.error = false;
                // console.log(req);
                // this.flash('Successful Login.', 'success');

                // let headers = {
                //     headers: {
                //         'Accept': 'application/json',
                //         'Authorization': 'Bearer ' + localStorage.token
                //     }
                // };
                //
                // this.$http.get('/rules/main-role', headers)
                //     .then(request => this.mainRoleSuccessful(request))
                //     .catch(() => this.mainRoleFailed());
            },

            meFailed(req) {
                this.$router.replace('/auth/sign-in');
                console.log(req);
            }

            // mainRoleSuccessful(req) {
            //     this.errors = false;
            //     this.error = false;
            //     console.log(req);
            //     const role = req.data;
            //     console.log(role);
            //     this.falseAll();
            //     switch (role) {
            //         case 'superadmin':
            //             store.state.user.isSuperadmin = true;
            //             break;
            //         case 'admin':
            //             store.state.user.isAdmin = true;
            //             break;
            //         case 'platform-superadmin':
            //             store.state.user.isPlatformSuperadmin = true;
            //             break;
            //         case 'platform-admin':
            //             store.state.user.isPlatformAdmin = true;
            //             break;
            //         case 'organization-superadmin':
            //             store.state.user.isOrganizationSuperadmin = true;
            //             break;
            //         case 'organization-general-manager':
            //             store.state.user.isOrganizationGeneralManager = true;
            //             break;
            //         case 'organization-sales-manager':
            //             store.state.user.isOrganizationSalesManager = true;
            //             break;
            //         default:
            //             break;
            //
            //     }
            // },

            // falseAll() {
            //     store.state.user.isSuperadmin = false;
            //     store.state.user.isAdmin = false;
            //     store.state.user.isPlatformSuperadmin = false;
            //     store.state.user.isPlatformAdmin = false;
            //     store.state.user.isOrganizationSuperadmin = false;
            //     store.state.user.isOrganizationGeneralManager = false;
            //     store.state.user.isOrganizationSalesManager = false
            // }
        }
    }
</script>
