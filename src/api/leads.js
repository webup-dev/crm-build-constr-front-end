import httpClient from './httpClient';

const END_POINT = '/leads';

const getLeads = () => httpClient.get(END_POINT);
const getOrganizations = () => httpClient.get(END_POINT + '/organizations');
const addLead = (dataForm) => httpClient.post( END_POINT, dataForm);
const updateLead = (dataForm, id) => httpClient.put( END_POINT + '/' + id, dataForm);
const getLeadById = (id) => httpClient.get( END_POINT + '/' + id);
const deleteLead = (id) => httpClient.delete( END_POINT + '/' + id);
const getLeadsSoftDeleted = () => httpClient.get( END_POINT + '/soft-deleted');
const restoreLead = (id) => httpClient.put( END_POINT + '/' + id + '/restore');
const deleteLeadPermanently = (id) => httpClient.delete( END_POINT + '/' + id + '/permanently');

export {
  getLeads,
  getOrganizations,
  addLead,
  updateLead,
  getLeadById,
  deleteLead,
  getLeadsSoftDeleted,
  restoreLead,
  deleteLeadPermanently
}
