import { BasicModal } from '../common/BasicModal';
import { useTranslation } from 'react-i18next';
import { BasicContainer } from '../common/Containers/BasicContainer';
import { BasicInput } from '../common/Input/BasicInput';
import { Tooltip } from '../common/Tooltip/Tooltip';
import { Button } from '../common/Buttons/Button';
import { useInput } from '@nextui-org/react';
import { useGetUsersBySubstring } from '../../services/generatedApi/api';
import { useNavigate } from 'react-router-dom';
import { getGraphRoute } from '../../utils/routes';

interface Props {
  open: boolean;
  setOpen: (value: boolean) => void;
}

export const SearchUserModal = ({ open, setOpen }: Props) => {
  const { t } = useTranslation();
  const { value, reset, bindings } = useInput('');

  const navigate = useNavigate();
  const { data: foundUsers, refetch: usersRefetch } = useGetUsersBySubstring({ name: value });

  const onClose = () => {
    setOpen(false);
  };

  const handleClick = () => {
    void usersRefetch();
  };

  const searchDisabled = value === '';

  const onUserClick = (userId: string) => {
    navigate(getGraphRoute(String(userId)));
    onClose();
  };

  const getBody = () => {
    return (
      <BasicContainer css={{ minHeight: '400px' }}>
        <BasicContainer
          css={{ padding: 0, paddingTop: 10, display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between' }}
        >
          <BasicInput
            onClearClick={reset}
            clearable
            bordered
            color='primary'
            placeholder={t('graphPage.searchUserModal.searchPlaceholder')}
            label={t('graphPage.searchUserModal.search')}
            value={bindings.value}
            onChange={bindings.onChange}
          />
          <Tooltip content={searchDisabled ? t('graphPage.searchUserModal.searchTooltip') : ''}>
            <Button
              type='secondary'
              onClick={handleClick}
              disabled={searchDisabled}
            >
              {t('graphPage.searchUserModal.search')}
            </Button>
          </Tooltip>
        </BasicContainer>
        <BasicContainer css={{ marginTop: '20px' }}>
          {foundUsers?.map((user) => {
            return (
              <Tooltip
                key={user.userId}
                content={t('graphPage.searchUserModal.userTooltip', { graphName: user.userGraph })}
              >
                <Button
                  type='secondary'
                  light
                  onClick={() => onUserClick(user.userId ?? '')}
                >
                  {user.displayName}
                </Button>
              </Tooltip>
            );
          }) ?? null}
        </BasicContainer>
      </BasicContainer>
    );
  };

  return (
    <BasicModal
      onClose={onClose}
      open={open}
      body={getBody()}
      title={t('graphPage.searchUserModal.title')}
    />
  );
};
