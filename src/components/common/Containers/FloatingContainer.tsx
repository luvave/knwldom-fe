import { Container, styled } from '@nextui-org/react';

export const FloatingContainer = styled(Container, {
  position: 'absolute',
  width: '200px',
  margin: '20px',
  zIndex: 2,
  variants: {
    type: {
      left: {
        left: '15px',
      },
      right: {
        right: '15px',
      },
      center: {
        left: 'calc(50% - 200px)',
      },
    },
  },
});
