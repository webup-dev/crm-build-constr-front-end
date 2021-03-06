import httpClient from './httpClient';

const END_POINT = '/lead-sources';

const getLeadSources = () => httpClient.get(END_POINT);
const getOrganizations = () => httpClient.get(END_POINT + '/organizations');
const getCategories = () => httpClient.get(END_POINT + '/categories');
const addLeadSources = (dataForm) => httpClient.post( END_POINT, dataForm);
const updateLeadSource = (dataForm, id) => httpClient.put( END_POINT + '/' + id, dataForm);
const getLeadSourceById = (id) => httpClient.get( END_POINT + '/' + id);
const deleteLeadSource = (id) => httpClient.delete( END_POINT + '/' + id);
const getLeadSourceSoftDeleted = () => httpClient.get( END_POINT + '/soft-deleted');
const restoreLeadSource = (id) => httpClient.put( END_POINT + '/' + id + '/restore');
const deleteLeadSourcePermanently = (id) => httpClient.delete( END_POINT + '/' + id + '/permanently');

export {
  getLeadSources,
  getOrganizations,
  getCategories,
  addLeadSources,
  updateLeadSource,
  getLeadSourceById,
  deleteLeadSource,
  getLeadSourceSoftDeleted,
  restoreLeadSource,
  deleteLeadSourcePermanently
}
