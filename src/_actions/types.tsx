import { AxiosRequestConfig } from 'axios';

export interface ApiPayload {
  baseUrl: string;
  controller: string;
  action?: string;
  itemId?: string | number;
  status?: string | number;
  method: 'get' | 'post' | 'put' | 'delete' | 'patch';
  data?: Record<string, any>;
  query?: Record<string, string | number | boolean | object | null | any[]>;
  headers?: Record<string, string>;
  axiosOptions?: Omit<
    import('axios').AxiosRequestConfig,
    'url' | 'method' | 'headers'
  >;
  otherResponse?: boolean;
}

export interface BaseApiCallPayload {
  baseUrl: string;
  controller: string;
  action?: string;
  itemId?: string | number;
  query?: Record<string, any | null>;
  data?: any;
  method: 'get' | 'post' | 'put' | 'delete' | 'patch';
  headers?: Record<string, string>;
  axiosOptions?: Omit<AxiosRequestConfig, 'url' | 'method' | 'headers'>;

  onSuccess: (response: any) => void;
  onError: (error: any) => void;
  callback?: (response: any) => void;

  otherResponse?: boolean;
  notShowMessage?: boolean;
  notShowError?: boolean;
}
