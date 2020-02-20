import httpClient from './httpClient';
import store from "../store";

const END_POINT = '/user-details/';

const getDetails = (id) => httpClient.get(END_POINT + id);
const updateDetails = (id, user_id, prefix, first_name, last_name, suffix, work_title, work_department, work_role, phone_home, phone_work, phone_extension, phone_mob, phone_fax, email_work, email_personal, line_1, line_2, city, state, zip, status) => httpClient.put( END_POINT + id, {user_id, prefix, first_name, last_name, suffix, work_title, work_department, work_role, phone_home, phone_work, phone_extension, phone_mob, phone_fax, email_work, email_personal, line_1, line_2, city, state, zip, status});


export {
  getDetails,
  updateDetails
}
