import { useIntl } from 'react-intl';

export default () => {
  const intl = useIntl();
  return { t: (key?: string): string => intl.formatMessage({ id: key }) };
};
