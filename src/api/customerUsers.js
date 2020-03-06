import httpClient from './httpClient';

const END_POINT = '/customers/';


const getCustomer = (id) => httpClient.get(END_POINT + id);

export {
  getCustomer
}
