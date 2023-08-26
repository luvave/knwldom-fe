import { Card, Text } from '@nextui-org/react';
import { type CSS } from '@nextui-org/react/types/theme/stitches.config';

interface Props {
  error: string;
  css?: CSS;
}

export const ErrorCard = ({ error, css }: Props) => {
  return (
    <Card css={{ mw: '400px', backgroundColor: '$error', ...css }}>
      <Text css={{ color: '$text', p: '10px', fontWeight: 'bold' }}>{error}</Text>
    </Card>
  );
};
