import httpClient from './httpClient';
import store from "../store";

const END_POINT = '/customers';

const getCustomerFiles = (id) => httpClient.get(END_POINT + "/" + id + "/files");

export {
  getCustomerFiles
}
