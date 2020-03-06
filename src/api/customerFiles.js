import httpClient from './httpClient';

const END_POINT = '/customers';

const getCustomerFiles = (id) => httpClient.get(END_POINT + "/" + id + "/files");

export {
  getCustomerFiles
}
