import { Modal, Text } from '@nextui-org/react';
import { type ReactNode } from 'react';
import { Button } from './Buttons/Button';
import { useTranslation } from 'react-i18next';

interface Props {
  open: boolean;
  onClose: () => void;
  body: ReactNode;
  title: string;
}

export const BasicModal = ({ open, onClose, body, title }: Props) => {
  const { t } = useTranslation();
  return (
    <Modal
      scroll
      width='600px'
      aria-labelledby='modal-title'
      aria-describedby='modal-description'
      open={open}
      onClose={onClose}
    >
      <Modal.Header>
        <Text
          id='modal-title'
          size={18}
        >
          {title}
        </Text>
      </Modal.Header>
      <Modal.Body>{body}</Modal.Body>
      <Modal.Footer>
        <Button
          auto
          flat
          type='secondary'
          onClick={onClose}
        >
          {t('common.close')}
        </Button>
      </Modal.Footer>
    </Modal>
  );
};
