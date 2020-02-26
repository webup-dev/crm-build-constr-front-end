import httpClient from './httpClient';
import store from "../store";

const END_POINT = '/files/';

const getFile = (id) => httpClient.get( END_POINT + id);
const updateFile = (id, data) => httpClient.put( END_POINT + id, data);
const softDeleted = () => httpClient.get( END_POINT + 'soft-deleted');
const restoreFile = (id) => httpClient.put( END_POINT + id + '/restore');

export {
  getFile,
  updateFile,
  softDeleted,
  restoreFile
}
