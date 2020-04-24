import httpClient from './httpClient';

const END_POINT = '/requesters';

const getRequesters = () => httpClient.get(END_POINT);
const getOrganizations = () => httpClient.get(END_POINT + '/organizations');
const addRequester = (dataForm) => httpClient.post( END_POINT, dataForm);
const updateRequester = (dataForm, id) => httpClient.put( END_POINT + '/' + id, dataForm);
const getRequesterById = (id) => httpClient.get( END_POINT + '/' + id);
const deleteRequester = (id) => httpClient.delete( END_POINT + '/' + id);
const getRequestersSoftDeleted = () => httpClient.get( END_POINT + '/soft-deleted');
const restoreRequester = (id) => httpClient.put( END_POINT + '/' + id + '/restore');
const deleteRequesterPermanently = (id) => httpClient.delete( END_POINT + '/' + id + '/permanently');

export {
  getRequesters,
  getOrganizations,
  addRequester,
  updateRequester,
  getRequesterById,
  deleteRequester,
  getRequestersSoftDeleted,
  restoreRequester,
  deleteRequesterPermanently
}
