import httpClient from './httpClient';

const END_POINT = '/files/';

const softDestroyFile = (fileId) => httpClient.delete( END_POINT + fileId);

export {
  softDestroyFile
}
