# Documentation for Component "CustomerInfo"
## Using
### Parent
#### Layout
````
<customer-info :customer="customer"/>
````
#### Script
##### Import
````
import CustomerInfo from "../../../../components/CustomerInfo";
import {getCustomerInfo} from "../../../../api/customerPage";
````
##### Code
````
export default {
    ...,
    components: {
      CustomerInfo,
      ...
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
        ...
      }
    },
    downloadData() {
        getCustomerInfo(this.$route.params.id)
          .then(response => {
            this.customer = response.data.data;
            this.message = response.data.message;
            this.success = response.data.success;
          })
          .catch(error => console.log(error));
    
    }
````
