import httpClient from './httpClient';
import store from "../store";

const END_POINT = '/customers/';


const getCustomer = (id) => httpClient.get(END_POINT + id);

export {
  getCustomer
}
