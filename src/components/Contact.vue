<template>
  <div>
    <div class="row">
      <div class="col-12">
        <div class="row">
          <div class="col-5 bold">User ID</div>
          <div class="col-7">{{userDetails.user_id}}</div>
        </div>

        <div class="row">
          <div class="col-5 bold">Name</div>
          <div class="col-7">{{userDetails.first_name}} {{userDetails.last_name}}</div>
        </div>

        <div class="row">
          <div class="col-5 bold">Prefix</div>
          <div class="col-7">{{userDetails.prefix}}</div>
        </div>

        <div class="row">
          <div class="col-5 bold">Suffix</div>
          <div class="col-7">{{userDetails.suffix}}</div>
        </div>

        <div class="row">
          <div class="col-5 bold">Work Title</div>
          <div class="col-7">{{userDetails.work_title}}</div>
        </div>

        <div class="row">
          <div class="col-5 bold">Work Department</div>
          <div class="col-7">{{userDetails.work_department}}</div>
        </div>

        <div class="row">
          <div class="col-5 bold">Work Role</div>
          <div class="col-7">{{userDetails.work_role}}</div>
        </div>

        <div class="row">
          <div class="col-5 bold">Phone Home</div>
          <div class="col-7">{{userDetails.phone_home}}</div>
        </div>

        <div class="row">
          <div class="col-5 bold">Phone Work</div>
          <div class="col-7">{{userDetails.phone_work}}</div>
        </div>

        <div class="row">
          <div class="col-5 bold">Phone Extension</div>
          <div class="col-7">{{userDetails.phone_extension}}</div>
        </div>

        <div class="row">
          <div class="col-5 bold">Phone Mobile</div>
          <div class="col-7">{{userDetails.phone_mob}}</div>
        </div>

        <div class="row">
          <div class="col-5 bold">Phone Fax</div>
          <div class="col-7">{{userDetails.phone_fax}}</div>
        </div>

        <div class="row">
          <div class="col-5 bold">Email Work</div>
          <div class="col-7">{{userDetails.email_work}}</div>
        </div>

        <div class="row">
          <div class="col-5 bold">Email Personal</div>
          <div class="col-7">{{userDetails.phone_home}}</div>
        </div>

        <div class="row">
          <div class="col-5 bold">Address Line 1</div>
          <div class="col-7">{{userDetails.line_1}}</div>
        </div>

        <div class="row">
          <div class="col-5 bold">Address Line 2</div>
          <div class="col-7">{{userDetails.line_2}}</div>
        </div>

        <div class="row">
          <div class="col-5 bold">City</div>
          <div class="col-7">{{userDetails.city}}</div>
        </div>

        <div class="row">
          <div class="col-5 bold">State</div>
          <div class="col-7">{{userDetails.state}}</div>
        </div>

        <div class="row">
          <div class="col-5 bold">Postal Code</div>
          <div class="col-7">{{userDetails.zip}}</div>
        </div>

        <div class="row">
          <div class="col-5 bold">Status</div>
          <div class="col-7">{{userDetails.status}}</div>
        </div>

        <div class="row">
          <div class="col-5 bold">Deleted At</div>
          <div class="col-7">{{userDetails.deleted_at}}</div>
        </div>

        <div class="row">
          <div class="col-5 bold">Created At</div>
          <div class="col-7">{{userDetails.created_at}}</div>
        </div>

        <div class="row">
          <div class="col-5 bold">Updated At</div>
          <div class="col-7">{{userDetails.updated_at}}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: "Contact",
    props: ['userDetails'],
    data: function () {
      return {
      }
    }
  }
</script>

<style scoped>

</style>
