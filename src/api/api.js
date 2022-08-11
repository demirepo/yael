import axios from 'axios';

const axiosInstance = axios.create({
  //   withCredentials: true,
  headers: {},
  baseURL: 'https://dictionary.yandex.net/dicservice.json/',
});

export const wordApi = {
  getTrans: (text, session) => {
    const { sid = '', yu = '', yum = '' } = session;
    return axiosInstance
      .get(
        `lookupMultiple?sid=${sid}&ui=ru&srv=tr-text&text=${text}&type=regular%2Csyn%2Cant%2Cderiv&lang=en-ru&flags=7590&dict=en-ru.regular%2Cen.syn%2Cen.ant%2Cen.deriv&yu=${yu}&yum=${yum}`
      )
      .then((response) => response.data);
  },
  getExamples: (text, session) => {
    const { sid = '', yu = '' } = session;
    return axiosInstance
      .get(
        `queryCorpus?sid=${sid}&ui=ru&srv=tr-text&text=${text}&type&lang=en-ru&flags=1062&src=${text}&dst&options=0&chunks=1&maxlen=200&v=2&yu=${yu}`
      )
      .then((response) => response.data);
  },
};
