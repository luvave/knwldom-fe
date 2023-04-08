import { Button as NextButton } from '@nextui-org/react';
import React from 'react';
import { type CSS } from '@nextui-org/react/types/theme/stitches.config';

interface Props {
  type: 'primary' | 'secondary' | 'gradient';
  children?: React.ReactNode;
  onClick?: () => void;
  light?: boolean;
  flat?: boolean;
  animated?: boolean;
  disabled?: boolean;
  ghost?: boolean;
  bordered?: boolean;
  auto?: boolean;
  shadow?: boolean;
  ripple?: boolean;
  icon?: React.ReactNode;
  iconRight?: React.ReactNode;
  css?: CSS;
}

export const Button = ({ type, children, onClick, css, ...rest }: Props) => {
  return (
    <NextButton
      onPress={() => (onClick ? onClick() : undefined)}
      color={type}
      css={{ ...css }}
      {...rest}
    >
      {children}
    </NextButton>
  );
};
