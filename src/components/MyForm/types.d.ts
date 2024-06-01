import { Store } from 'antd/lib/form/interface';
import { ReactElement } from 'react';

export declare type FormLayout = 'horizontal' | 'inline' | 'vertical';
export declare type InternalNamePath = (string | number)[];

export interface formItemsType {
  component?: ReactElement;
  label?: string;
  name?: string;
  style?: Record<string, number | string>; // 样式
  initValue?: unknown; // 复选框为数组
  required?: boolean;
  message?: string;
  errMessage?: string;
  disable?: boolean;
  hidden?: boolean;
  tooltip?: string; // 提示信息
  colon?: boolean; // 冒号
  rules?: Record<string, boolean | string | number>[]; // 自定义规则
  noStyle?: boolean;
  min?: number;
  max?: number;
}

export interface formType {
  // 标题
  title?: string;
  subtitle?: string;
  titleStyle?: Record<string, number | string>;
  // 表单
  initialValues?: Store; // Store是对象类型
  formItems: formItemsType[];
  validateMessages?: Record<string, number | string>;
  targetUrl?: string;
  // 样式
  hidenSubmitButton?: boolean;
  submitButtonText?: string;
  hideResetButton?: boolean;
  layout?: FormLayout;
  resetButtonText?: string;
  formItemLayout?: Record<string, Record<string, number>>; // 表单整体布局
  requiredMark?: boolean;
  // 方法
  // onFinish?: (values: Record<string, string>) => void
  // onFinishFailed?: (values: unknown) => void
  // onFieldsChange?: (values: unknown) => void
  [k: string]: any;
}
