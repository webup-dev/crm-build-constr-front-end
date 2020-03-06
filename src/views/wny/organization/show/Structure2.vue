<template>
  <div>
    <organization-chart :datasource="ds"></organization-chart>
  </div>
</template>

<script>
    import OrganizationChart from 'vue-organization-chart'
    import 'vue-organization-chart/dist/orgchart.css'

    export default {
        components: {
            OrganizationChart
        },
        data() {
            return {
                ds: {
                    'id': '1',
                    'name': 'First-Name Last-Name',
                    'title': 'Spring Sheet Metal & Roofing Co.',
                    'children': [
                        {'id': '2', 'name': 'First-Name Last-Name', 'title': 'Administration',
                            'children': [
                                { 'id': '7', 'name': 'First-Name Last-Name', 'title': 'Administrative Assistant' }
                            ]},
                        {'id': '3', 'name': 'First-Name Last-Name', 'title': 'Accounting'},
                        {'id': '4', 'name': 'First-Name Last-Name', 'title': 'Sales'},
                        // { 'id': '3', 'name': 'First-Name Last-Name', 'title': 'Sales',

                        // },
                        {'id': '5', 'name': 'First-Name Last-Name', 'title': 'Service'},
                        {'id': '6', 'name': 'First-Name Last-Name', 'title': 'Production'}
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
