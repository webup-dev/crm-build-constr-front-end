import httpClient from './httpClient';

const END_POINT = '/lead-source-categories';

const getLsCategories = () => httpClient.get(END_POINT);
const addLsCategories = (dataForm) => httpClient.post( END_POINT, dataForm);
const updateLsCategories = (dataForm, id) => httpClient.put( END_POINT + '/' + id, dataForm);
const getLsCategoryById = (id) => httpClient.get( END_POINT + '/' + id);
const deleteLsCategory = (id) => httpClient.delete( END_POINT + '/' + id);
const getLsCategorySoftDeleted = () => httpClient.get( END_POINT + '/soft-deleted');
const restoreLsCategory = (id) => httpClient.put( END_POINT + '/' + id + '/restore');
const deleteLsCategoryPermanently = (id) => httpClient.delete( END_POINT + '/' + id + '/permanently');

export {
  getLsCategories,
  addLsCategories,
  updateLsCategories,
  getLsCategoryById,
  deleteLsCategory,
  getLsCategorySoftDeleted,
  restoreLsCategory,
  deleteLsCategoryPermanently
}
