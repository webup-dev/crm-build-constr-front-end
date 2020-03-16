import httpClient from './httpClient';

const END_POINT = '/lead-sources';

const getLeadSources = () => httpClient.get(END_POINT);
const addLeadSources = (dataForm) => httpClient.post( END_POINT, dataForm);
const updateLeadSources = (dataForm, id) => httpClient.put( END_POINT + '/' + id, dataForm);
const getLeadSourceById = (id) => httpClient.get( END_POINT + '/' + id);
const deleteLeadSource = (id) => httpClient.delete( END_POINT + '/' + id);

export {
  getLeadSources,
  addLeadSources,
  updateLeadSources,
  getLeadSourceById,
  deleteLeadSource
}
