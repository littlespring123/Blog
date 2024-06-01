import { notification } from 'antd';
import { AxiosResponse } from 'axios';

const HttpErrorList: Record<number, string> = {
  404: '请求地址错误或后端接口未部署',
  403: '没有相关权限',
  401: '登录状态过期, 需要重新登录',
  500: '后端服务有未处理的错误',
  502: '后端接口无响应',
  504: '请求超时, 可能是网络问题, 请稍后重试',
};

export class HttpNetworkError extends Error {
  constructor (message: string) {
    super(message);
    this.name = 'HttpNetworkError';
  }
}

type StandardResponse<T = unknown> = {
  code?: number;
  status?: number;
  message?: string;
  info?: string;
  data: T;
};

function Catcher (
  response: AxiosResponse<StandardResponse>,
  isHttpError: boolean,
  noGlobalMessage?: boolean,
): void {
  const lang = localStorage.getItem('lang') ?? 'zh';
  if (isHttpError) {
    const { status } = response,
      baseMessage = lang === 'zh' ? '网络请求错误' : 'Network request error';
    if (!noGlobalMessage) {
      notification.error({
        message: baseMessage,
        description: HttpErrorList[status],
      });
    }
    throw new HttpNetworkError(baseMessage);
  } else {
    const { data } = response,
      baseMessage = lang === 'zh' ? '接口出错了' : 'Interface error';
    if (!noGlobalMessage) {
      notification.error({
        message: baseMessage,
        description:
          data?.message ||
          (lang === 'zh' ? '未知错误信息' : 'Unknown error message'),
      });
    }
  }
}
export default Catcher;
