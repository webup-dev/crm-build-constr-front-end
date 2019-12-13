import httpClient from './httpClient';

const END_POINT = '/customers';


const getCustomer = (customerId) => httpClient.get(END_POINT + "/" + customerId);

export {
  getCustomer
}
