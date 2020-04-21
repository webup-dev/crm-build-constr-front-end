<template>
  <div class="animated fadeIn">
    <b-row>
      <b-col md="6">
        <b-card>
          <flash-message></flash-message>
          <div slot="header">
            <strong>Update Workflow</strong>
          </div>
          <b-form
            novalidate=novalidate
          >
            <div class="alert alert-danger" v-if="errors.length">
              <b>Correct, please the following error(s):</b>
              <ul>
                <li v-for="error in errors" v-bind:key="error">{{ error }}</li>
              </ul>
            </div>
            <div class="alert alert-danger" v-if="error">
              {{ error }}
            </div>
            <b-form-group
              label="Name *"
              label-for="name"
              :label-cols="3"
              style="font-weight: bold"
            >
              <b-form-input
                id="name"
                autofocus
                v-model="$v.name.$model"
                type="text"
                placeholder="Name"
                :class="status($v.name)">

              </b-form-input>
            </b-form-group>

            <b-form-group label="Organization *"
                          label-for="organizationId"
                          :label-cols="3"
                          class="label-bold"
            >
              <b-form-select id="organizationId"
                             v-model="$v.organizationId.$model"
                             v-on:change="changeOrganization()"
                             :plain="true"
                             :options=organizationOptions
                             :class="status($v.organizationId)">
              </b-form-select>
            </b-form-group>

            <b-form-group label="Workflow Type *"
                          label-for="workflowType"
                          :label-cols="3"
                          class="label-bold"
            >
              <b-form-select id="workflowType"
                             v-model="$v.workflowType.$model"
                             v-on:change="changeWorkflowType()"
                             :plain="true"
                             :options=workflowTypeOptions
                             :class="status($v.workflowType)">
              </b-form-select>
            </b-form-group>

            <b-form-group
              label="Description"
              label-for="description"
              :label-cols="3"
              style="font-weight: bold"
            >
              <b-form-input
                id="description"
                v-model="$v.description.$model"
                type="text"
                placeholder="Description"
                :class="status($v.description)">

              </b-form-input>
            </b-form-group>
            <section v-if="isWorkflowType === true && isOrganizationId === true">
              <hr>
              <div class="row">
                <div class="col-4">
                  <p class="label-bold">Included Stages</p>
                  <draggable class="list-group" :list="list1" group="people" :emptyInsertThreshold="100">
                    <div
                      class="list-group-item green"
                      v-for="(element, index) in list1"
                      :key="element.name"
                    >
                      {{ index }} &nbsp;&nbsp;&nbsp; {{ element.name }}
                    </div>
                  </draggable>
                </div>

                <div class="col-4">
                  <p class="label-bold">Not Included Stages</p>
                  <draggable class="list-group" :list="list2" group="people" :emptyInsertThreshold="100">
                    <div
                      class="list-group-item grey"
                      v-for="(element, index) in list2"
                      :key="element.name"
                    >
                      {{ element.name }}
                    </div>
                  </draggable>
                </div>

                <div class="col-4">
                  <p class="label-bold">Instruction</p>
                  <p>Collect the required stages in the column "Included Stages" by drag-and-drop.</p>
                  <p>Collect the unnecessary stages in the column "Not Included Stages" by drag-and-drop.</p>
                  <p>Sort the selected stages in the required order by drag-and-drop.</p>
                </div>

                <!--              <rawDisplayer class="col-3" :value="list1" title="List 1" />-->

                <!--              <rawDisplayer class="col-3" :value="list2" title="List 2" />-->
              </div>
            </section>
            <hr>
            <div slot="footer">
              <b-button id="save"
                        v-on:click="checkForm()"
                        class="mr-10"
                        size="sm"
                        variant="primary">
                <i class="fa fa-dot-circle-o"></i>
                Save
              </b-button>
              <b-button class="btn btn-info mr-10"
                        size="sm"
                        v-on:click="closeForm">
                Close form
              </b-button>
              <b-button class="btn btn-danger"
                        size="sm"
                        v-on:click="cancel">
                Cancel
              </b-button>
            </div>
          </b-form>
        </b-card>
      </b-col>
    </b-row>
  </div>
</template>

<script>
  import {validations} from '../../../components/validations/workflows';
  import WORKFLOW_TYPES from '../../../constants/workflows';
  import {updateWorkflow, getWorkflowById, getOrganizations} from "../../../api/workflows";
  import {getStages} from "../../../api/stages";
  import draggable from 'vuedraggable';
  import store from "../../../store";

  const VUE_APP_FLASH_TIMEOUT = process.env.VUE_APP_FLASH_TIMEOUT;

  export default {
    name: 'WorkflowUpdate',
    components: {
      draggable
    },
    data() {
      return {
        name: '',
        organizationOptions: [{value: 0, text: 'org 1'}, {value: 1, text: 'org 2'}],
        organizationId: '',
        isOrganizationId: false,
        workflowTypeOptions: WORKFLOW_TYPES,
        workflowType: '',
        isWorkflowType: true,
        description: '',
        list1: [],
        list2: [],
        errors: [],
        error: false
      }
    },
    validations: validations,
    methods: {
      cancel() {
        let workflow = store.state.workflow;
        this.name = workflow.name;
        this.organizationId = workflow.organization_id;
        this.isOrganizationId = true;
        this.isWorkflowType = true;
        this.workflowType = workflow.workflow_type;
        this.description = workflow.description;
        this.formatUpdatedLists();
        this.errors = [];
        this.$nextTick(() => {
          this.$v.$reset()
        });
      },
      closeForm() {
        this.cancel();
        this.$router.replace(this.$route.query.redirect || '/admin/workflows')
      },
      status(validation) {
        return {
          error: validation.$error,
          dirty: validation.$dirty
        }
      },
      changeOrganization() {
        this.isOrganizationId = true;
        this.isFilterList();
      },
      changeWorkflowType() {
        this.isWorkflowType = true;
        this.isFilterList();
      },

      isFilterList() {
        if (this.isOrganizationId && this.isWorkflowType) {
          let list = store.state.listStages;
          this.list2 = this.filterList(list);
          this.list1 = [];
        }
      },

      filterList(list) {
        const newList = [];
        let sel2 = document.getElementById('workflowType');
        let sel1 = document.getElementById('organizationId');

        list.forEach(function (obj, index) {
          if ((obj.organizationId == sel1.value) && (obj.workflowType == sel2.value)) {
            newList.push(obj);
          }
        })

        return newList;
      },

      checkForm: function (keyWord, e) {
        // validation
        this.errors = [];

        if (!this.$v.name.required) {
          this.errors.push('Name is required.');
        }

        if (!this.$v.name.alphaNumSpaceDotCommaHyphenApostrophe) {
          this.errors.push('Name consists of letters, numbers, dot, comma, hyphen, apostrophe and space only.');
        }

        if (!this.$v.organizationId.required) {
          this.errors.push('Organization is required.');
        }
        if (!this.$v.organizationId.integer) {
          this.errors.push('Wrong set of organizations.');
        }

        if (!this.$v.workflowType.required) {
          this.errors.push('Workflow Type is required.');
        }

        if (!this.$v.workflowType.alpha) {
          this.errors.push('Wrong set of Workflow Types.');
        }

        if (!this.$v.description.alphaNumSpaceDotCommaHyphenApostrophe) {
          this.errors.push('Name consists of letters, numbers, dot, comma, hyphen, apostrophe and space only.');
        }

        if (!this.errors.length && !this.error.length) {
            this.update();
            return true;
        }

        e.preventDefault();
      },

      update() {
        let dataPost = this.dataPost();
        updateWorkflow(dataPost, this.$route.params.id)
          .then(() => this.workflowCreatingSuccessful())
          .catch((request) => this.workflowCreatingFailed(request));
      },

      dataPost() {
        return {
          name: this.name,
          organization_id: this.organizationId,
          workflow_type: this.workflowType,
          description: this.description,
          stages: this.formatStages(this.list1),
        };
      },

      formatStages(list) {
        let stages = [];
        list.forEach(function (obj, index) {
          stages.push({
            id: obj.id,
            order: index
          });
        });

        return stages
      },

      workflowCreatingSuccessful() {
        this.errors = false;
        this.error = false;
        this.flash('New Workflow is created.', 'success', {timeout: VUE_APP_FLASH_TIMEOUT});

        this.$router.replace(this.$route.query.redirect || '/admin/workflows')
      },

      workflowCreatingFailed(req) {
        this.errors = false;
        this.error = 'Workflow Creating failed! ' + req;
        console.log(req);
      },

      downloadData() {
        getOrganizations()
          .then(response => {
            this.organizationOptions = this.formatOrganizations(response.data.data);
          })
          .catch(error => console.log(error));

        getWorkflowById(this.$route.params.id)
          .then(response => {
            const workflow = response.data.data;
            this.name = workflow.name;
            this.organizationId = workflow.organization_id;
            this.workflowType = workflow.workflow_type;
            this.description = workflow.description;
            this.message = response.data.message;
            this.success = response.data.success;
            this.isOrganizationId = true;
            this.isWorkflowType = true;
            workflow.stages = this.formatList(workflow.stages);
            store.commit('setWorkflow', workflow);
            console.log("store.state.workflow")
            console.log(store.state.workflow)

            getStages()
              .then(response => {
                const fullList = this.formatList(response.data.data);
                store.commit('setListStages', fullList);
                this.message = response.data.message;
                this.success = response.data.success;

                this.formatUpdatedLists();
              })
              .catch(error => console.log(error));
          })
          .catch(error => console.log(error));
      },

      formatList(stages) {
        let list = [];
        stages.forEach(function (obj, index) {
          list.push({
            name: obj.name,
            organizationId: obj.organization_id,
            workflowType: obj.workflow_type,
            id: obj.id,
          });
        });

        return list
      },

      filterInitialList(list) {
        const finalList = [];
        let workflow_type = store.state.workflow.workflow_type;
        let organization_id = store.state.workflow.organization_id;

        list.forEach(function (obj, index) {
          if ((obj.organizationId == organization_id) && (obj.workflowType == workflow_type)) {
            finalList.push(obj);
          }
        })

        return finalList;
      },

      formatUpdatedLists() {
        this.list1 = this.filterInitialList(store.state.workflow.stages);
        let actualList = this.filterInitialList(store.state.listStages);
        this.list2 = actualList.filter(this.comparer(this.list1));
      },

      comparer(otherArray) {
        return function (current) {
          return otherArray.filter(function (other) {
            return other.id === current.id
          }).length === 0;
        }
      },

      formatOrganizations(organizations) {
        let newArr = [];
        organizations.forEach(function (obj, index) {
          newArr.push({
            value: obj.id,
            text: obj.name
          });
        });
        return newArr;
      }
    },
    mounted() {
      this.downloadData();
    }
  }
</script>

<style scoped>
  .fade-enter-active,
  .fade-leave-active {
    transition: opacity 0.5s;
  }

  .fade-enter,
  .fade-leave-to {
    opacity: 0;
  }

  .dirty {
    border-color: #5A5;
    background: #EFE;
  }

  .dirty:focus {
    outline-color: #8E8;
  }

  .error {
    border-color: red;
    background: #FDD;
  }

  .error:focus {
    outline-color: #F99;
  }

  .label-bold {
    font-weight: bold
  }

  .mr-10 {
    margin-right: 10px
  }

  .list-group-item {
    padding: 0.375rem 0.75rem
  }

  .green {
    background-color: #4dbd74;
    color: #fff;
    cursor: pointer;
  }

  .grey {
    background-color: #dfdfdf;
    cursor: pointer;
  }
</style>
