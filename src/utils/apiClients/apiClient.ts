import axios from 'axios';

const recursivelyDecodeData = (data: any) => {
  if (typeof data === 'object') {
    if (Array.isArray(data)) {
      return data.map((item) => recursivelyDecodeData(item));
    } else {
      const decodedObject = {};
      for (const key in data) {
        // eslint-disable-next-line no-prototype-builtins
        if (data.hasOwnProperty(key)) {
          decodedObject[key] = recursivelyDecodeData(data[key]);
        }
      }
      return decodedObject;
    }
  } else if (typeof data === 'string') {
    return decodeURIComponent(data);
  } else {
    return data;
  }
};

const apiClient = axios.create({
  baseURL: 'http://localhost:8080',
  headers: {
    'Content-Type': 'application/json',
  },
});

apiClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('accesstoken');
    if (token !== null) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },

  (error) => {
    return Promise.reject(error);
  },
);

apiClient.interceptors.response.use(
  (response) => {
    if (response.data) {
      response.data = recursivelyDecodeData(response.data);
    }
    return response;
  },
  (error) => {
    return Promise.reject(error);
  },
);

export default apiClient;
