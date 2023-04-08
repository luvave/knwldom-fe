import { Container } from '@nextui-org/react';
import { type CSS } from '@nextui-org/react/types/theme/stitches.config';
import { type Ref } from 'react';

interface Props {
  css?: CSS;
  children?: React.ReactNode;
  as?: keyof JSX.IntrinsicElements;
  containerRef?: Ref<HTMLDivElement> | undefined;
}

export const BasicContainer = ({ containerRef, children, ...rest }: Props) => {
  return (
    <Container
      /*
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore */
      ref={containerRef}
      {...rest}
    >
      {children}
    </Container>
  );
};
