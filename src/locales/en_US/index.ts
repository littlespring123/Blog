import antdEn from 'antd/locale/en_US';
import { flattenObject } from '@/utils/tools';
import list from './list';
import tags from './tags';
import message from './message';

export default {
  antd: antdEn,
  locale: 'en-US',
  // Global configuration
  title: 'Content management system',
  setting: 'setting',
  ...flattenObject({
    // nav bar
    navBar: {
      summary: 'summary',
      data: 'Data management',
      tags: 'Label management',
    },
    // 404 pages
    page404: {
      title: '404',
      subTitle: 'The page you visited does not exist.',
      backHome: 'Back to Home',
    },
    // Pop ups and their internal forms
    modal: {
      title: 'Add Record',
      name: {
        title: 'name',
        placeholder: 'Please enter a name',
      },
      description: {
        title: 'description',
        placeholder: 'Please enter a description',
      },
      tags: {
        title: 'label',
        placeholder: 'Please enter the label',
        success: 'success',
        error: 'error',
        warning: 'warning',
        processing: 'processing',
        default: 'default',
      },
      ok: 'confirm',
      cancle: 'cancle',
    },
  }),
  // pages
  ...flattenObject(list),
  ...flattenObject(tags),
  ...flattenObject(message),
};
