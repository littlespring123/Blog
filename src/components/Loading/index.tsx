import React from 'react';
import { Spin } from 'antd';
import './styles.scss';

const Loading: React.FC = () => (
  <div className="globalLoading">
    <Spin size="large" />
  </div>
);

export default Loading;
