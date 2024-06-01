import request from '@/services/request';
import {
  IData,
  IDataParams,
  IGetParams,
  IGetResponse,
} from '@/pages/Data/types.d';

/**
 * 增加数据
 * @param {IAddParams} data 数据信息
 * @return {Promise<IData>} 添加的数据
 *  */
export const addApi = async (data: IDataParams): Promise<IData> => {
  const res = await request<IData>('/list/add', {
    method: 'POST',
    data,
  });
  return res?.data;
};

/**
 * 获取数据
 * @param {IGetParams} params 查询条件
 * @return {Promise<IGetResponse>} 获取到的数据
 *  */
export const getApi = async (params: IGetParams): Promise<IGetResponse> => {
  const { pageSize, current, title, time, tags, order, desc } = params,
    res = await request<IGetResponse>('/list/get', {
      method: 'POST',
      params: {
        pageSize,
        pageNum: current,
      },
      data: {
        title,
        time,
        tags,
        order,
        desc,
      },
    });
  return res?.data;
};

/**
 * 修改数据
 * @param {IUpdateParams} data 新数据信息
 * @return {number} 影响的数据行数
 */
export const updateApi = async (data: IDataParams): Promise<number> => {
  const res = await request<number>('/list/modify', {
    method: 'PATCH',
    data,
  });
  return res?.data;
};

/**
 * 删除数据
 * @param {number} id 数据id
 * @return {number} 影响的数据行数
 *  */
export const delApi = async (id: number): Promise<number> => {
  const res = await request<number>(`/list/del/${id}`, {
    method: 'DELETE',
  });
  return res?.data;
};
