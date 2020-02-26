import httpClient from './httpClient';
import store from "../store";

const END_POINT = '/files/';

const softDestroyFile = (fileId) => httpClient.delete( END_POINT + fileId);

export {
  softDestroyFile
}
