import httpClient from './httpClient2';
import store from "../store";

const END_POINT = '/files';

const addFile = (dataForm) => httpClient.post( END_POINT, dataForm);

export {
  addFile
}
