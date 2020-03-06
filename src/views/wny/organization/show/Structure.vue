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
                    'name': 'Steven Caamano',
                    'title': 'Western New York Exteriors, LLC.',
                    'children': [
                        {'id': '2', 'name': 'First-Name Last-Name', 'title': 'Administration'},
                        {'id': '3', 'name': 'First-Name Last-Name', 'title': 'Accounting'},
                        {'id': '4', 'name': 'First-Name Last-Name', 'title': 'Sales'},
                        {'id': '5', 'name': 'First-Name Last-Name', 'title': 'Service'},
                        {'id': '6', 'name': 'First-Name Last-Name', 'title': 'Production'},
                        {
                            'id': '7', 'name': 'Volodymyr Vadiasov', 'title': 'Web Support',
                            'children': [
                                {'id': '8', 'name': 'Volodymyr Vadiasov', 'title': 'Project Manager'},
                                {'id': '9', 'name': 'Volodymyr Vadiasov', 'title': 'Back-end Development'},
                                {'id': '10', 'name': 'Volodymyr Vadiasov', 'title': 'Front-end Development'}
                            ]
                        }
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
