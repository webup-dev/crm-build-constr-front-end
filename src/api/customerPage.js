import httpClient from './httpClient';
import store from "../store";

const END_POINT = '/customers';

const getCustomerInfo = (id) => httpClient.get(END_POINT + "/" + id);

export {
  getCustomerInfo
}
