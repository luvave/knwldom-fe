import { useTranslation } from 'react-i18next';
import { ErrorCard } from '../../components/common/ErrorCard/ErrorCard';

interface Props {
  error: Error;
}

export const GraphPageError = ({ error }: Props) => {
  const { t } = useTranslation();

  // TOOD: Create proper error
  return (
    <ErrorCard
      css={{ mr: 'auto', ml: 'auto', top: '20px' }}
      error={error.message || t('graphPage.error')}
    ></ErrorCard>
  );
};
