import CreatableSelect from 'react-select/creatable';

interface Props<T> {
  value: T | null;
  options: T[];
  onCreateOption?: (inputValue: string) => void;
  onChange?: (newValue: T | null) => void;
  isLoading?: boolean;
  isDisabled?: boolean;
  isClearable?: boolean;
  getOptionLabel?: (option: T) => string;
}

export const Autocomplete = <T extends Record<string, any>>(props: Props<T>) => {
  return <CreatableSelect<T> {...props} />;
};
