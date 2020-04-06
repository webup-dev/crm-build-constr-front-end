import httpClient from './httpClient';

const END_POINT = '/lead-statuses';

const getLeadStatuses = () => httpClient.get(END_POINT);
const getOrganizations = () => httpClient.get(END_POINT + '/organizations');
const addLeadStatus = (dataForm) => httpClient.post( END_POINT, dataForm);
const updateLeadStatus = (dataForm, id) => httpClient.put( END_POINT + '/' + id, dataForm);
const getLeadStatusById = (id) => httpClient.get( END_POINT + '/' + id);
const deleteLeadStatus = (id) => httpClient.delete( END_POINT + '/' + id);
const getLeadStatusesSoftDeleted = () => httpClient.get( END_POINT + '/soft-deleted');
const restoreLeadStatus = (id) => httpClient.put( END_POINT + '/' + id + '/restore');
const deleteLeadStatusPermanently = (id) => httpClient.delete( END_POINT + '/' + id + '/permanently');

export {
  getLeadStatuses,
  getOrganizations,
  addLeadStatus,
  updateLeadStatus,
  getLeadStatusById,
  deleteLeadStatus,
  getLeadStatusesSoftDeleted,
  restoreLeadStatus,
  deleteLeadStatusPermanently
}
