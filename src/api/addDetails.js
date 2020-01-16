import httpClient from './httpClient';
import store from "../store";

const END_POINT = '/user-details';


const addDetails = () => httpClient.post(END_POINT);

export {
  addDetails
}
