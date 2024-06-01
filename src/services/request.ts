import { message, notification } from 'antd';
import axios from 'axios';
import Catcher from '@/services/errCatcher';

export type StandardResponse<T = unknown> = {
  state: number;
  code?: number;
  status?: number;
  msg?: string;
  message?: string;
  data: T;
};

declare module 'axios' {
  export interface AxiosRequestConfig {
    noValidate?: boolean;
    noGlobalMessage?: boolean;
  }
}

const service = axios.create({
  baseURL: '/api',
  timeout: 15000,
});

service.interceptors.request.use(conf => {
  const lang = localStorage.getItem('language') ?? 'zh';
  // 设置请求头(lang)
  conf.headers.lang = lang;

  const config = conf;
  return config;
});

service.interceptors.response.use(
  response => {
    const { config } = response as any,
      res = response.data as StandardResponse;
    if (res.code !== 200) {
      Catcher(response, false, config?.noGlobalMessage);
      return;
    }
    if (!config?.noGlobalMessage) {
      message.success(res.message);
    }
    return response.data;
  },
  error => {
    const lang = localStorage.getItem('language') ?? 'zh';
    notification.error({
      message: lang === 'zh' ? '接口出错了' : 'Interface error',
      description:
        error?.message ||
        (lang === 'zh' ? '未知错误信息' : 'Unknown error message'),
    });
  },
);

export default service;
