import {
  BarChartOutlined,
  FormOutlined,
  TagsOutlined,
} from '@ant-design/icons';
import React, { ReactElement } from 'react';

export interface routerType {
  key: string;
  name?: string;
  path: `/${string}` | '*';
  hideMenu?: boolean;
  element?: React.LazyExoticComponent<React.FC>;
  icon?: ReactElement;
}

export const routersList: routerType[] = [
  {
    key: 'summary',
    name: 'navBar.summary',
    path: '/',
    icon: <FormOutlined />,
    element: React.lazy(() => import('@/pages/Home')),
  },
  {
    key: 'data',
    name: 'navBar.data',
    path: '/data',
    icon: <BarChartOutlined />,
    element: React.lazy(() => import('@/pages/Data')),
  },
  {
    key: 'tags',
    name: 'navBar.tags',
    path: '/tags',
    icon: <TagsOutlined />,
    element: React.lazy(() => import('@/pages/Tags')),
  },
  {
    key: '404',
    path: '*',
    hideMenu: true,
    element: React.lazy(() => import('@/pages/404')),
  },
];
