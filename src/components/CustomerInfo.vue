<template>
  <div>
    <b-form-group
      label="Name"
      label-for="name"
      :label-cols="5"
      class="bold"
    >
      <b-form-input
        plaintext
        id="name"
        :value="customer.name"
        type="text">

      </b-form-input>
    </b-form-group>

    <b-form-group
      label="Organization"
      label-for="organization"
      :label-cols="5"
      class="bold"
    >
      <b-form-input
        plaintext
        id="organization"
        :value="customer.organization.name"
        type="text">

      </b-form-input>
    </b-form-group>

    <b-form-group
      label="Customer type"
      label-for="type"
      :label-cols="5"
      class="bold"
    >
      <b-form-input
        plaintext
        id="type"
        :value="customer.type"
        type="text">

      </b-form-input>
    </b-form-group>

    <b-form-group
      label="Billing City"
      label-for="city"
      :label-cols="5"
      class="bold"
    >
      <b-form-input
        plaintext
        id="city"
        :value="customer.city"
        type="text">

      </b-form-input>
    </b-form-group>

    <b-form-group
      label="Billing Line 1"
      label-for="line_1"
      :label-cols="5"
      class="bold"
    >
      <b-form-input
        plaintext
        id="line_1"
        :value="customer.line_1"
        type="text">

      </b-form-input>
    </b-form-group>

    <b-form-group
      label="Billing Line 2"
      label-for="line_2"
      :label-cols="5"
      class="bold"
    >
      <b-form-input
        plaintext
        id="line_2"
        :value="customer.line_2"
        type="text">

      </b-form-input>
    </b-form-group>

    <b-form-group
      label="State"
      label-for="state"
      :label-cols="5"
      class="bold"
    >
      <b-form-input
        plaintext
        id="state"
        :value="customer.state"
        type="text">

      </b-form-input>
    </b-form-group>

    <b-form-group
      label="Postal Code"
      label-for="zip"
      :label-cols="5"
      class="bold"
    >
      <b-form-input
        plaintext
        id="zip"
        :value="customer.zip"
        type="text">

      </b-form-input>
    </b-form-group>

    <b-form-group
      label="Customer Owner"
      label-for="customer_owner_user"
      :label-cols="5"
      class="bold"
    >
      <b-form-input
        plaintext
        id="customer_owner_user"
        :value="customer.customer_owner_user.name"
        type="text">

      </b-form-input>
    </b-form-group>


    <b-form-group
      label="Customer Owner"
      label-for="customer_owner_user"
      :label-cols="5"
      class="bold"
    >
      <b-form-input
        plaintext
        id="customer_owner_user"
        :value="customer.customer_owner_user.name"
        type="text">

      </b-form-input>
    </b-form-group>
  </div>
</template>

<script>
  export default {
    name: "CustomerInfo",
    props: ['customer'],
    data() {
      return {
        // customer: this.customer
      }
    }
  }
</script>

<style scoped>
  .bold {
    font-weight: bold;
  }
</style>
