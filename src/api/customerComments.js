import httpClient from './httpClient';
import store from "../store";

const END_POINT = '/customers/';


const getAllComments = (customerId) => httpClient.get(END_POINT + customerId + "/comments");
const createComment = (customer_id, author_id, parent_id, comment, level) => httpClient.post(END_POINT + customer_id + "/comments", {customer_id, author_id, parent_id, comment, level});
const updateComment = (customer_id, comment_id, author_id, parent_id, comment, level) => httpClient.put(END_POINT + customer_id + "/comments/"  + comment_id, {customer_id, author_id, parent_id, comment, level});
const deleteComment = (customerId, commentId) => httpClient.delete(END_POINT + customerId + "/comments/" + commentId);

export {
  getAllComments,
  createComment,
  updateComment,
  deleteComment
}
