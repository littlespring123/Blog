// 分页信息
export interface IPagination {
  pageSize?: number;
  pageNum?: number;
  current?: number;
  total?: number;
  pages?: number;
  order?: string;
  desc?: boolean;
}

// 标签的枚举
export type TagType =
  | 'success'
  | 'error'
  | 'warning'
  | 'processing'
  | 'default';

// 标签类型
export interface ITag {
  id: number;
  title: string;
  type: TagType;
  createdAt: string;
  updatedAt: string;
}

/**
 * 添加标签
 */
// 添加标签请求参数
export interface IAddParams {
  id?: number;
  title: string;
  type: TagType;
}

// 添加数据的响应
// export interface IAddResponse {
//   id: number
// }

/**
 * 获取数据
 */
// 获取数据请求参数
export interface IGetParams {
  pageSize?: number;
  pageNum?: number;
  current?: number;
}

// 获取标签字典
export interface ITagDic {
  id: number;
  title: string;
  type: TagType;
}

// 获取标签请求响应参数
export type IGetResponse = {
  list: ITag[];
} & IPagination;

/**
 * 修改标签
 */
// 修改标签请求参数
// export interface IUpdateParams {
//   id: number
//   title: string
//   type: string
// }

// 修改数据请求响应参数
// export interface IUpdateResponse {
//   id: number
// }
