import React, { FC, useState } from 'react';
import { IntlProvider } from 'react-intl';
import { ConfigProvider, Layout } from 'antd';
import Router from '@/routes';
import Header from '@/components/Header';
import Sider from '@/components/Sider';
import languseMap from '@/locales';
import './App.scss';

const { Content } = Layout;
const App: FC = () => {
  const [locale, setLocal] = useState<string>(
    localStorage.getItem('language') || 'en',
  );

  return (
    <>
      <ConfigProvider locale={languseMap[locale].antd}>
        <IntlProvider locale={locale} messages={languseMap[locale]}>
          <Layout style={{ height: '100vh' }}>
            <Header setLocal={setLocal}></Header>
            <Layout>
              <Sider></Sider>
              <Layout
                style={{
                  height: 'calc(100vh - 64px)',
                  padding: '0 12px 12px',
                }}
              >
                <Content
                  style={{
                    padding: 12,
                    margin: 0,
                    height: '100%',
                    overflow: 'auto',
                  }}
                >
                  <Router />
                </Content>
              </Layout>
            </Layout>
          </Layout>
        </IntlProvider>
      </ConfigProvider>
    </>
  );
};

export default App;
