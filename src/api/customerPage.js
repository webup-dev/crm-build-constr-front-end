import httpClient from './httpClient';

const END_POINT = '/customers';

const getCustomerInfo = (id) => httpClient.get(END_POINT + "/" + id);

export {
  getCustomerInfo
}
