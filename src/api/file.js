import httpClient from './httpClient';

const END_POINT = '/files/';

const getFile = (id) => httpClient.get( END_POINT + id);
const updateFile = (id, data) => httpClient.put( END_POINT + id, data);
const softDeleted = () => httpClient.get( END_POINT + 'soft-deleted');
const restoreFile = (id) => httpClient.put( END_POINT + id + '/restore');
const permanentDestroyFile = (id) => httpClient.delete( END_POINT + id + '/permanently');

export {
  getFile,
  updateFile,
  softDeleted,
  restoreFile,
  permanentDestroyFile
}
