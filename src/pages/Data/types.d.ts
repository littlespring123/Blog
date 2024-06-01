// 分页信息
export interface IPagination {
  pageSize?: number;
  pageNum?: number;
  total?: number;
  current?: number;
  pages?: number;
}

/**
 * 表格的参数
 */
export type ITableParams = IPagination & {
  // loading: boolean
  order?: string;
  desc?: boolean;
  title?: string;
  tags?: number[];
  time?: string[];
};

/**
 * 添加/修改数据
 */
// 添加数据请求参数
export interface IDataParams {
  id?: number;
  title: string;
  description: string;
  tags: number[];
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
  order?: string;
  desc?: boolean;
  // total: number
  title?: string;
  // description?: string
  time?: string[];
  tags?: number[];
}

// 获取数据请求响应参数
export type IGetResponse = Required<IPagination> & {
  list: IData[];
  tagsList: ITag[];
};

// 数据类型
export interface IData {
  id: number;
  title: string;
  description: string;
  createdAt: string;
  updatedAt: string;
  tags?: ITag[];
}

// 添加数据请求参数
export interface ITag {
  value: number;
  label: string;
  type: string;
  createdAt?: string;
  updatedAt?: string;
}
