import CreatableSelect from 'react-select/creatable';
import { useTheme, Text } from '@nextui-org/react';
import { useTranslation } from 'react-i18next';
import { type ReactNode } from 'react';

interface Props<T> {
  value: T | null;
  options: T[];
  onCreateOption?: (inputValue: string) => void;
  onChange?: (newValue: T | null) => void;
  isLoading?: boolean;
  isDisabled?: boolean;
  isClearable?: boolean;
  label?: string;
  getOptionLabel?: (option: T) => string;
  getNewOptionData?: (value: string, label: ReactNode) => T;
}

export const Autocomplete = <T extends Record<string, any>>({ label, ...rest }: Props<T>) => {
  const { isDark, theme } = useTheme();
  const { t } = useTranslation();
  return (
    <>
      <Text
        color='primary'
        size='$sm'
        css={{ paddingLeft: '0.25rem' }}
      >
        {label}
      </Text>
      <CreatableSelect<T>
        {...rest}
        formatCreateLabel={(input) => t('common.createNew', { input })}
        styles={{
          control: (baseStyles) => ({
            ...baseStyles,
            backgroundColor: theme?.colors.gray50.value,
            borderColor: theme?.colors.gray300.value,
            '&:hover': {
              borderColor: theme?.colors.primaryBorder.value,
            },
            borderWidth: '2px',
            height: '3rem',
            borderRadius: '0.75rem',
            color: isDark ? theme?.colors.white.value : theme?.colors.black.value,
          }),
          singleValue: (baseStyles) => ({
            ...baseStyles,
            color: isDark ? theme?.colors.white.value : theme?.colors.black.value,
          }),
          menu: (baseStyles) => ({
            ...baseStyles,
            backgroundColor: theme?.colors.background.value ?? 'white',
            marginTop: 2,
            color: isDark ? theme?.colors.white.value : theme?.colors.black.value,
          }),
          menuList: (baseStyles) => ({
            ...baseStyles,
            backgroundColor: theme?.colors.background.value ?? 'white',
            marginTop: 2,
            color: isDark ? theme?.colors.white.value : theme?.colors.black.value,
          }),
          option: (baseStyles) => ({
            ...baseStyles,
            backgroundColor: theme?.colors.background.value ?? 'white',
            color: isDark ? theme?.colors.white.value : theme?.colors.black.value,
          }),
          placeholder: (baseStyles) => ({
            ...baseStyles,
            color: theme?.colors.gray600.value,
            paddingLeft: 4,
          }),
          loadingMessage: (baseStyles) => ({
            ...baseStyles,
            color: isDark ? theme?.colors.white.value : theme?.colors.black.value,
          }),
          input: (baseStyles) => ({
            ...baseStyles,
            color: isDark ? theme?.colors.white.value : theme?.colors.black.value,
          }),
        }}
      />
    </>
  );
};
