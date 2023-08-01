import { Tooltip as NextTooltip } from '@nextui-org/react';
import { type ReactNode } from 'react';

interface Props {
  content: string;
  children: ReactNode;
}

export const Tooltip = ({ children, content }: Props) => {
  return (
    <NextTooltip
      content={content}
      rounded
      color='primary'
      css={{ zIndex: 10000 }}
    >
      {children}
    </NextTooltip>
  );
};
