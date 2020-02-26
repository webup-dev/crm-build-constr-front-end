import httpClient from './httpClient';
import store from "../store";

const END_POINT = '/files/';

const getFile = (id) => httpClient.get( END_POINT + id);
const updateFile = (id, data) => httpClient.put( END_POINT + id, data);

export {
  getFile,
  updateFile
}
