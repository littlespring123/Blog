import request from '@/services/request';
import { ITag, IAddParams, IGetResponse, ITagDic } from '@/pages/Tags/types.d';

/**
 * 增加标签
 * @param {IAddParams} data 标签的信息
 * @return {Promise<IData>} 添加的数据
 */
export const addApi = async (data: IAddParams): Promise<ITag> => {
  const res = await request<ITag>('/tags/add', {
    method: 'POST',
    data,
  });
  return res?.data;
};

/**
 * 获取标签列表
 * @return {Promise<IGetResponse>} 标签列表
 */
export const getApi = async (): Promise<IGetResponse> => {
  const res = await request<IGetResponse>('/tags/get', {
    method: 'GET',
  });
  return res?.data;
};

/**
 * 获取标签字典
 * @return {Promise<ITagDic>} 标签的字典
 */
export const getDicApi = async (): Promise<ITagDic> => {
  const res = await request<ITagDic>('/tags/dic', {
    method: 'GET',
  });
  return res?.data;
};

/**
 * 修改标签
 * @param {Required<IAddParams>} data 新的标签信息
 * @return {number} 影响的数据行数
 */
export const updateApi = async (
  data: Required<IAddParams>,
): Promise<number> => {
  const res = await request<number>('/tags/modify', {
    method: 'PATCH',
    data,
  });
  return res?.data;
};

/**
 * 批量删除标签
 * @param {number[]} id 标签id
 * @return {number} 影响的数据行数
 */
export const delApi = async (id: number[]): Promise<number> => {
  const res = await request<number>('/tags/del', {
    method: 'DELETE',
    data: { id },
  });
  return res?.data;
};
