import React, { FC, useState } from 'react';
import { Layout, Menu } from 'antd';
import { useNavigate, useLocation } from 'react-router-dom';
import { routerType, routersList } from '@/routes/list';
import useI18n from '@/hooks/useI18n';
import { MenuInfo } from './types.d';
import './styles.scss';

const { Sider: AntSider } = Layout,
  Sider: FC = () => {
    const { t } = useI18n();
    const navigate = useNavigate();
    const location = useLocation();
    const [collapseStatus, setCollapseStatus] = useState<boolean>(false);

    return (
      <AntSider
        collapsed={collapseStatus}
        collapsible
        width={200}
        theme="dark"
        onCollapse={() => setCollapseStatus(!collapseStatus)}
      >
        <Menu
          theme="dark"
          mode="inline"
          defaultSelectedKeys={[location.pathname]}
          style={{ height: '100%', borderRight: 0 }}
          items={routersList?.map((item: routerType) =>
            !item.hideMenu
              ? {
                  key: item.path,
                  icon: item?.icon,
                  label: t(item.name),
                }
              : null,
          )}
          onClick={(item: MenuInfo): void => navigate(item.key)}
        />
      </AntSider>
    );
  };

export default Sider;
