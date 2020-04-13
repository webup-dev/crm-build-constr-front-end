import httpClient from './httpClient';

const END_POINT = '/stages';

const getStages = () => httpClient.get(END_POINT);
const getOrganizations = () => httpClient.get(END_POINT + '/organizations');
const addStage = (dataForm) => httpClient.post( END_POINT, dataForm);
const updateStage = (dataForm, id) => httpClient.put( END_POINT + '/' + id, dataForm);
const getStageById = (id) => httpClient.get( END_POINT + '/' + id);
const deleteStage = (id) => httpClient.delete( END_POINT + '/' + id);
const getStagesSoftDeleted = () => httpClient.get( END_POINT + '/soft-deleted');
const restoreStage = (id) => httpClient.put( END_POINT + '/' + id + '/restore');
const deleteStagePermanently = (id) => httpClient.delete( END_POINT + '/' + id + '/permanently');

export {
  getStages,
  getOrganizations,
  addStage,
  updateStage,
  getStageById,
  deleteStage,
  getStagesSoftDeleted,
  restoreStage,
  deleteStagePermanently
}
