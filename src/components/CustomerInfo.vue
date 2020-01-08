<template>
  <div>
    <div class="row">
      <div class="col-12">
        <div class="row">
          <div class="col-5 bold">
            Name
          </div>
          <div class="col-7">
            {{ customer.name }}
          </div>
        </div>

        <div class="row">
          <div class="col-5 bold">
            Customer type
          </div>
          <div class="col-7">
            {{ customer.type }}
          </div>
        </div>

        <div class="row">
          <div class="col-5 bold">
            Billing City
          </div>
          <div class="col-7">
            {{ customer.city }}
          </div>
        </div>

        <div class="row">
          <div class="col-5 bold">
            Billing Line 1
          </div>
          <div class="col-7">
            {{ customer.line_1 }}
          </div>
        </div>

        <div class="row">
          <div class="col-5 bold">
            Billing Line 2
          </div>
          <div class="col-7">
            {{ customer.line_2 }}
          </div>
        </div>

        <div class="row">
          <div class="col-5 bold">
            State
          </div>
          <div class="col-7">
            {{ customer.state }}
          </div>
        </div>

        <div class="row">
          <div class="col-5 bold">
            Postal Code
          </div>
          <div class="col-7">
            {{ customer.zip }}
          </div>
        </div>

        <div class="row">
          <div class="col-5 bold">
            Customer Owner
          </div>
          <div class="col-7">
            {{ customer.customer_owner_user.name }}
          </div>
        </div>
    </div>
  </div>
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
