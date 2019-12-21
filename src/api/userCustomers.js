import httpClient from './httpClient';
import store from "../store";

const END_POINT = '/user-customers';


const getAllUserCustomers = () => httpClient.get(END_POINT);
const getUserCustomer = (id) => httpClient.get(END_POINT + "/" + id);
const createUserCustomer = (user_id, customer_id) => httpClient.post(END_POINT, {user_id, customer_id});
const updateUserCustomer = (id, user_id, customer_id) => httpClient.put(END_POINT + "/" + id, {user_id, customer_id});
const deleteUserCustomer = (id) => httpClient.delete(END_POINT + "/" + id);
const getAllUserCustomersSoftDeleted = () => httpClient.get(END_POINT + '/soft-deleted');
const restoreUserCustomer = (id) => httpClient.put(END_POINT + "/" + id + '/restore');
const deleteUserCustomerPermanently = (id) => httpClient.delete(END_POINT + "/" + id + '/permanently');

export {
  getAllUserCustomers,
  getUserCustomer,
  createUserCustomer,
  updateUserCustomer,
  deleteUserCustomer,
  getAllUserCustomersSoftDeleted,
  restoreUserCustomer,
  deleteUserCustomerPermanently
}
