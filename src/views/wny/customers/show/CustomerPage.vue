<template>
  <div>
    <b-row >
      <b-col md="4">
        <b-card>
          <div slot="header">
            <strong>Customer Information</strong>
          </div>
          <customer-info :customer="customer"/>
          <hr>
          <customer-users :users="users" :customer_id="$route.params.id"/>
          <hr>
          <customer-user-add v-on:new-customer-user-created="downloadData"></customer-user-add>
        </b-card>
      </b-col>

      <b-col md="4" v-for="item in userDetails" v-bind:key="item">
        <b-card>
          <div slot="header">
            <strong>Contact {{item.user_id}}: {{item.first_name}} {{item.last_name}}</strong>
          </div>
          <contact :userDetails="item" :customer_id="$route.params.id"></contact>
        </b-card>
      </b-col>
    </b-row>
  </div>
</template>

<script>
  import CustomerInfo from "../../../../components/CustomerInfo";
  import CustomerUsers from "../../../../components/CustomerUsers";
  import CustomerUserAdd from "../../../../components/CustomerUserAdd";
  import {getCustomerInfo} from "../../../../api/customerPage";
  import {getCustomer} from "../../../../api/customerUsers";
  import Contact from "../../../../components/Contact";
  import myHelper from "../../../../mixins/myHelper";
  import orgDeps from "../../../../mixins/orderedDepartments";

  export default {
    name: "CustomersPage",
    mixins: [myHelper, orgDeps],
    components: {
      CustomerInfo,
      CustomerUsers,
      Contact,
      CustomerUserAdd
    },
    data() {
      return {
        customer: {
          name: "",
          organization: "",
          type: "",
          city: "",
          line_1: "",
          line_2: "",
          state: "",
          zip: '',
          customer_owner_user: ""
        },
        users: [
          {'id': 16, 'order': 1, 'name': 'Eleanor Rigby'},
          {'id': 24, 'order': 2, 'name': 'Sargent Peppers'}
        ],
        userDetails: []
      }
    },
    methods: {
      formatPhones(userDetails) {
        for (let i = 0; i < userDetails.length; i++) {
          userDetails[i].phone_work = this.formatSinglePhone(userDetails[i].phone_work);
          userDetails[i].phone_home = this.formatSinglePhone(userDetails[i].phone_home);
          userDetails[i].phone_mob = this.formatSinglePhone(userDetails[i].phone_mob);
          userDetails[i].phone_fax = this.formatSinglePhone(userDetails[i].phone_fax);
        }
        return userDetails;
      },
      changeUsersData(users) {
        console.log("L: " + this.userDetails.length);
        let result = this.userDetails.map(({ user_id }) => user_id)
        console.log("result: " + result);
        for (let i = 0; i < users.length; i++) {
          users[i].order = i + 1;
          if (result.includes(users[i].id)) {
            users[i].detailsExist = true;
          } else {
            users[i].detailsExist = false;
          }
        }
        return users;
      },
      downloadData() {
        getCustomerInfo(this.$route.params.id)
          .then(response => {
            this.customer = response.data.data;
            this.message = response.data.message;
            this.success = response.data.success;
          })
          .catch(error => console.log(error));

        getCustomer(this.$route.params.id)
          .then(response => {
            this.userDetails = this.formatPhones(response.data.data.userDetails);
            this.users = this.changeUsersData(response.data.data.users);
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

</style>
