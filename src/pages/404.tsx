import { Button, Result } from 'antd';
import { useNavigate } from 'react-router-dom';
import { FormattedMessage } from 'react-intl';
import React from 'react';
import useI18n from '@/hooks/useI18n';

const NoFoundPage: React.FC = () => {
  const { t } = useI18n();
  const navigate = useNavigate();

  return (
    <Result
      status="404"
      title="404"
      subTitle={t('page404.subTitle')}
      extra={
        <Button type="primary" onClick={() => navigate('/')}>
          <FormattedMessage id="page404.backHome" />
        </Button>
      }
    />
  );
};

export default NoFoundPage;
