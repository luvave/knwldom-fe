import { useTranslation } from 'react-i18next';

interface Props {
  error: Error;
}

export const GraphPageError = ({ error }: Props) => {
  const { t } = useTranslation();

  // TOOD: Create proper error
  return <div>{error.message || t('graphPage.error')}</div>;
};
