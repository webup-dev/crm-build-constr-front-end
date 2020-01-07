<template>
  <div>
    <b-row>
      <b-col md="4">
        <b-card>
          <div slot="header">
            <strong>Customer Information</strong>
          </div>
          <customer-info :customer="customer" />
          <hr>
          <customer-users  :users="users" />
        </b-card>
      </b-col>
    </b-row>
  </div>
</template>

<script>
  import Vue from 'vue'
  import CustomerInfo from "../../../../components/CustomerInfo";
  import CustomerUsers from "../../../../components/CustomerUsers";
  import {getCustomerInfo} from "../../../../api/customerPage";
  import {getCustomer} from "../../../../api/customerUsers";
  import {getAllComments} from "../../../../api/customerComments";

  export default {
    name: "CustomersPage",
    components: {
      CustomerInfo,
      CustomerUsers
    },
    data() {
      return {
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
        },
        users: [
          {'id': 16, 'order': 1, 'name': 'Eleanor Rigby'},
          {'id': 24, 'order': 2, 'name': 'Sargent Peppers'}
        ]
      }
    },
    methods: {
      changeIdsToNumber(users) {
        for (let i = 0; i < users.length; i++) {
          users[i].id = i + 1;
        }
        return users;
      },
      downloadData() {
        getCustomerInfo(this.$route.params.id)
          .then(response => {
            console.log("response");
            console.log(response);
            this.customer = response.data.data;
            this.message = response.data.message;
            this.success = response.data.success;
          })
          .catch(error => console.log(error));

        getCustomer(this.$route.params.id)
          .then(response => {
            console.log("response");
            console.log(response);
            this.users = this.changeIdsToNumber(response.data.data.users);
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
