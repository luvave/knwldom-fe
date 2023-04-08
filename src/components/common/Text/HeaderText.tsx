import { Text } from '@nextui-org/react';
import { type CSSFontSize } from '@nextui-org/react/types/theme';

interface Props {
  size?: CSSFontSize;
  children?: React.ReactNode;
}

export const HeaderText = ({ size, children }: Props) => {
  return (
    <Text
      h1
      size={size ?? 60}
      css={{
        backgroundImage: 'linear-gradient(45deg, #5514B4, #FF80FF)',
        WebkitBackgroundClip: 'text',
        WebkitTextFillColor: 'transparent',
      }}
      weight='bold'
    >
      {children}
    </Text>
  );
};
