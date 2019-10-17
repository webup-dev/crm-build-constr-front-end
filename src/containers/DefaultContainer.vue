<template>
  <div class="app">
    <AppHeader fixed>
      <SidebarToggler class="d-lg-none" display="md" mobile/>
      <b-link class="navbar-brand" to="#">
        <img class="navbar-brand-full" src="img/brand/logo-wny-755.png" width="25" height="25" alt="WNY logo">
        <img class="navbar-brand-minimized" src="img/brand/logo-wny-755.png" width="30" height="30" alt="WNY logo">
      </b-link>
      <SidebarToggler class="d-md-down-none" :defaultOpen=true display="lg"/>
      <b-navbar-nav class="d-md-down-none">
        <b-nav-item class="px-3" to="/dashboard">Dashboard</b-nav-item>
        <b-nav-item class="px-3" to="/users" exact>Users</b-nav-item>
        <b-nav-item class="px-3">Settings</b-nav-item>
      </b-navbar-nav>
      <b-navbar-nav class="ml-auto">
        <span class="px-3">{{ store.state.user.name }}</span>
        <span class="badge badge-success" v-if="store.state.user.role">Role: {{ store.state.user.role }}</span>
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

        <SidebarNav v-if="store.state.role.isSuperadmin === true" :navItems="navSuperadmin"></SidebarNav>
        <SidebarNav v-if="store.state.role.isDeveloper === true" :navItems="navDeveloper"></SidebarNav>
        <SidebarNav v-if="store.state.role.isPlatformSuperadmin === true"
                    :navItems="navPlatformSuperadmin"></SidebarNav>
        <SidebarNav v-if="store.state.role.isPlatformAdmin === true" :navItems="navPlatformAdmin"></SidebarNav>
        <SidebarNav v-if="store.state.role.isOrganizationSuperadmin === true"
                    :navItems="navOrganizationSuperadmin"></SidebarNav>
        <SidebarNav v-if="store.state.role.isOrganizationAdmin === true" :navItems="navOrganizationAdmin"></SidebarNav>
        <SidebarNav v-if="store.state.role.isGuest === true" :navItems="navGuest"></SidebarNav>
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
    import navPlatformAdmin from '../views/wny/menu/nav_platform_admin'
    import navOrganizationSuperadmin from '../views/wny/menu/nav_organization_superadmin'
    import navOrganizationAdmin from '../views/wny/menu/nav_organization_admin'
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
                navPlatformAdmin: navPlatformAdmin.items,
                navOrganizationSuperadmin: navOrganizationSuperadmin.items,
                navOrganizationAdmin: navOrganizationAdmin.items,
                store: store
            }
        },
        created() {
            console.log("defaultContainer. isSuperadmin: " + store.state.role.isSuperadmin)
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

        },
        methods: {
            meSuccessful(req) {
                this.errors = false;
                this.error = false;
                this.mainRole();
            },
            meFailed(req) {
                this.$router.replace('/auth/sign-in');
                console.log(req);
            }
        }
    }
</script>
