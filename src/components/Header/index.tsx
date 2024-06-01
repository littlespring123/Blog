import React, { FC } from 'react';
import {
  Button, Dropdown, Layout, MenuProps, Switch,
} from 'antd';
import { SettingOutlined } from '@ant-design/icons';
import { FormattedMessage } from 'react-intl';
import { IParams } from './types.d';
import './styles.scss';

const { Header: AntHeader } = Layout,

 Header: FC<IParams> = ({ setLocal }) => {
  const changeCurLanguage = (checked: boolean) => {
    const lang = checked ? 'zh' : 'en';
    localStorage.setItem('language', lang);
    setLocal(lang);
  },

   items: MenuProps['items'] = [
    {
      key: 'language',
      label: 
        <Switch
          checkedChildren="中文"
          unCheckedChildren="English"
          checked={localStorage.getItem('language') === 'zh'}
          onChange={changeCurLanguage}
        />
      ,
    },
  ];

  return (
    <AntHeader className="head">
      <div className="head-logo">
        <FormattedMessage id="title" />
      </div>
      <Dropdown menu={{ items }} placement="bottom" arrow>
        <Button
          className="head-setting"
          type="link"
          icon={<SettingOutlined />}
          // ghost
        >
          <FormattedMessage id="setting" />
        </Button>
      </Dropdown>
    </AntHeader>
  );
};

export default Header;
