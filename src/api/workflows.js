import httpClient from './httpClient';

const END_POINT = '/workflows';

const getWorkflows = () => httpClient.get(END_POINT);
const getOrganizations = () => httpClient.get(END_POINT + '/organizations');
const addWorkflow = (dataForm) => httpClient.post( END_POINT, dataForm);
const updateWorkflow = (dataForm, id) => httpClient.put( END_POINT + '/' + id, dataForm);
const getWorkflowById = (id) => httpClient.get( END_POINT + '/' + id);
const deleteWorkflow = (id) => httpClient.delete( END_POINT + '/' + id);
const getWorkflowsSoftDeleted = () => httpClient.get( END_POINT + '/soft-deleted');
const restoreWorkflow = (id) => httpClient.put( END_POINT + '/' + id + '/restore');
const deleteWorkflowPermanently = (id) => httpClient.delete( END_POINT + '/' + id + '/permanently');

export {
  getWorkflows,
  getOrganizations,
  addWorkflow,
  updateWorkflow,
  getWorkflowById,
  deleteWorkflow,
  getWorkflowsSoftDeleted,
  restoreWorkflow,
  deleteWorkflowPermanently
}
