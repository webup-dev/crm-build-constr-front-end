import httpClient from './httpClient';

const END_POINT = '/lead-sources';

const getLeadSources = () => httpClient.get(END_POINT);

export {
  getLeadSources
}
