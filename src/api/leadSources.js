import httpClient from './httpClient';

const END_POINT = '/lead-sources';

const getLeadSources = () => httpClient.get(END_POINT);
const addLeadSources = (dataForm) => httpClient.post( END_POINT, dataForm);

export {
  getLeadSources,
  addLeadSources
}
