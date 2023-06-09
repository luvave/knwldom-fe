import { BasicModal } from '../common/BasicModal';
import DOMPurify from 'dompurify';
import { useInput } from '@nextui-org/react';
import { useQuery } from '@tanstack/react-query';
import { lookupSearch } from '../../services/lookup';
import { addRelation } from '../../services/relation';
import { formatResourceFromLookup } from '../../utils/resources';
import { Button } from '../common/Buttons/Button';
import { BasicContainer } from '../common/Containers/BasicContainer';
import { BasicInput } from '../common/Input/BasicInput';

interface Props {
  userId: number;
  open: boolean;
  setOpen: (value: boolean) => void;
  afterAddFunc: any;
}

export const AddNewModal = ({ userId, afterAddFunc, open, setOpen }: Props) => {
  const { value, reset, bindings } = useInput('');

  const { data, refetch } = useQuery({
    queryKey: ['lookupSearch', value],
    queryFn: () => lookupSearch(value),
    enabled: false,
    refetchOnWindowFocus: false,
  });

  const addEntity = async (value: string) => {
    try {
      await addRelation({
        userId,
        relation: value,
      });
      if (typeof afterAddFunc === 'function') {
        afterAddFunc();
      }
      setOpen(false);
    } catch {
      throw new Error('Unable to add connection');
    }
  };

  const handleClick = () => {
    void refetch();
  };

  const getBody = () => {
    return (
      <BasicContainer>
        <BasicContainer css={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between' }}>
          <BasicInput
            onClearClick={reset}
            clearable
            bordered
            color='primary'
            placeholder='Enter search keyword..'
            label='Search'
            value={bindings.value}
            onChange={bindings.onChange}
          />
          <Button
            type='secondary'
            onClick={handleClick}
          >
            Search
          </Button>
        </BasicContainer>
        <BasicContainer css={{ marginTop: '20px' }}>
          {data?.docs?.map((entity) => {
            const { label, resource } = entity;
            if (
              typeof label === 'undefined' ||
              typeof resource === 'undefined' ||
              label.length === 0 ||
              resource.length === 0
            ) {
              return null;
            }
            return (
              <Button
                type='secondary'
                light
                key={label[0]}
                onClick={() => addEntity(formatResourceFromLookup(resource?.[0]))}
              >
                <div dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(label[0]) }} />
              </Button>
            );
          }) ?? null}
        </BasicContainer>
      </BasicContainer>
    );
  };

  return (
    <BasicModal
      setOpen={setOpen}
      open={open}
      body={getBody()}
      title='Connect new entity'
    />
  );
};
