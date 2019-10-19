<template>
  <div>
    <organization-chart :datasource="ds"></organization-chart>
  </div>
</template>

<script>
    import Vue from 'vue'
    import OrganizationChart from 'vue-organization-chart'
    import 'vue-organization-chart/dist/orgchart.css'

    export default {
        components: {
            OrganizationChart
        },
        data () {
            return {
                ds: {
                    'id': '1',
                    'name': 'Steven Caamano',
                    'title': 'Administration',
                    'children': [
                        { 'id': '2', 'name': 'First-Name Last-Name', 'title': 'Accounting' },
                        { 'id': '3', 'name': 'First-Name Last-Name', 'title': 'Sales'},
                        // { 'id': '3', 'name': 'First-Name Last-Name', 'title': 'Sales',
                        //     'children': [
                        //         { 'id': '4', 'name': 'Tie Hua', 'title': 'senior engineer' },
                        //         { 'id': '5', 'name': 'Hei Hei', 'title': 'senior engineer',
                        //             'children': [
                        //                 { 'id': '6', 'name': 'Pang Pang', 'title': 'engineer' },
                        //                 { 'id': '7', 'name': 'Xiang Xiang', 'title': 'UE engineer' }
                        //             ]
                        //         }
                        //     ]
                        // },
                        { 'id': '8', 'name': 'First-Name Last-Name', 'title': 'Service' },
                        { 'id': '9', 'name': 'First-Name Last-Name', 'title': 'Production' },
                        { 'id': '9', 'name': 'Volodymyr Vadiasov', 'title': 'Web Support' }
                    ]
                }
            }
        }
    }
</script>

<style>
  .orgchart .node {
    width: 200px;
  }
</style>
