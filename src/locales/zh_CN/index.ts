import antdCN from 'antd/locale/zh_CN';
import { flattenObject } from '@/utils/tools';
import list from './list';
import tags from './tags';
import message from './message';

export default {
  antd: antdCN,
  locale: 'zh-CN',
  // 全局配置
  title: '内容管理系统',
  setting: '设置',
  ...flattenObject({
    // 导航栏
    navBar: {
      summary: '总结',
      data: '数据管理',
      tags: '标签管理',
    },
    // 404页面
    page404: {
      title: '404',
      subTitle: '抱歉，您访问的页面不存在。',
      backHome: '返回首页',
    },
    // 弹窗及其内部表单
    modal: {
      addTitle: '添加记录',
      editTitle: '编辑记录',
      name: {
        title: '名称',
        placeholder: '请输入名称',
      },
      description: {
        title: '描述',
        placeholder: '请输入描述',
      },
      tags: {
        title: '标签',
        placeholder: '请输入标签',
      },
      type: {
        title: '类型',
        placeholder: '请选择类型',
        success: 'success',
        error: 'error',
        warning: 'warning',
        processing: 'processing',
        default: 'default',
      },
      ok: '确定',
      cancle: '取消',
    },
  }),
  // 页面
  ...flattenObject(list),
  ...flattenObject(tags),
  ...flattenObject(message),
};
