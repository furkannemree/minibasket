import axios from 'axios';
import general from '../../utils/general';
import { ApiPayload } from '../types';
import Toast from 'react-native-toast-message';

const makeApiCall = async (payload: ApiPayload): Promise<any> => {
  let sendData = { ...payload.data };
  let url = `${payload.baseUrl}/${payload.controller}`;
  if (!general.isNullOrEmpty(payload.action)) url += `/${payload.action}`;
  if (!general.isNullOrEmpty(payload.itemId)) url += `/${payload.itemId}`;
  if (!general.isNullOrEmpty(payload.status)) url += `/${payload.status}`;
  if (payload.query instanceof Object) {
    const keys = Object.keys(payload.query);
    if (keys.length > 0) url += '?';
    for (let i = 0; i < keys.length; ++i) {
      const value = payload.query[keys[i]];
      const encodedValue =
        typeof value === 'object'
          ? encodeURIComponent(JSON.stringify(value))
          : encodeURIComponent(String(value));

      url += `${keys[i]}=${encodedValue}`;
      if (i < keys.length - 1) url += '&';
    }
  }

  let axiosOptions = payload.axiosOptions;

  let options = {
    url,
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
      ...payload.headers,
    },
    method: payload.method,
    ...axiosOptions,
  };

  if (
    payload?.axiosOptions?.data == undefined &&
    payload.method.toLowerCase() != 'get'
  )
    options.data = sendData;
  try {
    const res = await axios(options);
    return res.data;
  } catch (error) {
    Toast.show({
      type: 'error',
      text1: 'Error',
      text2: 'Something Went Wrong',
    });
    return {
      error: true,
      data: null,
      errorMessage: 'Something Went Wrong',
    };
  }
};

export default {
  makeApiCall,
};
