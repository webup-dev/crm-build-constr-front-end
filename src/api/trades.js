import httpClient from './httpClient';

const END_POINT = '/lead-types';

const getTrades = () => httpClient.get(END_POINT);
const getOrganizations = () => httpClient.get(END_POINT + '/organizations');
const addTrade = (dataForm) => httpClient.post( END_POINT, dataForm);
const updateTrade = (dataForm, id) => httpClient.put( END_POINT + '/' + id, dataForm);
const getTradeById = (id) => httpClient.get( END_POINT + '/' + id);
const deleteTrade = (id) => httpClient.delete( END_POINT + '/' + id);
const getTradesSoftDeleted = () => httpClient.get( END_POINT + '/soft-deleted');
const restoreTrade = (id) => httpClient.put( END_POINT + '/' + id + '/restore');
const deleteTradePermanently = (id) => httpClient.delete( END_POINT + '/' + id + '/permanently');

export {
  getTrades,
  getOrganizations,
  addTrade,
  updateTrade,
  getTradeById,
  deleteTrade,
  getTradesSoftDeleted,
  restoreTrade,
  deleteTradePermanently
}
